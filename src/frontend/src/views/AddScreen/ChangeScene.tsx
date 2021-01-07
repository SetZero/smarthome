import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from "react-redux"
import { addRoom } from '../../reducer/actions/RoomActions'
import { RoomState, RoomCardSize, ItemRef } from '../../reducer/states/RoomStates'
import { StateType } from '../../reducer/rootReducer';
import { SceneState } from '../../reducer/states/SceneStates';
import { addScene, changeScene } from '../../reducer/actions/SceneActions';
import { Scenes } from '../Scenes';
import { AddButton, ElementType, ParentType } from './AddButton';
import { Grid, Slider, Switch, Typography } from '@material-ui/core';
import { Item, ItemState } from '../../reducer/states/ItemState';
import { itemStateChange } from '../../reducer/actions/ItemActions';
import { ApiService } from '../../Utils/ApiService';

const useStylesText = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);
const useStylesButton = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);
interface ChangeSceneProps {
  sceneState: SceneState,
  setShowChangeSceneFunction: (selectedScene: SceneState) => void;
}


export default function ChangeScene({ sceneState, setShowChangeSceneFunction }: ChangeSceneProps) {
  const classesText = useStylesText();
  const classesButton = useStylesButton();
  const [name, setName] = React.useState<string>(sceneState.name);
  const [url, setUrl] = React.useState<string>(sceneState.url);
  const items = useSelector<StateType, StateType["itemsReducer"]["items"]>((state) => state?.itemsReducer?.items ?? []);
  const scenes = useSelector<StateType, StateType["scenesReducer"]["scenes"]>((state) => state?.scenesReducer?.scenes ?? []);
  const currentScene = scenes.find(e => e.name === sceneState.name);
  /*const [sensors, setSensors] = React.useState<Array<ItemRef>>(sceneState.sensors);*/


  const handleChangeText = (event: React.ChangeEvent<{ value: unknown }>) => {
    setName(event.target.value as string);
  }
  const handleChangeTexturl = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUrl(event.target.value as string);
  }
  const dispatch = useDispatch();

  const onChangeScene = (scene: SceneState) => {
    var newScene: SceneState = { name: name, url: url };
    dispatch(changeScene(scene, newScene));
    setShowChangeSceneFunction({ name: "", url: "" });
  }

  const onItemToggle = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean, item: Item) => {
    item.state = checked ? ItemState.ON : ItemState.OFF;
    dispatch(itemStateChange(item));
  }

  return (
    <div>
      <div><h1>Szene Ändern</h1></div>
      <div>{sceneState.name}</div>


      <form className={classesText.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Name" value={name} defaultValue={sceneState.name} onChange={handleChangeText} />
      </form>
      <form className={classesText.root} noValidate autoComplete="off">
        <TextField id="url" label="Bild Url" value={url} onChange={handleChangeTexturl} />
      </form>


      {items.filter(e => currentScene?.sensors?.find(f => f.link === e.link && e.type == 'Switch') !== undefined).map(e => {
        return (
          <Grid className="Left" container alignItems="center" justify="flex-start" item xs spacing={2} key={e.link}>
            <Grid item sm={8} xs={8}>
              <Typography variant="h5" component="h6">
                {e.name}
              </Typography>

            </Grid>
            <Grid item sm={2} xs={2}>
              <Switch
                name="unused"
                inputProps={{ 'aria-label': 'secondary-checkbox' }}
                onChange={(event, state) => onItemToggle(event, state, e)}
                checked={e.state === ItemState.ON ?? false}
              />
            </Grid>
          </Grid>
        )
      })}
      {items.filter(e => currentScene?.sensors?.find(f => f.link === e.link && e.type == 'Dimmer') !== undefined).map(e => {
        return (
          <Grid className="Left" container alignItems="center" justify="flex-start" item xs spacing={2}>
            <Grid item sm={3} xs={4}>
              <Typography variant="h5" component="h6">
                {e.name}
              </Typography>
            </Grid>
            <Grid item sm={6} xs={6}>
              <Slider defaultValue={20} aria-labelledby="discrete-slider" step={2} marks min={0} max={35}
                onChange={(ev, val) => {
                  ApiService.ChangeDimmer(val + '', e.name);
                }}

              />
            </Grid>
            <Grid item sm={1} xs={2}>
              <Typography>
                {e.state}
              </Typography>
            </Grid>
          </Grid>
        )
      })}
      <div className={classesButton.root}>
        <AddButton type={ElementType.ITEM} parentName={sceneState.name} parentType={ParentType.SCENE} />
        <Button variant="contained" color="primary" onClick={(e) => {
          onChangeScene(sceneState);
        }}>
          Ändern
        </Button>

      </div>


    </div>
  );
}

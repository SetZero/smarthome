import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Button';
import IconButton from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from "react-redux"
import { addRoom } from '../../reducer/actions/RoomActions'
import { RoomState, RoomCardSize } from '../../reducer/states/RoomStates'
import { StateType } from '../../reducer/rootReducer';
import { SceneState } from '../../reducer/states/SceneStates';
import { addScene, changeScene } from '../../reducer/actions/SceneActions';
import { Scenes } from '../Scenes';
import { Grid, Slider, Switch, Typography } from '@material-ui/core';
import { Item, ItemState } from '../../reducer/states/ItemState';
import { itemStateChange } from '../../reducer/actions/ItemActions';
import { updateAction, removeActionFromScene } from '../../reducer/actions/ActionActions';
import { ApiService } from '../../Utils/ApiService';
import { AddButton, ElementType } from "./AddButton";

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


export default function ChangeScene({ sceneState, setShowChangeSceneFunction}: ChangeSceneProps) {
  const classesText = useStylesText();
  const classesButton = useStylesButton();
  const [name, setName] = React.useState<string>(sceneState.name);
  const [url, setUrl] = React.useState<string>(sceneState.url);


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
  }

  const onGoBack = (scene : SceneState) => {
    setShowChangeSceneFunction({ name: "", url: "" });
  }

  const actions = useSelector<StateType, StateType["actionsReducer"]["actions"]>((state) => state?.actionsReducer?.actions ?? []);
  const scenes = useSelector<StateType, StateType["scenesReducer"]["scenes"]>((state) => state?.scenesReducer?.scenes ?? []);
  const currentScene = scenes.find(e => e.name === sceneState.name);

  return (
    <div>
      <Typography variant="h4"> Szene <i>"{sceneState.name}"</i> bearbeiten </Typography>


      <Grid spacing={5}>
        <Grid container>
        <Grid item xs={8} alignItems="flex-end">
            <TextField id="standard-basic" label="Name" value={name} defaultValue={sceneState.name} onChange={handleChangeText} />
        </Grid>
        </Grid>
        <Grid container alignItems="flex-end">
        <Grid item xs={8}>
              <TextField id="url" label="Bild Url" value={url} onChange={handleChangeTexturl} />
        </Grid>

          <Grid item xs={2}>
              <Button variant="contained" color="primary" onClick={(e) => {
                onChangeScene(sceneState);
              }}>
                Speichern
              </Button>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h4"> Aktionen </Typography>
        </Grid>
      {actions.filter(e => e.sceneName == sceneState.name && e.item != undefined && e.item.type == 'Switch' || e.item.type == 'Dimmer').map(e => {
                        return (
                          <div>
                            <Grid className="Left" container alignItems="center" justify="flex-start" spacing={2} key={e.item.link}>
                                <Grid item xs={1}>
                                <IconButton aria-label="delete" onClick={() => {
                                      dispatch(removeActionFromScene(e));
                                  } }>
                                        <DeleteIcon />
                                </IconButton >
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography variant="h5" component="h6">
                                        {e.item.name}
                                    </Typography>
                                </Grid>
                                { e.item.type == 'Switch' ?
                                <Grid item sm={2} xs={2}>
                                    <Switch
                                        name="unused"
                                        inputProps={{ 'aria-label': 'secondary-checkbox' }}
                                        onChange={(event, state) => 
                                        { 
                                          e.item.state = e.item.state === ItemState.ON ? ItemState.OFF : ItemState.ON;
                                          dispatch(updateAction({ sceneName : sceneState.name, item : e.item}))}
                                        }
                                        checked={e.item.state === ItemState.ON ?? false}
                                    />
                                </Grid>
                                  : ""
                                }
                                { e.item.type == 'Dimmer' ?
                                <Grid item xs={6}>
                                    <Slider defaultValue={20} aria-labelledby="discrete-slider" step={2} marks min={0} max={35} 
                                    onChange={(ev, val) => {
                                        // TODO: what is this datatype ??
                                        e.item.state = parseInt(val + "");
                                        dispatch(updateAction({ sceneName : sceneState.name, item : e.item}));
                                    }}/>
                                </Grid>
                                : ""
                                }
                                { e.item.type == 'Dimmer' ?
                                <Grid item xs={1}>
                                    <Typography>
                                        {e.item.state}
                                    </Typography>
                                </Grid>
                                : ""
                                }
                             </Grid>
                          </div>
                        )})}
      
      </Grid>
      <div className={classesButton.root}>
        <Button variant="contained" color="primary" onClick={(e) => {
          onGoBack(sceneState);
        }}>
          Zurück
        </Button>
      </div>

      <AddButton type={ElementType.ACTION} parentName={sceneState.name} />

    </div>
  );
}

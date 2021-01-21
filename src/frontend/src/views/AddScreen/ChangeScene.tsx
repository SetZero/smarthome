import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from "react-redux"
import { StateType } from '../../reducer/rootReducer';
import { SceneState, ItemAction } from '../../reducer/states/SceneStates';
import { changeScene, updateAction, removeActionFromScene } from '../../reducer/actions/SceneActions';
import { AddButton, ElementType, ParentType } from './AddButton';
import { Grid, IconButton, Slider, Switch, Typography } from '@material-ui/core';
import { ItemState } from '../../reducer/states/ItemState';

interface ChangeSceneProps {
  sceneState: SceneState,
  setShowChangeSceneFunction: (selectedScene: SceneState) => void;
}


export default function ChangeScene({ sceneState, setShowChangeSceneFunction }: ChangeSceneProps) {
  const scenes = useSelector<StateType, StateType["scenesReducer"]["scenes"]>((state) => state?.scenesReducer?.scenes ?? []);
  const items = useSelector<StateType, StateType["itemsReducer"]["items"]>((state) => state?.itemsReducer?.items ?? []);
  const dispatch = useDispatch();
  const [name, setName] = React.useState<string>(sceneState.name);
  const [url, setUrl] = React.useState<string>(sceneState.url);

  const handleChangeText = (event: React.ChangeEvent<{ value: unknown }>) => {
    setName(event.target.value as string);
  }

  const handleChangeTexturl = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUrl(event.target.value as string);
  }

  const onChangeScene = (scene: SceneState) => {
    const newScene: SceneState = { name: name, url: url, actions: scene.actions };
    dispatch(changeScene(scene, newScene));
  }

  const onActionChange = (action : ItemAction) => {
    const currentScene = scenes.find(e => e.name == sceneState.name);
    if (currentScene != undefined)
      dispatch(updateAction(currentScene, action));
  }

  const onActionDelete = (action : ItemAction) => {
    const currentScene = scenes.find(e => e.name == sceneState.name);
    if (currentScene != undefined)
      dispatch(removeActionFromScene(currentScene, action));
  }

  const handleGoBack = (event: React.MouseEvent<HTMLElement>) => {
    setShowChangeSceneFunction({ name: "", url: "", actions : [] });
  }

  const GetCurrentItem = (itemName : string) => {
    return items.find(e => e.name === itemName);
  }

  const GetValueRangeOfItem = (itemName : string) => {
        let currentItem = GetCurrentItem(itemName);
        let min = 0;
        let max = 0;

        if (currentItem !== undefined) {
            if (currentItem.min !== undefined && currentItem.min as number) {
                min = currentItem.min as number;
            }
            if (currentItem.max !== undefined && currentItem.max as number) {
                max = currentItem.max as number;
            }
        }

        return [min, max];
    }

  return (
    <div>
      <Grid spacing={5}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <IconButton onClick={handleGoBack}>
              <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h4"> Szene {sceneState.name} bearbeiten </Typography>
          </Grid>
          <Grid item xs={2} />
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={8}>
              <TextField id="standard-basic" label="Name" value={name} onChange={handleChangeText} />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="flex-end">
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

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4"> Aktionen </Typography>
          </Grid>
        </Grid>
        {scenes.find(s => s.name == sceneState.name)?.actions.filter(e => e.item != undefined && (e.item.type == 'Switch' || e.item.type == 'Dimmer')).map(e => {
          return (
              <Grid className="Left" container alignItems="center" justify="flex-start" spacing={2} key={e.item.link}>
                <Grid item xs={1}>
                  <IconButton aria-label="delete" onClick={() => {
                    onActionDelete(e);
                  }}>
                    <DeleteIcon />
                  </IconButton >
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="h5" component="h6">
                    {e.item.name}
                  </Typography>
                </Grid>
                {e.item.type == 'Switch' ?
                  <Grid item sm={2} xs={2}>
                    <Switch
                      name="unused"
                      inputProps={{ 'aria-label': 'secondary-checkbox' }}
                      onChange={(event, state) => {
                        e.item.state = e.item.state === ItemState.ON ? ItemState.OFF : ItemState.ON;
                        onActionChange(e);
                      }
                      }
                      checked={e.item.state === ItemState.ON ?? false}
                    />
                  </Grid>
                  : ""
                }
              { e.item.type == "Dimmer" ? (() => {
                const range = GetValueRangeOfItem(e.item.name);
                return (
                  <Grid item xs={7}>
                    <Grid container spacing={2}>
                      <Grid item xs={10}>
                        <Slider defaultValue={e.item.state as number}
                          aria-labelledby="discrete-slider"
                          min={range[0]} max={range[1]}
                          onChange={(ev, val) => {
                            e.item.state = parseInt(val + "");
                            onActionChange(e);
                          }} />
                      </Grid>
                      <Grid item xs={2}>
                        <Typography>
                          {e.item.state}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>)
              })()
                : ""
              }
              </Grid>
          )
        })}

      </Grid>
      <AddButton type={ElementType.ACTION} parentName={sceneState.name} parentType={ParentType.SCENE} />

    </div>
  );
}

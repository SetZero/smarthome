import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from "react-redux"
import { StateType } from '../../reducer/rootReducer';
import { SceneState } from '../../reducer/states/SceneStates';
import { changeScene } from '../../reducer/actions/SceneActions';
import { AddButton, ElementType, ParentType } from './AddButton';
import { Grid, IconButton, Slider, Switch, Typography } from '@material-ui/core';
import { ItemState } from '../../reducer/states/ItemState';
import { updateAction, removeActionFromScene } from '../../reducer/actions/ActionActions';

interface ChangeSceneProps {
  sceneState: SceneState,
  setShowChangeSceneFunction: (selectedScene: SceneState) => void;
}


export default function ChangeScene({ sceneState, setShowChangeSceneFunction }: ChangeSceneProps) {
  const actions = useSelector<StateType, StateType["actionsReducer"]["actions"]>((state) => state?.actionsReducer?.actions ?? []);
  const scenes = useSelector<StateType, StateType["scenesReducer"]["scenes"]>((state) => state?.scenesReducer?.scenes ?? []);
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
    const newScene: SceneState = { name: name, url: url, sensors: scene.sensors };
    dispatch(changeScene(scene, newScene));
  }

  const onGoBack = (sconst : SceneState) => {
    setShowChangeSceneFunction({ name: "", url: "" });
  }

  return (
    <div>
      <Grid spacing={5}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4"> Szene {sceneState.name} bearbeiten </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={8}>
              <TextField id="standard-basic" label="Name" value={name} defaultValue={sceneState.name} onChange={handleChangeText} />
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
                                <Grid item xs={7}>
                                  <Grid container spacing={2}>
                                  <Grid item xs={10}>
                                      <Slider defaultValue={20} aria-labelledby="discrete-slider" step={2} marks min={0} max={35} 
                                      onChange={(ev, val) => {
                                          // TODO: what is this datatype ??
                                          e.item.state = parseInt(val + "");
                                          dispatch(updateAction({ sceneName : sceneState.name, item : e.item}));
                                      }}/>
                                  </Grid>
                                    <Grid item xs={2}>
                                        <Typography>
                                            {e.item.state}
                                        </Typography>
                                  </Grid>
                                  </Grid>
                                </Grid>
                                : ""
                                }
                             </Grid>
                          </div>
                        )})}
      
      </Grid>
        <Button variant="contained" color="primary" onClick={(e) => {
          onGoBack(sceneState);
        }}>
          Zurück
        </Button>

      <AddButton type={ElementType.ACTION} parentName={sceneState.name} parentType={ParentType.SCENE} />

    </div>
  );
}

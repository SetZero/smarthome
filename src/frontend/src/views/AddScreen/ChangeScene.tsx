import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from "react-redux"
import { addRoom } from '../../reducer/actions/RoomActions'
import { RoomState, RoomCardSize } from '../../reducer/states/RoomStates'
import { StateType } from '../../reducer/rootReducer';
import { SceneState } from '../../reducer/states/SceneStates';
import { addScene, changeScene } from '../../reducer/actions/SceneActions';
import { Scenes } from '../Scenes';

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
  setShowChangeSceneFunction: (selectedScene: SceneState) => void
}


export default function ChangeScene({ sceneState, setShowChangeSceneFunction }: ChangeSceneProps)  {
  const classesText = useStylesText();
  const classesButton = useStylesButton();
  const [name, setName] = React.useState<string>(sceneState.name);
  const [url, setUrl] = React.useState<string>(sceneState.url);
  const rooms = useSelector<StateType, StateType["roomsReducer"]["rooms"]>((state) => state?.roomsReducer?.rooms ?? []);
  const items = useSelector<StateType, StateType["itemsReducer"]["items"]>((state) => state?.itemsReducer?.items ?? []);
  const scenes = useSelector<StateType, StateType["scenesReducer"]["scenes"]>((state) => state?.scenesReducer?.scenes ?? []);

  
  const handleChangeText = (event: React.ChangeEvent<{value : unknown }>) => {
    setName(event.target.value as string);
  }
  const handleChangeTexturl = (event: React.ChangeEvent<{value : unknown }>) => {
    setUrl(event.target.value as string);
  }
  const dispatch = useDispatch();
  
  const onChangeScene = (scene: SceneState) => {
    var newScene:SceneState = {name: name, url:url};
    dispatch(changeScene(scene,newScene));
    setShowChangeSceneFunction({name:"",url:""});
  }

  return (
    <div>
      <div><h1>Szene Ändern</h1></div>
      <div>{sceneState.name}</div>

      
      <form className={classesText.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Name" value={name} defaultValue = {sceneState.name} onChange={handleChangeText} />
      </form>
      <form className={classesText.root} noValidate autoComplete="off">
        <TextField id="url" label="Bild Url" value={url} onChange={handleChangeTexturl} />
      </form>

      <div className={classesButton.root}>
        <Button variant="contained" color="primary" onClick= {(e) => { 
          onChangeScene(sceneState);
        }}>
          Ändern
        </Button>
      </div>

    </div>
  );
}

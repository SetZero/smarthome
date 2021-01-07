import React, { Dispatch } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from "react-redux"
import { addRoom } from '../../reducer/actions/RoomActions'
import { RoomState, RoomCardSize } from '../../reducer/states/RoomStates'
import { StateType } from '../../reducer/rootReducer';
import { SceneState } from '../../reducer/states/SceneStates';
import { addScene } from '../../reducer/actions/SceneActions';
import { AddButton } from './AddButton';

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

interface AddSceneProps {
  closeAnchorFunction: (close: any) => void
}

export default function AddScene({closeAnchorFunction}:AddSceneProps) {
  const classesText = useStylesText();
  const classesButton = useStylesButton();
  const [name, setName] = React.useState<string>("");
  const [url, setUrl] = React.useState<string>("");
  const items = useSelector<StateType, StateType["itemsReducer"]["items"]>((state) => state?.itemsReducer?.items ?? []);
  const scenes = useSelector<StateType, StateType["scenesReducer"]["scenes"]>((state) => state?.scenesReducer?.scenes ?? []);
  const tempPic = "https://www.poynter.org/wp-content/uploads/2019/07/shutterstock_264132746.jpg"
  const handleChangeText = (event: React.ChangeEvent<{value : unknown }>) => {
    setName(event.target.value as string);
  }
  const handleChangeTexturl = (event: React.ChangeEvent<{value : unknown }>) => {
    setUrl(event.target.value as string);
  }
  const dispatch = useDispatch();
  
  const onAddScene = (scene: SceneState) => {
    dispatch(addScene(scene));
    closeAnchorFunction(false);
  }

  return (
    <div>
      <div><h1>Szene Hinzufügen</h1></div>
    
      <form className={classesText.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Name" value={name} onChange={handleChangeText} />
      </form>
      <form className={classesText.root} noValidate autoComplete="off">
        <TextField id="url" label="Bild Url" value={url} onChange={handleChangeTexturl} />
      </form>

      <div className={classesButton.root}>
        <Button variant="contained" color="primary" onClick= {(e) => { 
          let pic=url;
          if (url.length<3){
            pic=tempPic;
          }
          let scene = { name: name, url: pic };
          onAddScene(scene);
          setName("");
          setUrl("");
        }}>
          Hinzufügen
        </Button>
      </div>

    </div>
  );
}

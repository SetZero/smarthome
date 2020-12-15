import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from "react-redux"
import { addRoom } from '../../reducer/actions/RoomActions'
import { RoomState, RoomCardSize } from '../../reducer/states/RoomStates'
import { StateType } from '../../reducer/rootReducer';
import { SceneState } from '../../reducer/states/SceneStates';
import { addScene } from '../../reducer/actions/SceneActions';

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

export default function AddScene() {
  const classesText = useStylesText();
  const classesButton = useStylesButton();
  const [name, setName] = React.useState<string>("");
  const rooms = useSelector<StateType, StateType["roomsReducer"]["rooms"]>((state) => state?.roomsReducer?.rooms ?? []);
  const items = useSelector<StateType, StateType["itemsReducer"]["items"]>((state) => state?.itemsReducer?.items ?? []);
  const scenes = useSelector<StateType, StateType["scenesReducer"]["scenes"]>((state) => state?.scenesReducer?.scenes ?? []);


  const handleChangeText = (event: React.ChangeEvent<{value : unknown }>) => {
    setName(event.target.value as string);
  }
  const dispatch = useDispatch();
  
  const onAddScene = (scene: SceneState) => {
    dispatch(addScene(scene));
  }

  return (
    <div>
      <div><h1>Szene Hinzufügen</h1></div>

      
      <form className={classesText.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Name" value={name} onChange={handleChangeText} />
      </form>

      <div className={classesButton.root}>
        <Button variant="contained" color="primary" onClick= {(e) => { 
        let scene = { name: name, url: "https://www.dmjmaviation.com/wp-content/uploads/2018/05/caribbean-destination.jpg" };
        onAddScene(scene);
        }}>
          Hinzufügen
        </Button>
      </div>

    </div>
  );
}

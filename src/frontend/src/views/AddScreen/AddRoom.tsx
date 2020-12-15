import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from "react-redux"
import { addRoom } from '../../reducer/actions/RoomActions'
import { RoomState, RoomCardSize } from '../../reducer/states/RoomStates'
import { StateType } from '../../reducer/rootReducer';


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


export default function AddRoom() {
  const classesText = useStylesText();
  const [name, setName] = React.useState<string>("");
  const rooms = useSelector<StateType, StateType["roomsReducer"]["rooms"]>((state) => state?.roomsReducer?.rooms ?? []);
  const items = useSelector<StateType, StateType["itemsReducer"]["items"]>((state) => state?.itemsReducer?.items ?? []);


  const handleChangeText = (event: React.ChangeEvent<{value : unknown }>) => {
    setName(event.target.value as string);
  }


  const dispatch = useDispatch();

  const onAddRoom = (room: RoomState) => {
    dispatch(addRoom(room));
  }

  return (
    <div>
      <div>Raum Hinzufügen</div>

      
      <form className={classesText.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Name" value={name} onChange={handleChangeText} />
      </form>

      <Button variant="outlined" onClick= {(e) => { 
        let room = { name: name, icon: "BathtubIcon", cardSize: RoomCardSize.SMALL, sensors: [] };
        onAddRoom(room);
      }}>Hinzufügen</Button>

    </div>
  );
}

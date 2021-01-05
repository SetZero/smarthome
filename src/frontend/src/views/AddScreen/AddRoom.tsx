import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from "react-redux"
import { addRoom } from '../../reducer/actions/RoomActions'
import { RoomState, RoomCardSize } from '../../reducer/states/RoomStates'
import { StateType } from '../../reducer/rootReducer';
import { FormControl } from '@material-ui/core';
import { RadioGroup } from '@material-ui/core';
import { FormLabel } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Radio } from '@material-ui/core';


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


export default function AddRoom() {
  const classesText = useStylesText();
  const classesButton = useStylesButton();
  const [name, setName] = React.useState<string>("");
  //const rooms = useSelector<StateType, StateType["roomsReducer"]["rooms"]>((state) => state?.roomsReducer?.rooms ?? []);
  //const items = useSelector<StateType, StateType["itemsReducer"]["items"]>((state) => state?.itemsReducer?.items ?? []);
  const [value, setValue] = React.useState("1");

  const handleChangeOptions = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };


  const handleChangeText = (event: React.ChangeEvent<{value : unknown }>) => {
    setName(event.target.value as string);
  }


  const dispatch = useDispatch();

  const onAddRoom = (room: RoomState) => {
    dispatch(addRoom(room));
  }

  return (
    <div>
      <div><h1>Raum Hinzufügen</h1></div>

      <FormControl component="fieldset">
        <FormLabel component="legend">Darstellungsgröße</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChangeOptions}>
          <FormControlLabel value="1" control={<Radio />} label="Klein" />
          <FormControlLabel value="2" control={<Radio />} label="Mittel" />
          <FormControlLabel value="3" control={<Radio />} label="Groß" />
        </RadioGroup>
      </FormControl>
      
      <form className={classesText.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Name" value={name} onChange={handleChangeText} />
      </form>

      <div className={classesButton.root}>
        <Button variant="contained" color="primary" onClick= {(e) => { 
        let room = { name: name, url: "https://content.thriveglobal.com/wp-content/uploads/2019/04/Sunset_in_Coquitlam.jpg", cardSize: RoomCardSize.SMALL, sensors: [] };

        if (value=="2"){
          room.cardSize = RoomCardSize.MEDIUM;
        }
        else if (value=="3") {
          room.cardSize = RoomCardSize.LARGE;
        }
        onAddRoom(room);
      }}>
      Hinzufügen
    </Button>
  </div>
    

    </div>
  );
}

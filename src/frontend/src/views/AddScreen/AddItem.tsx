import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from "react-redux"
import { StateType } from '../../reducer/rootReducer';
import { addItem } from '../../reducer/actions/itemActions';
import { FormControl } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { ItemState } from '../../reducer/states/ItemState';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: 300,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
      alignItems: 'center',
      justifyContent: 'center',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }),
);

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


export default function AddItem() {
  const classesList = useStyles();
  const classesText = useStylesText();
  const [list, setList] = React.useState<string | number>('');
  const [openList, setOpenList] = React.useState(false);
  const [name, setName] = React.useState<string>("");
  const rooms = useSelector<StateType, StateType["roomsReducer"]["rooms"]>((state) => state?.roomsReducer?.rooms ?? []);
  const items = useSelector<StateType, StateType["itemsReducer"]["items"]>((state) => state?.itemsReducer?.items ?? []);
  const scenes = useSelector<StateType, StateType["scenesReducer"]["scenes"]>((state) => state?.scenesReducer?.scenes ?? []);


  const handleChangeText = (event: React.ChangeEvent<{value : unknown }>) => {
    setName(event.target.value as string);
  }
  const dispatch = useDispatch();
  
  const onAddItem = (item: ItemState) => {
    //dispatch(addItem(item));
  }

  const handleChangeList = (event: React.ChangeEvent<{ value: unknown }>) => {
    setList(event.target.value as number);
  };
  const handleCloseList = () => {
    setOpenList(false);
  };

  const handleOpenList = () => {
    setOpenList(true);
  };

  return (
    <div>
      <div>Gerät Hinzufügen</div>
      <div>hier soll der Raum oder die Szene angezeigt werden von wo aus Hinzufügen aufgerufen wurde vlt mit props</div>

      
      <form className={classesText.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Name" value={name} onChange={handleChangeText} />
      </form>
      <div>
      <FormControl className={classesList.formControl}>
        <InputLabel id="art-select-label">Gerät Hinzufügen</InputLabel>
        <Select
          labelId="art-select-label"
          id="art-select"
          open={openList}
          onClose={handleCloseList}
          onOpen={handleOpenList}
          value={list}
          onChange={handleChangeList}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {items.map((e,i) => {
            return(
            <MenuItem value={i}>{e.label}</MenuItem>
            );
            })}
        </Select>
      </FormControl>
      <br></br>
      </div>

      <Button variant="outlined" onClick= {(e) => { 
        let item = { name: name, url: "https://www.dmjmaviation.com/wp-content/uploads/2018/05/caribbean-destination.jpg" };
        //onAddItem(item);
      }}>Hinzufügen</Button>

    </div>
  );
}

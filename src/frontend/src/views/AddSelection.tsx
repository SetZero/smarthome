import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from "react-redux"
import { Rooms } from './Rooms';
import { addRoom } from '../reducer/actions/RoomActions'
import { RoomState, RoomCardSize } from '../reducer/states/RoomStates'

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


const useStylesButton = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

export default function ControlledOpenSelect() {
  const classes = useStyles();
  const classesText = useStylesText();
  const classesButton = useStyles();
  /* const [typ, setTyp] = React.useState<string | number>('');*/
  const [typ, setTyp] = React.useState<string | number>('');
  const [art, setArt] = React.useState<string | number>('');
  const [detail, setDetail] = React.useState<string | number>('');
  const [openTyp, setOpen] = React.useState(false);
  const [openArt, setOpenArt] = React.useState(false);
  const [openDetail, setOpenDetail] = React.useState(false);
  const [name, setName] = React.useState<string>("");


  const handleChangeTyp = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTyp(event.target.value as number);
  };
  const handleChangeArt = (event: React.ChangeEvent<{ value: unknown }>) => {
    setArt(event.target.value as number);
  };
  const handleChangeDetail = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDetail(event.target.value as number);
  };

  const handleChangeText = (event: React.ChangeEvent<{value : unknown }>) => {
    setName(event.target.value as string);
  }

  const handleCloseTyp = () => {
    setOpen(false);
  };

  const handleOpenTyp = () => {
    setOpen(true);
  };
  const handleCloseArt = () => {
    setOpenArt(false);
  };

  const handleOpenArt = () => {
    setOpenArt(true);
  };
  const handleCloseDetail = () => {
    setOpenDetail(false);
  };

  const handleOpenDetail = () => {
    setOpenDetail(true);
  };

  const dispatch = useDispatch();

  const onAddRoom = (room: RoomState) => {
    dispatch(addRoom(room));
  }

  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onAddRoom({
      name: "Test",
      icon: "",
      cardSize: RoomCardSize.SMALL,
      sensors: undefined
    });
  }


  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="typ-select-label">Typ</InputLabel>
        <Select
          labelId="typ-select-label"
          id="typ-controlled-open-select"
          open={openTyp}
          onClose={handleCloseTyp}
          onOpen={handleOpenTyp}
          value={typ}
          onChange={handleChangeTyp}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Gerät</MenuItem>
          <MenuItem value={20}>Szene</MenuItem>
          <MenuItem value={30}>Raum</MenuItem>
        </Select>
      </FormControl>
      <br></br>

      <FormControl className={classes.formControl}>
        <InputLabel id="art-select-label">Geräteart</InputLabel>
        <Select
          labelId="art-select-label"
          id="art-select"
          open={openArt}
          onClose={handleCloseArt}
          onOpen={handleOpenArt}
          value={art}
          onChange={handleChangeArt}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Lampe</MenuItem>
          <MenuItem value={20}>Steckdose</MenuItem>
          <MenuItem value={30}>Thermostat</MenuItem>
        </Select>
      </FormControl>
      <br></br>

      <FormControl className={classes.formControl}>
        <InputLabel id="detail-select-label">Raum/Szene</InputLabel>
        <Select
          labelId="detail-select-label"
          id="detail-select"
          open={openDetail}
          onClose={handleCloseDetail}
          onOpen={handleOpenDetail}
          value={detail}
          onChange={handleChangeDetail}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Raum 1</MenuItem>
          <MenuItem value={20}>Raum 2</MenuItem>
          <MenuItem value={30}>Szene 1</MenuItem>
        </Select>
      </FormControl>






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

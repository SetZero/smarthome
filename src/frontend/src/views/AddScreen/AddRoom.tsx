import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from "react-redux"
import { addRoom } from '../../reducer/actions/RoomActions'
import { RoomState, RoomCardSize } from '../../reducer/states/RoomStates'
import { FormControl } from '@material-ui/core';
import { RadioGroup } from '@material-ui/core';
import { FormLabel } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Radio } from '@material-ui/core';
import { Box } from '@material-ui/core';


const useStylesText = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        padding: theme.spacing(1),
        width: '100%',
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
      justifyContent: "center",
      display: "flex"
    },
  }),
);
interface AddRoomProps {
  closeAnchorFunction: (close: any) => void
}

export default function AddRoom({ closeAnchorFunction }: AddRoomProps) {
  const classesText = useStylesText();
  const classesButton = useStylesButton();
  const [name, setName] = React.useState<string>("");
  const [value, setValue] = React.useState("1");
  const [url, setUrl] = React.useState<string>("");

  const handleChangeOptions = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  const handleChangeTexturl = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUrl(event.target.value as string);
  }
  const handleChangeText = (event: React.ChangeEvent<{ value: unknown }>) => {
    setName(event.target.value as string);
  }

  const tempPic = "https://static.schoener-wohnen.de/bilder/5b/e1/62339/full_teaser/wohntipps-wohnzimmer-fritz-hansen-sofa-lune.jpg"
  const dispatch = useDispatch();

  const onAddRoom = (room: RoomState) => {
    dispatch(addRoom(room));
    closeAnchorFunction(false);
  }

  return (
    <Box p={2}>
      <Typography variant="h4">
        Raum Hinzufügen
      </Typography>

      <Box p={2} mt={2}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Darstellungsgröße</FormLabel>
          <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChangeOptions}>
            <FormControlLabel value="1" control={<Radio />} label="Klein" />
            <FormControlLabel value="2" control={<Radio />} label="Mittel" />
            <FormControlLabel value="3" control={<Radio />} label="Groß" />
          </RadioGroup>
        </FormControl>
      </Box>

      <form className={classesText.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Name" value={name} onChange={handleChangeText} />
      </form>

      <form className={classesText.root} noValidate autoComplete="off">
        <TextField id="url" label="Bild Url" value={url} onChange={handleChangeTexturl} />
      </form>

        <Box mx="auto" p={1} className={classesButton.root}>
          <Button variant="contained" color="primary" onClick={(e) => {
            let pic = url;
            if (url.length < 3) {
              pic = tempPic;
            }

            let room = { name: name, url: pic, cardSize: RoomCardSize.SMALL, sensors: [] };


            if (value === "2") {
              room.cardSize = RoomCardSize.MEDIUM;
            }
            else if (value === "3") {
              room.cardSize = RoomCardSize.LARGE;
            }
            onAddRoom(room);
            setName("");
            setUrl("")
          }}>
            Hinzufügen
          </Button>
        </Box>


    </Box>
  );
}

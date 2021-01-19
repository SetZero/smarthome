import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from "react-redux"
import { StateType } from '../../reducer/rootReducer';
import { FormControl } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { addItemToRoom } from '../../reducer/actions/RoomActions';
import { addActionToScene } from '../../reducer/actions/SceneActions';
import { ParentType } from './AddButton';

interface AddItemProps {
  parentName:string
  parentType:ParentType
  closeAnchorFunction: (close: any) => void
}

export default function AddItem({parentName, parentType, closeAnchorFunction}:AddItemProps) {
  const [list, setList] = React.useState<string | number>('');
  const [openList, setOpenList] = React.useState(false);
  const [name, setName] = React.useState<string>("");
  const items = useSelector<StateType, StateType["itemsReducer"]["items"]>((state) => state?.itemsReducer?.items ?? []);
  const [choosenItem, setChoosenItem] = React.useState<number>(0);


  const handleChangeText = (event: React.ChangeEvent<{ value: unknown }>) => {
    setName(event.target.value as string);
  }
  const dispatch = useDispatch();

  const handleChangeList = (event: React.ChangeEvent<{ value: unknown }>) => {
    setList(event.target.value as number);
    setChoosenItem(event.target.value as number)

  };
  const handleCloseList = () => {
    setOpenList(false);
  };

  const handleOpenList = () => {
    setOpenList(true);
  };

  return (
      <Grid spacing={2}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">
            Gerät Hinzufügen
          </Typography>
        </Grid>
        </Grid>

        <FormControl>
          <Grid container spacing={2}>
            <Grid alignItems="stretch" item xs={12}>
              <InputLabel id="art-select-label">Gerät</InputLabel>
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
                {items.map((e, i) => {
                  return (
                    <MenuItem value={i}>{e.label}</MenuItem>
                  );
                })}
              </Select>
            </Grid>
          </Grid>
        </FormControl>


      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={(e) => {
            //let item = {label: items[choosenItem].label.toString(), state: ItemState.ON, link: items[choosenItem].link.toString() }
            //onAddItem(items[choosenItem]);
            // TODO: Change this from hardcoded:
            const item = items[choosenItem];
            if (parentType == ParentType.ROOM) {
              dispatch(addItemToRoom({ link: item.link }, parentName));
            } else if (parentType == ParentType.SCENE) {
              // TODO: use real scene
              dispatch(addActionToScene({ name: parentName, url: "", actions : [] }, { item: item }));
            }
            setName("");
            setList(-1);
            closeAnchorFunction(false);
          }}>
            Hinzufügen
            </Button>
        </Grid>

      </Grid>
    </Grid>
  );
}

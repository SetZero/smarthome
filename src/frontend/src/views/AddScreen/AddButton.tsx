import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Menu } from '@material-ui/core';
import AddScene from './AddScene';
import AddRoom from './AddRoom';
import AddItem from './AddItem';
import { useSelector } from 'react-redux';
import { StateType } from '../../reducer/rootReducer';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);


export enum ElementType {
  SCENE = "SCENE", ROOM = "ROOM", ITEM = "ITEM"
}

export enum ParentType {
  SCENE = "SCENE", ROOM = "ROOM", NOPARENT = "NOPARENT"
}

interface AddButtonProps { 
  type: ElementType,
  parentName:string,
  parentType:ParentType
}


export const AddButton: React.FC<AddButtonProps> = ({ type, parentName, parentType }) => {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [typ, setTyp] = React.useState<string>("");
  const rooms = useSelector<StateType, StateType["roomsReducer"]["rooms"]>((state) => state?.roomsReducer?.rooms ?? []);


  const handleClick = (typo: ElementType, event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    console.log(rooms);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Fab color="secondary"
        aria-label="add"
        onClick={(e) => handleClick(type, e)}>
        <AddIcon />
      </Fab>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 100 * 4.5,
            width: '50ch',
          },
        }}
      >
        <div className="CenterDiv">
          {type == ElementType.ROOM && (
            <AddRoom closeAnchorFunction={setAnchorEl}/>
          )}
          {type == ElementType.SCENE && (
            <AddScene closeAnchorFunction={setAnchorEl}/>
          )}
          {type == ElementType.ITEM && (
            <AddItem parentName={parentName} parentType={parentType} closeAnchorFunction={setAnchorEl}/>
          )}
        </div>
      </Menu>
    </div>
  );
}

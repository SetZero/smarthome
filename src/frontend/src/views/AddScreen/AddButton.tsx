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


export enum ElementType {
  SCENE = "SCENE", ROOM = "ROOM", ITEM = "ITEM", ACTION = "ACTION"
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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [typ, setTyp] = React.useState<string>("");
  const rooms = useSelector<StateType, StateType["roomsReducer"]["rooms"]>((state) => state?.roomsReducer?.rooms ?? []);


  const handleClick = (typo: ElementType, event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      <div>
      <div className="FloatingButtonBottomRight">
        <Fab color="secondary"
          aria-label="add"
          onClick={(e) => handleClick(type, e)}>
          <AddIcon />
        </Fab>
      </div>
      <div className="PopUpButton">
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
      <div style={{padding : 20}}>
      {type == ElementType.ROOM && (
        <AddRoom closeAnchorFunction={setAnchorEl}/>
      )}
      {type == ElementType.SCENE && (
        <AddScene closeAnchorFunction={setAnchorEl}/>
      )}
      {type == ElementType.ITEM && (
        <AddItem parentName={parentName} parentType={parentType} closeAnchorFunction={setAnchorEl}/>
      )}
      { type == ElementType.ACTION && (
        <AddItem parentName={parentName} parentType={parentType} closeAnchorFunction={setAnchorEl} />
      )}
      </div>
      </Menu>
      </div>
    </div>
  );
}

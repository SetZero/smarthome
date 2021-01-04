import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Menu } from '@material-ui/core';
import AddScene from './AddScene';
import AddRoom from './AddRoom';


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

interface AddButtonProps { type: ElementType }

export const AddButton: React.FC<AddButtonProps> = ({ type }) => {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [typ, setTyp] = React.useState<string>("");


  const handleClick = (typo: ElementType, event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Fab color="primary"
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
            <AddRoom />
          )}
          {type == ElementType.SCENE && (
            <AddScene />
          )}
        </div>
      </Menu>
    </div>
  );
}

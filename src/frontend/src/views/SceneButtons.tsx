import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { SceneState } from '../reducer/states/SceneStates';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { removeScene } from '../reducer/actions/SceneActions';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../reducer/rootReducer';
import { ApiService } from '../Utils/ApiService';
import { ItemState } from '../reducer/states/ItemState';


const options = [
  'Löschen',
  'Bearbeiten',
];

const ITEM_HEIGHT = 48;

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
    image: {
      position: 'relative',
      height: '30vh',
      [theme.breakpoints.down('xs')]: {
        width: '100% !important', // Overrides inline-style
        height: '30vh',
      },
      '&:hover, &$focusVisible': {
        zIndex: 1,
        '& $imageBackdrop': {
          opacity: 0.15,
        },
        '& $imageMarked': {
          opacity: 0,
        },
        '& $imageTitle': {
          border: '4px solid currentColor',
        },
      },
    },
    focusVisible: {},
    imageButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.common.white,
    },
    imageSrc: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center 60%',
    },
    imageBackdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
      position: 'relative',
      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: 'absolute',
      bottom: -2,
      left: 'calc(50% - 9px)',
      transition: theme.transitions.create('opacity'),
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

interface ButtonBasesProps {
  sceneState: SceneState;
  setShowChangeSceneFunction: (selectedScene: SceneState) => void
}

export default function ButtonBases({ sceneState, setShowChangeSceneFunction }: ButtonBasesProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const classesButton = useStylesButton();
  const scenes = useSelector<StateType, StateType["scenesReducer"]["scenes"]>((state) => state?.scenesReducer?.scenes ?? []);





  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (event: React.MouseEvent<HTMLElement>) => {
    scenes.forEach(e => {
      e.actions.forEach(action => {
        let item = action.item;
        switch (item.type) {
          case "Dimmer":
            ApiService.ChangeDimmer((item.state as number), item.link);
            break;
          case "Switch":
            ApiService.switchStateChange((item.state as ItemState), item.link);
            break;
        }
      })
    })
  }

  function handleClickOnOption(option: string) {
    if (option === 'Löschen')
      dispatch(removeScene(sceneState));
    if (option === 'Bearbeiten') {
      setShowChangeSceneFunction(sceneState);
    }
    handleClose();
  };

  return (

    <div className={classes.root} >

      <ButtonBase
        focusRipple
        key={sceneState.name}
        className={classes.image}
        focusVisibleClassName={classes.focusVisible}
        style={{
          width: '70%',
        }}
        onClick={handleAction}
      >
        <span
          className={classes.imageSrc}
          style={{
            backgroundImage: `url(${sceneState.url})`,
          }}
        />
        <span className={classes.imageBackdrop} />
        <span className={classes.imageButton}>
          <Typography
            component="span"
            variant="subtitle1"
            color="inherit"
            className={classes.imageTitle}
          >
            {sceneState.name}
            <span className={classes.imageMarked} />
          </Typography>
        </span>



        <div className="Right" >
          <IconButton
            color="primary"
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch',
              },
            }}
          >
            {options.map((option) => (
              <MenuItem key={option} selected={option === 'Pyxis'} onClick={() => handleClickOnOption(option)}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>

      </ButtonBase>
    </div>
  );
}

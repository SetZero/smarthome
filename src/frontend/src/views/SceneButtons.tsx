import React from 'react';
import { Theme, makeStyles, createStyles, withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

import Image from './pics/morning.jpg'; // Import using relative path

import { SceneState } from './states/SceneStates';


const images = [
  {
    url: './pics/morning.jpg',
    title: 'Morgenprogramm',
    width: '40%',
  },
  {
    url: 'https://content.thriveglobal.com/wp-content/uploads/2019/04/Sunset_in_Coquitlam.jpg',
    title: 'Abendprogramm',
    width: '30%',
  },
  {
    url: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2020%2F01%2Fflorida-keys-florida-FLVISIT0519.jpg',
    title: 'Urlaub',
    width: '30%',
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: 300,
      width: '100%',
    },
    image: {
      position: 'relative',
      height: 200,
      [theme.breakpoints.down('xs')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
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
      backgroundPosition: 'center 40%',
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
  }
  )
);

export function ButtonBases(this: any) {
  var classes = this.props;

  return (
    <div className={classes.root}>
      {images.map((image) => (
        <ButtonBase
          focusRipple
          key={image.title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: image.width,
          }}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${image.url})`,
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
              {image.title}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
      ))}
    </div>
  );
}
interface SceneButtonsProps {
  info: SceneState
}



export default class SceneButtons extends React.Component<SceneButtonsProps>{

  render(){
   // const {classes}  = useStyles();
    return (
    <div>
      <div className="Tset">

          <ButtonBase
            focusRipple
            key='Morgenprogramm'
      //      className={classes.image}
  //          focusVisibleClassName={classes.focusVisible}
            style={{
              width: '40%',
            }}
          >
            <span
       //       className={classes.imageSrc}
              style={{
                backgroundImage: `url(/static/images/grid-list/background.jpg)`,
              }}
            />
            <span 
           // className={classes.imageBackdrop} 
            />
            <span 
           // className={classes.imageButton}
            >
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
               // className={classes.imageTitle}
              >
                "Morgenprogramm"
                <span 
                //className={classes.imageMarked} 
                />
              </Typography>
            </span>
          </ButtonBase>
        )
      </div>
    </div>);
  }
}



import { Card, CardContent, Switch, Typography, Grid, makeStyles, Theme, createStyles, CardMedia, CardActionArea, Container, IconButton, Menu, MenuItem } from "@material-ui/core"
import React from "react"
import { RoomCardSize, RoomState } from "../reducer/states/RoomStates"
import { MainView } from "./MainView";
import { SingleRoom } from './SingleRoom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useDispatch } from "react-redux";
import { removeRoom } from "../reducer/actions/RoomActions";

interface RoomCardProps {
    info: RoomState,
    showRoomFunction: (selectedRoom: boolean) => void
    setRoomFunction: (selectedRoom: string) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fullHeightCard: {
            height: "100%",
        },
        media: {
            height: 140
        }
    }));

    //Configuration for the 3 dot menu
const options = [
    'Raum löschen',
    'Raum bearbeiten'
];
const ITEM_HEIGHT = 48;

export const RoomCard: React.FC<RoomCardProps> = ({ info, showRoomFunction, setRoomFunction }) => {
    let sizeXS: 6 | 3 | 2 | 12 | 1 | 4 | 5 | 7 | 8 | 9 | 10 | 11;
    let sizeSM: 6 | 3 | 2 | 12 | 1 | 4 | 5 | 7 | 8 | 9 | 10 | 11;
    let sizeMD: 6 | 3 | 2 | 12 | 1 | 4 | 5 | 7 | 8 | 9 | 10 | 11;
    let sizeLG: 6 | 3 | 2 | 12 | 1 | 4 | 5 | 7 | 8 | 9 | 10 | 11;
    const classes = useStyles();

    switch (info.cardSize) {
        case RoomCardSize.SMALL:
            sizeXS = 6;
            sizeSM = 6;
            sizeMD = 3;
            sizeLG = 3;
            break;
        case RoomCardSize.MEDIUM:
            sizeXS = 12;
            sizeSM = 12;
            sizeMD = 9;
            sizeLG = 6;
            break;
        case RoomCardSize.LARGE:
            sizeXS = 12;
            sizeSM = 12;
            sizeMD = 12;
            sizeLG = 6;
            break;
    }

    //Link anchor Element for 3 Dot-Menu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const HandleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        //dispatch(removeRoom(info));
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    function handleClickOnOption(option:string) {
        console.log("OPTION",option);
        console.log("NAME",info.name);
        dispatch(removeRoom(info));
        handleClose();
    };

    const handleClickOnCard = (event: React.MouseEvent<HTMLElement>) => {
       
        showRoomFunction(true); 
        setRoomFunction(info.name);        
    }

    return (
        <Grid item xs={sizeXS} sm={sizeSM} md={sizeMD} lg={sizeLG} className={classes.fullHeightCard}>
            <Card className={classes.fullHeightCard}>
                <CardActionArea >
                    <CardMedia
                        onClick={handleClickOnCard }
                        className={classes.media}
                        image={info.url}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        
                        <Typography gutterBottom variant={info.name.length > 11 ? "h6":"h5"} component="h2">
                            {info.name}
                            <Switch inputProps={{ 'aria-label': 'primary checkbox' }} />
                            <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={HandleClick}
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
                                }}>
                                {options.map((option) => (
                                    <MenuItem key={option} onClick={() => handleClickOnOption(option)}>
                                      {option}
                                    </MenuItem>
                                  ))}
                            </Menu>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

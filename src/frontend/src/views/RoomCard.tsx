import { Card, CardContent, Typography, Grid, makeStyles, Theme, createStyles, CardMedia, CardActionArea, IconButton, Menu, MenuItem } from "@material-ui/core"
import React, { useState } from "react"
import { RoomCardSize, RoomState } from "../reducer/states/RoomStates"
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useDispatch } from "react-redux";
import { changeRoomOrder, removeRoom, RoomDirection } from "../reducer/actions/RoomActions";
import { DeleteDialog } from "./DeleteDialog";
import RoomToggle from "../Utils/RoomUtils"

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
        },
        center: {
            alignSelf: "center"
        },
        rightText: {
            textAlign: "right"
        },
        leftText: {
            textAlign: "left"
        },
        centerRight: {
            alignSelf: "center",
            textAlign: "right"
        }
    }));

//Configuration for the 3 dot menu
const options = [
    { name: '🡼 Nach oben', op: 'DOWN' },
    { name: '🢆 Nach unten', op: 'UP' },
    { name: 'Raum löschen', op: 'DELETE' },
];
const ITEM_HEIGHT = 48;

export const RoomCard: React.FC<RoomCardProps> = ({ info, showRoomFunction, setRoomFunction }) => {
    let sizeXS: 6 | 3 | 2 | 12 | 1 | 4 | 5 | 7 | 8 | 9 | 10 | 11;
    let sizeSM: 6 | 3 | 2 | 12 | 1 | 4 | 5 | 7 | 8 | 9 | 10 | 11;
    let sizeMD: 6 | 3 | 2 | 12 | 1 | 4 | 5 | 7 | 8 | 9 | 10 | 11;
    let sizeLG: 6 | 3 | 2 | 12 | 1 | 4 | 5 | 7 | 8 | 9 | 10 | 11;
    let maxCharWidth;
    const classes = useStyles();

    switch (info.cardSize) {
        case RoomCardSize.SMALL:
            sizeXS = 6;
            sizeSM = 6;
            sizeMD = 3;
            sizeLG = 3;

            maxCharWidth = 10;
            break;
        case RoomCardSize.MEDIUM:
            sizeXS = 12;
            sizeSM = 12;
            sizeMD = 9;
            sizeLG = 6;

            maxCharWidth = 15;
            break;
        case RoomCardSize.LARGE:
            sizeXS = 12;
            sizeSM = 12;
            sizeMD = 12;
            sizeLG = 6;

            maxCharWidth = 20;
            break;
    }

    //Link anchor Element for 3 Dot-Menu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    let [openRemoveDialog, setOpenRemoveDialog] = useState(false);
    const HandleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        //dispatch(removeRoom(info));
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    function handleClickOnOption(option: string) {
        switch (option) {
            case 'DELETE':
                //dispatch(removeRoom(info));
                setOpenRemoveDialog(true);
                break;
            case 'DOWN':
                dispatch(changeRoomOrder(info, RoomDirection.DOWN));
                break;
            case 'UP':
                dispatch(changeRoomOrder(info, RoomDirection.UP));
                break;
        }
        handleClose();
    };

    const handleClickOnCard = (event: React.MouseEvent<HTMLElement>) => {
        showRoomFunction(true);
        setRoomFunction(info.name);
    }

    return (
        <Grid item xs={sizeXS} sm={sizeSM} md={sizeMD} lg={sizeLG} className={classes.fullHeightCard}>
            <DeleteDialog open={openRemoveDialog} setOpen={setOpenRemoveDialog} action={removeRoom(info)} />
            <Card className={classes.fullHeightCard}>
                <CardActionArea >
                    <CardMedia
                        onClick={handleClickOnCard}
                        className={classes.media}
                        image={info.url || "/default-image.jpg"}
                        title="Contemplative Reptile"
                    />
                </CardActionArea>
                <CardContent>
                    <Grid container justify="space-between" alignContent="center" alignItems="stretch">
                        <Grid item xs={12} sm={6} className={classes.center}>
                            <Typography variant={info.name.length > 9 ? "h6" : "h5"} component="h2" className={classes.leftText}>
                                {info.name.length > maxCharWidth ? info.name.substr(0, maxCharWidth - 3) + "..." : info.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={4} className={classes.center}>
                            <RoomToggle roomName={info.name} />
                        </Grid>
                        <Grid item xs={6} sm={2} className={classes.centerRight}>
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
                                    <MenuItem key={option.name} onClick={() => handleClickOnOption(option.op)}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
}

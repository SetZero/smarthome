import { Paper, Container, Button, Switch, Grid, Typography, LinearProgress, IconButton, Slider, Menu, MenuItem } from "@material-ui/core"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { itemStateChange } from "../reducer/actions/ItemActions";
import { StateType } from "../reducer/rootReducer";
import { Item, ItemState } from "../reducer/states/ItemState";
import { ApiService } from "../Utils/ApiService";
import { AddButton, ElementType, ParentType } from "./AddScreen/AddButton";
import DeleteIcon from '@material-ui/icons/Delete';
import { removeItemFromRoom } from "../reducer/actions/RoomActions";
import { ItemRef } from "../reducer/states/RoomStates";

interface SingleRoomProps {
    roomName: string
}

export const SingleRoom: React.FC<SingleRoomProps> = ({ roomName }) => {
    const items = useSelector<StateType, StateType["itemsReducer"]["items"]>((state) => state?.itemsReducer?.items ?? []);
    const rooms = useSelector<StateType, StateType["roomsReducer"]["rooms"]>((state) => state?.roomsReducer?.rooms ?? []);
    console.log(rooms);
    const currentRoom = rooms.find(e => e.name === roomName);
    console.log(currentRoom);
    const dispatch = useDispatch();
    var [isChangeRoom, setIsChangeRoom] = useState(false);

    const onItemStateChange = (item: Item) => {
        dispatch(itemStateChange(item));
    }

    const onItemToggle = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean, item: Item) => {
        item.state = checked ? ItemState.ON : ItemState.OFF;
        onItemStateChange(item);
    }

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const HandleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        //dispatch(removeRoom(info));
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    function handleClickOnOption(option: string) {
        setIsChangeRoom(true);
        handleClose();
    };

    async function handleClickOnDeleteItemInRoom(e: Item) {
        var ref: ItemRef = { link: e.link };
        await dispatch(removeItemFromRoom(ref, roomName));

    }

    var options = [
        'Raum bearbeiten'
    ];

    items.filter(e => currentRoom?.sensors?.find(f => f.link === e.link && e.type == 'Dimmer') !== undefined).map(e => {
        console.log("Dimmer :" + e.label);
    });
    items.filter(e => currentRoom?.sensors?.find(f => f.link === e.link && e.type == 'Switch') !== undefined).map(e => {
        console.log("Lampe :" + e.label);
    });

    dispatch(removeItemFromRoom({ link: "http://localhost:8080/rest/items/HeizungWZ" }, roomName));
    return (
        <div>
            <div className="BiggerText">
                {roomName}
            </div>
            <Container maxWidth="sm">
                <Paper variant="outlined" elevation={3}>
                    <Grid container alignItems="center" justify="space-around" spacing={2}>
                        <Grid item sm={8} xs={10}>
                            <Typography variant="h4" component="h3">

                            </Typography>
                        </Grid>

                        <Grid item xs={2} sm={2}>
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
                                        maxHeight: 40 * 4.5,
                                        width: '20ch',
                                    },
                                }}>
                                {options.map((option) => (
                                    <MenuItem key={option} onClick={() => handleClickOnOption(option)}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Grid>
                    </Grid>
                    {items.filter(e => currentRoom?.sensors?.find(f => f.link === e.link && e.type == 'Switch') !== undefined).map(e => {
                        return (
                            <Grid className="Left" container alignItems="center" justify="flex-start" item xs spacing={2} key={e.link}>

                                {isChangeRoom ?
                                    <IconButton aria-label="delete" onClick={() => {handleClickOnDeleteItemInRoom(e)} }>
                                        <DeleteIcon />
                                    </IconButton >
                                    : ""
                                }

                                <Grid item sm={8} xs={8}>
                                    <Typography variant="h5" component="h6">
                                        {e.name}
                                    </Typography>

                                </Grid>
                                <Grid item sm={2} xs={2}>
                                    <Switch
                                        name="unused"
                                        inputProps={{ 'aria-label': 'secondary-checkbox' }}
                                        onChange={(event, state) => onItemToggle(event, state, e)}
                                        checked={e.state === ItemState.ON ?? false}
                                    />
                                </Grid>
                            </Grid>
                        )
                    })}
                    {items.filter(e => currentRoom?.sensors?.find(f => f.link === e.link && e.type == 'Dimmer') !== undefined).map(e => {
                        return (
                            <Grid className="Left" container alignItems="center" justify="flex-start" item xs spacing={2}>
                                {isChangeRoom ?
                                    <IconButton aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton> : ""
                                }
                                <Grid item sm={3} xs={4}>
                                    <Typography variant="h5" component="h6">
                                        {e.name}
                                    </Typography>
                                </Grid>
                                <Grid item sm={6} xs={6}>
                                    <Slider defaultValue={20} aria-labelledby="discrete-slider" step={2} marks min={0} max={35}
                                        onChange={(ev, val) => {
                                            ApiService.ChangeDimmer(val + '', e.name);
                                        }}

                                    />
                                </Grid>
                                <Grid item sm={1} xs={2}>
                                    <Typography>
                                        {e.state}
                                    </Typography>
                                </Grid>
                            </Grid>
                        )
                    })}
                    {isChangeRoom ?<div>
                        <Button variant="contained" color="primary" onClick={(e) => {
                            setIsChangeRoom(false);
                        }}>
                            Bearbeiten beenden
                        </Button>
                    </div>:""}
                

                </Paper>
                <AddButton type={ElementType.ITEM} parentName={roomName} parentType={ParentType.ROOM} />
            </Container>
        </div>
    );
}

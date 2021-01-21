import { Button, Switch, Grid, Typography, TextField, IconButton, Slider, Menu, MenuItem } from "@material-ui/core"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { itemStateChange } from "../reducer/actions/ItemActions";
import { StateType } from "../reducer/rootReducer";
import { ItemState } from "../reducer/states/ItemState";
import { AddButton, ElementType, ParentType } from "./AddScreen/AddButton";
import { removeItemFromRoom } from "../reducer/actions/RoomActions";
import { RoomCardSize, RoomState } from "../reducer/states/RoomStates";
import { updateRoom } from "../reducer/actions/RoomActions"

interface SingleRoomProps {
    roomName: string,
}

export default function SingleRoom({ roomName }: SingleRoomProps) {
    const items = useSelector<StateType, StateType["itemsReducer"]["items"]>((state) => state?.itemsReducer?.items ?? []);
    const rooms = useSelector<StateType, StateType["roomsReducer"]["rooms"]>((state) => state?.roomsReducer?.rooms ?? []);
    const dispatch = useDispatch();

    const [isChangeRoom, setIsChangeRoom] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [state, setRoomProps] = React.useState<RoomState>({ name: roomName, url: "", cardSize: RoomCardSize.SMALL, sensors: [] });
    const [oldState, setCurrentRoomProps] = React.useState<RoomState>({ name: roomName, url: "", cardSize: RoomCardSize.SMALL, sensors: [] });
    const open = Boolean(anchorEl);

    const options = [
        'Raum bearbeiten'
    ];

    const updateCurrentRoomProps = () => {
        const currentRoom = rooms.find(e => e.name == state.name);
        if (currentRoom == undefined) {
            // Update wasn't succesfull
            return;
        }

        setCurrentRoomProps(currentRoom);
    }

    const updateState = () => {
        dispatch(updateRoom(oldState, state));
        updateCurrentRoomProps();
    }

    const handleChangeText = (event: React.ChangeEvent<{ value: unknown }>) => {
        let newState = state;
        newState.name = event.target.value as string;
        setRoomProps(newState);
    }

    const handleChangeTexturl = (event: React.ChangeEvent<{ value: unknown }>) => {
        let newState = state;
        newState.url = event.target.value as string;
        setRoomProps(newState);
    }

    const HandleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        //dispatch(removeRoom(info));
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClickOnOption = (option: string) => {
        setIsChangeRoom(true);
        handleClose();
    };

    return (
        <div>
            <Grid container spacing={4}>
                <Grid item xs={2} />
                <Grid item xs={8}>
                    <Typography variant="h3" component="h3">
                        {oldState.name}
                    </Typography>
                </Grid>

                <Grid item xs={2}>
                    <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={HandleClick}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose} >
                        {options.map((option) => (
                            <MenuItem key={option} onClick={() => handleClickOnOption(option)}>
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                </Grid>
                {isChangeRoom ?
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <TextField id="standard-basic" label="Name" onChange={(e) => { handleChangeText(e) }} />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} alignItems="flex-end">
                                <Grid item xs={8}>
                                    <TextField id="url" label="Bild Url" onChange={(e) => { handleChangeTexturl(e); }} />
                                </Grid>
                                <Grid item xs={2}>
                                    <Button variant="contained" color="primary" onClick={(e) => {
                                        // TODO: Add save option here
                                        updateState();
                                    }}>
                                        Speichern
                                </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    : ""}
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4">
                            Geräte
                            </Typography>
                    </Grid>
                </Grid>
                {
                    items.filter(currentSensor => {
                        const thisRoom = rooms.find(r => r.name === roomName);
                        console.log("This room : " + JSON.stringify(thisRoom));

                        return thisRoom?.sensors?.find(cs => cs.link === currentSensor.link) != undefined
                            && (currentSensor.type == 'Switch' || currentSensor.type == 'Dimmer')
                    })
                        ?.map(e => {
                            return (
                                <Grid className="Left" container alignItems="center" spacing={2}>
                                    {isChangeRoom ?
                                        <Grid item xs={1}>
                                            <IconButton aria-label="delete"
                                                onClick={() => {
                                                    dispatch(removeItemFromRoom({ link: e.link }, roomName));
                                                }}>
                                                <DeleteIcon />
                                            </IconButton >
                                        </Grid>
                                        : ""
                                    }

                                    <Grid item xs={4}>
                                        <Typography variant="h5" component="h6">
                                            {e.name}
                                        </Typography>
                                    </Grid>
                                    { e.type == "Switch" ?
                                        <Grid alignItems="flex-end" item xs={7}>
                                            <Switch
                                                name="unused"
                                                inputProps={{ 'aria-label': 'secondary-checkbox' }}
                                                onChange={(event, state) => {
                                                    e.state = e.state == ItemState.OFF ? ItemState.ON : ItemState.OFF;
                                                    dispatch(itemStateChange(e))
                                                }}
                                                checked={e.state === ItemState.ON ?? false}
                                            />
                                        </Grid>
                                        : ""
                                    }

                                    { e.type == "Dimmer" ?
                                        <Grid item xs={7}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={10}>
                                                    <Slider defaultValue={20} aria-labelledby="discrete-slider" step={2} marks min={0} max={35}
                                                        onChange={(ev, val) => {
                                                            e.state = parseInt(val + "");
                                                            dispatch(itemStateChange(e));
                                                        }} />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography>
                                                        {e.state}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        : ""
                                    }

                                </Grid>
                            )
                        })}
                <Grid item xs={12}>
                    {isChangeRoom ?
                        <Button variant="contained" color="primary" onClick={(e) => {
                            setIsChangeRoom(false);
                        }}>
                            Bearbeiten beenden
                        </Button>
                        : ""
                    }
                </Grid>
            </Grid>
            <AddButton type={ElementType.ITEM} parentName={roomName} parentType={ParentType.ROOM} />
        </div>
    );
}

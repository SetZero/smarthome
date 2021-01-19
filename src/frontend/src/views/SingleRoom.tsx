import { Button, Switch, Grid, Typography, LinearProgress, IconButton, Slider, Menu, MenuItem } from "@material-ui/core"
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

export default function SingleRoom({ roomName }: SingleRoomProps) {
    const items = useSelector<StateType, StateType["itemsReducer"]["items"]>((state) => state?.itemsReducer?.items ?? []);
    const rooms = useSelector<StateType, StateType["roomsReducer"]["rooms"]>((state) => state?.roomsReducer?.rooms ?? []);
    const dispatch = useDispatch();

    const [isChangeRoom, setIsChangeRoom] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const options = [
        'Raum bearbeiten'
    ];

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
            <Grid container alignItems="center" justify="space-around" spacing={4}>
                <Grid item sm={8} xs={10}>
                    <Typography variant="h3" component="h3">
                        {roomName}
                    </Typography>
                </Grid>

                <Grid item xs={2} sm={2}>
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
                        <Grid className="Left" container alignItems="center" justify="flex-start" item xs spacing={2} key={e.link}>
                            {isChangeRoom ?
                                <Grid item xs={1}>
                                    <IconButton aria-label="delete" 
                                    onClick={() => { 
                                        dispatch(removeItemFromRoom({ link: e.link} , roomName)); 
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
            {isChangeRoom ?
                <Button variant="contained" color="primary" onClick={(e) => {
                    setIsChangeRoom(false);
                }}>
                    Bearbeiten beenden
                        </Button>
                : ""
            }


            <AddButton type={ElementType.ITEM} parentName={roomName} parentType={ParentType.ROOM} />
        </div>
    );
}

import { Paper, Container, Button, Switch, Grid, Typography, LinearProgress, IconButton, Slider, Menu, MenuItem } from "@material-ui/core"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { itemStateChange } from "../reducer/actions/ItemActions";
import { StateType } from "../reducer/rootReducer";
import { Item, ItemState } from "../reducer/states/ItemState";
import { ApiService } from "../Utils/ApiService";
import { AddButton, ElementType } from "./AddScreen/AddButton";

interface SingleRoomProps {
    roomName:string
}

export const SingleRoom: React.FC<SingleRoomProps> = ({ roomName}) => {
    const items = useSelector<StateType, StateType["itemsReducer"]["items"]>((state) => state?.itemsReducer?.items ?? []);
    const rooms = useSelector<StateType, StateType["roomsReducer"]["rooms"]>((state) => state?.roomsReducer?.rooms ?? []);
    console.log(rooms);
    const currentRoom = rooms.find(e => e.name === roomName);
    console.log(currentRoom);

    const dispatch = useDispatch();

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
    function handleClickOnOption(option:string) {
        console.log("OPTION",option);
       // console.log("NAME",info.name);
        //dispatch(removeRoom(info));
        handleClose();
    };

    const options = [
        'Raum bearbeiten'
    ];
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
                    <Grid container alignItems="center" justify="flex-start" item xs spacing={2}>
                        <Grid item sm={4} xs={10}>
                            <Typography variant="h5" component="h6">
                                Temperatur
                                    </Typography>
                        </Grid>
                        <Grid item sm={6} xs={6}>
                            <LinearProgress variant="determinate" value={25} />
                        </Grid>
                        <Grid item sm={2} xs={2}>
                            <Typography>
                                23°C
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" justify="flex-start" item xs spacing={2}>
                        <Grid item sm={4} xs={10}>
                            <Typography variant="h5" component="h6">
                                Heizung
                                </Typography>
                        </Grid>
                        <Grid item sm={6} xs={6}>
                            <Slider defaultValue={20} aria-labelledby="discrete-slider" step={2} marks min={0} max={35}
                                onChange={(e, val) => {
                                    ApiService.ChangeDimmer(val + '', "HeizungWZ");
                                }}

                            />
                        </Grid>
                        <Grid item sm={2} xs={2}>
                            <Typography>
                                20°C
                                </Typography>
                        </Grid>
                    </Grid>
                    {items.filter(e => currentRoom?.sensors?.find(f => f.link === e.link) !== undefined).map(e => {
                        return (
                            <Grid container alignItems="center" justify="flex-start" item xs spacing={2} key={e.link}>
                                <Grid item sm={8} xs={10}>
                                    <Typography variant="h5" component="h6">
                                        {e.label}
                                    </Typography>

                                </Grid>
                                <Grid item sm={4} xs={6}>
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

                    <Grid container alignItems="center" justify="flex-start" item xs spacing={2}>
                        <Grid item sm={12}>
                            <Button>
                                Actions
                                </Button>
                        </Grid>
                    </Grid>
                </Paper>
                <AddButton type={ElementType.ITEM} parentName={roomName}/>
            </Container>
        </div>
    );
}

import { Container, Grid } from "@material-ui/core";
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { RoomCard } from "./RoomCard";
import { RoomState} from "../reducer/states/RoomStates"
import { StateType } from "../reducer/rootReducer";
import { addRoom } from "../reducer/actions/RoomActions";

interface RoomProps { }
 //, "Küche", "Wohnzimmer", "Briefkasten", "Büro", "Schlafzimmer", "Garage"

export const Rooms: React.FC<RoomProps> = ({ }) => {
    const rooms = useSelector<StateType, StateType["roomsReducer"]["rooms"]>((state) => state.roomsReducer.rooms);
    const dispatch = useDispatch();

    return (
        <Container>
            <Grid container spacing={3}
                direction="row"
                justify="center"
                alignItems="center">
                {rooms.map((element, i) => {
                    return (<RoomCard info={element} key={i} />)
                })}
            </Grid>
        </Container>
    )
}
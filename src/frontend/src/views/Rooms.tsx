import { Button, Container, Grid } from "@material-ui/core";
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { RoomCard } from "./RoomCard";
import { RoomCardSize, RoomState } from "../reducer/states/RoomStates"
import { StateType } from "../reducer/rootReducer";
import { addRoom } from "../reducer/actions/RoomActions";
import { SingleRoom } from "./SingleRoom";
import { useState } from "react";

interface RoomProps { isNew:string}
//, "Küche", "Wohnzimmer", "Briefkasten", "Büro", "Schlafzimmer", "Garage"

export const Rooms: React.FC<RoomProps> = ({ isNew}) => {
    const rooms = useSelector<StateType, StateType["roomsReducer"]["rooms"]>((state) => state?.roomsReducer?.rooms ?? []);
    const dispatch = useDispatch();
    const onAddRoom = (room: RoomState) => {
        dispatch(addRoom(room));
    }

    var [showSelectedRoom,setShowSelectedRoom ]  =useState(false);

    console.log(showSelectedRoom);

    if(showSelectedRoom){
        return (<Container className="flexGrow">
            <SingleRoom />
        </Container>
        )
    }
    else{
        return (
            <Container>
                <Grid container spacing={3}
                    direction="row"
                    justify="center"
                    alignItems="center">
                        Test:{String(showSelectedRoom)}
                    {rooms.map((element, i) => {
                        return (<RoomCard info={element} key={i} showRoomFunction={setShowSelectedRoom}/>)
                    })}
                </Grid>
            </Container>
        )

    }
    


}


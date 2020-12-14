import { Container, Grid } from "@material-ui/core";
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { RoomCard } from "./RoomCard";
import { RoomState } from "../reducer/states/RoomStates"
import { StateType } from "../reducer/rootReducer";
<<<<<<< Updated upstream
import { addRoom } from "../reducer/actions/RoomActions";
=======
import { addRoom } from "../reducer/actions/roomActions";
import { SingleRoom } from "./SingleRoom";
import { useState } from "react";
>>>>>>> Stashed changes

interface RoomProps { currentView: number }
//, "Küche", "Wohnzimmer", "Briefkasten", "Büro", "Schlafzimmer", "Garage"

export const Rooms: React.FC<RoomProps> = ({ }) => {
    const rooms = useSelector<StateType, StateType["roomsReducer"]["rooms"]>((state) => state.roomsReducer.rooms);
    const dispatch = useDispatch();
    const [showSelectedRoom,setShowSelectedRoom ]  =useState(false);

<<<<<<< Updated upstream
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
=======
    const onAddRoom = (room: RoomState) => {
        dispatch(addRoom(room));
    }

    const showRoom = (selectedRoom:boolean) => {
        //alert("showRoom")
        console.log("showSelectedRoom:",showSelectedRoom);
       // showSelectedRoom = selectedRoom;
    }

    

    if(showSelectedRoom){
        return (<Container className="flexGrow">
            <SingleRoom />
>>>>>>> Stashed changes
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


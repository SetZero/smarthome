import { Container, Grid, Typography } from "@material-ui/core";
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { RoomCard } from "./RoomCard";
import { RoomCardSize, RoomState } from "../reducer/states/RoomStates"
import { StateType } from "../reducer/rootReducer";
import { addRoom } from "../reducer/actions/RoomActions";
import SingleRoom from "./SingleRoom";
import { useState } from "react";
import { AddButton, ElementType, ParentType } from './AddScreen/AddButton';

interface RoomProps { isNew: string }

export default function Rooms ({ isNew } : RoomProps) {
    const rooms = useSelector<StateType, StateType["roomsReducer"]["rooms"]>((state) => state?.roomsReducer?.rooms ?? []);
    let [showSelectedRoom, setShowSelectedRoom] = useState(false);
    let [selectedRoom, setSelectedRoom] = useState("Test");

    if (showSelectedRoom) {
        return (
            <div>
                {rooms.map(element => {                        
                    console.log("Updating");
                    return (
                        <Typography> Sensors : {JSON.stringify(element.sensors)} </Typography>
                    );
                })
                }
            <SingleRoom roomName={selectedRoom}/>
            </div>
        )
    }
    else {
        return (
            <div>
                <Typography variant="h2">
                        Räume
                </Typography>
                <Grid container spacing={3}
                    direction="row"
                    justify="center"
                    alignItems="center">

                    {rooms.map((element, i) => {
                        return (<RoomCard info={element} key={i} showRoomFunction={setShowSelectedRoom} setRoomFunction={setSelectedRoom} />)
                    })}
                </Grid>
                <AddButton type={ElementType.ROOM} parentName={"test"} parentType={ParentType.NOPARENT}/>
                
            </div>
        )

    }



}


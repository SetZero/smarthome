import React, { useEffect } from "react"
import SingleRoom from "./SingleRoom";
import { Grid, Typography, Container } from "@material-ui/core";
import { useSelector } from "react-redux"
import { RoomCard } from "./RoomCard";
import { StateType } from "../reducer/rootReducer";
import { useState } from "react";
import { AddButton, ElementType, ParentType } from './AddScreen/AddButton';
import { CurrentView, MainView, StateHelper } from "./MainView";

interface RoomProps {
    stateTransfer: StateHelper
}

export default function Rooms ({ stateTransfer } : RoomProps) {
    const rooms = useSelector<StateType, StateType["roomsReducer"]["rooms"]>((state) => state?.roomsReducer?.rooms ?? []);
    let [showSelectedRoom, setShowSelectedRoom] = useState(false);
    let [selectedRoom, setSelectedRoom] = useState("");
    stateTransfer.dispatcher = setShowSelectedRoom;

    if (showSelectedRoom) {
        return (
            <SingleRoom roomName={selectedRoom} showRoomFunction={setShowSelectedRoom} />
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


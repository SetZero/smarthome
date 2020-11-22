import React from "react"
import { connect, useSelector } from "react-redux"
import { RoomCard } from "./RoomCard";
import { RoomsState, RoomState, roomsReducer } from "./states/RoomStates"

interface RoomProps { }

export class Rooms extends React.Component<RoomProps> {
    private readonly roomsInfo: RoomsState = {
        rooms: [
            { name: "Bad", icon: "BathtubIcon" },
            { name: "Küche", icon: "KitchenIcon" },
            { name: "Wohnzimmer", icon: "WeekendIcon" }
        ]
    }; //, "Küche", "Wohnzimmer", "Briefkasten", "Büro", "Schlafzimmer", "Garage"
    render() {
        return (
            <div>
                {this.roomsInfo.rooms.map((element, i) => {
                    return (<RoomCard info={element} key={i}/>)
                })}
            </div>
        )
    }
}
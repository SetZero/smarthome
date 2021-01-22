import React from 'react'
import { StateType } from "../reducer/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { ItemState } from "../reducer/states/ItemState"
import { itemStateChange } from "../reducer/actions/ItemActions"
import Switch  from "@material-ui/core/Switch";

interface RoomToggleProps {
    roomName: string
}

export default function RoomToggle({roomName} : RoomToggleProps) {

    const items = useSelector<StateType, StateType["itemsReducer"]["items"]>((state) => state?.itemsReducer?.items ?? []);
    const rooms = useSelector<StateType, StateType["roomsReducer"]["rooms"]>((state) => state?.roomsReducer?.rooms ?? []);
    const dispatch = useDispatch();

    const ShouldBeVisible = (roomName : string) : boolean => {
        const currentRoom = rooms.find(e => e.name === roomName);

        let relevantEntries : number = 0;

        currentRoom?.sensors?.forEach(item => {
            const currentItem = items.find(e => e.link === item.link);

            if (currentItem !== undefined && currentItem.ignoreRoomSwitch !== undefined && !currentItem.ignoreRoomSwitch) {
                relevantEntries++;
            }
        });

        return relevantEntries != 0;
    }

    const executeToggleRoom = (roomName: string) => {
        const currentRoom = rooms.find(e => e.name === roomName);
        const isOff : boolean = isRoomOff(roomName);

        if (currentRoom === undefined) {
            return;
        }

        currentRoom.sensors?.forEach(a => {
            let currentItem = items.find(i => i.link === a.link);

            if (currentItem === undefined || currentItem.ignoreRoomSwitch === undefined || currentItem.ignoreRoomSwitch) {
                return;
            }

            let actionToExecute: ItemState | number = currentItem.state;

            if (isOff && currentItem.onState !== undefined) {
                actionToExecute = currentItem.onState;
            } else if (!isOff && currentItem.offState !== undefined) {
                actionToExecute = currentItem.offState;
            }

            dispatch(itemStateChange({ ...currentItem, state: actionToExecute }));
        });
    }

    const isRoomOff = (roomName : string) : boolean => {
        const currentRoom = rooms.find(e => e.name === roomName);

        if (currentRoom === undefined) {
            return false;
        }

        let allOff : boolean = true;

        currentRoom.sensors?.forEach(a => {
            let currentItem = items.find(i => i.link === a.link);

            if (currentItem === undefined || currentItem.ignoreRoomSwitch) {
                return;
            }

            let actionToExecute: ItemState | number = currentItem.state;

            if (currentItem.offState !== undefined) {
                actionToExecute = currentItem.offState;
            } else {
                allOff = false;
            }

            allOff = allOff && (actionToExecute.toString() === currentItem.state.toString());
        });

        return allOff;
    }

    return (
        <div>
            { ShouldBeVisible(roomName) ?
                <Switch inputProps={{ 'aria-label': 'primary checkbox' }} 
                onChange={() => { executeToggleRoom(roomName)}}
                checked={!isRoomOff(roomName)}/>
            : ""
            }
        </div>
    );
};
import React from 'react';
import SceneButtons from './SceneButtons';
import { SceneState } from '../reducer/states/SceneStates';
import { useDispatch, useSelector } from 'react-redux'
import { StateType } from "../reducer/rootReducer";
import AddButton from './AddScreen/AddButton';

interface SceneProps { }

export const Scenes : React.FC<SceneProps> = ({}) => {

    const scenes = useSelector<StateType, StateType["scenesReducer"]["scenes"]>((state) => state.scenesReducer.scenes);
    const dispatch = useDispatch();

    return (
        <div>
            {scenes.map((element, i) => {
                return (<SceneButtons sceneState={element} />)
            })}
            <AddButton />
        </div>
    )
}
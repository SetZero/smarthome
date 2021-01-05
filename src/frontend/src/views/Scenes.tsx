import React from 'react';
import SceneButtons from './SceneButtons';
import { useDispatch, useSelector } from 'react-redux'
import { StateType } from "../reducer/rootReducer";
import { AddButton, ElementType } from './AddScreen/AddButton';

interface SceneProps { }

export const Scenes: React.FC<SceneProps> = ({ }) => {

    const scenes = useSelector<StateType, StateType["scenesReducer"]["scenes"]>((state) => state.scenesReducer.scenes);
    const dispatch = useDispatch();

    return (
        <div>
            <div className="BiggerText">
                Szenen
                    </div>
            {scenes.map((element, i) => {
                return (<SceneButtons sceneState={element} />)
            })}
            <AddButton type={ElementType.SCENE} />
        </div>
    )
}
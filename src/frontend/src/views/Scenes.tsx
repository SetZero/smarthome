import React, { useState } from 'react';
import SceneButtons from './SceneButtons';
import { useDispatch, useSelector } from 'react-redux'
import { StateType } from "../reducer/rootReducer";
import { AddButton, ElementType } from './AddScreen/AddButton';
import ChangeScene from './AddScreen/ChangeScene';
import { SceneState } from '../reducer/states/SceneStates';

interface SceneProps { }

export const Scenes: React.FC<SceneProps> = ({ }) => {

    const scenes = useSelector<StateType, StateType["scenesReducer"]["scenes"]>((state) => state.scenesReducer.scenes);
    const dispatch = useDispatch();
    var state:SceneState = { name: "", url: "" };
    var [showChangeScene, setShowChangeScene] = useState(state);

    if(showChangeScene.name == ""){
        return (
            <div>
                <div className="BiggerText">
                        Szenen
                    </div>
                {scenes.map((element, i) => {
                    return (<SceneButtons sceneState={element} setShowChangeSceneFunction = {setShowChangeScene}/>)
                })}
                <AddButton type={ElementType.SCENE}/>
            </div>
        )
    }
    else{
        return (
        <div>
            <ChangeScene sceneState={showChangeScene} setShowChangeSceneFunction = {setShowChangeScene}></ChangeScene>
        </div>
    )}
    
}
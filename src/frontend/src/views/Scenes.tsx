import React, { useState } from 'react';
import { Typography } from "@material-ui/core";
import SceneButtons from './SceneButtons';
import { useDispatch, useSelector } from 'react-redux'
import { StateType } from "../reducer/rootReducer";
import { AddButton, ElementType, ParentType } from './AddScreen/AddButton';
import ChangeScene from './AddScreen/ChangeScene';
import { SceneState } from '../reducer/states/SceneStates';

interface SceneProps { }

export const Scenes: React.FC<SceneProps> = ({ }) => {

    const scenes = useSelector<StateType, StateType["scenesReducer"]["scenes"]>((state) => state.scenesReducer.scenes);
    let state:SceneState = { name: "", url: "" };
    let [showChangeScene, setShowChangeScene] = useState(state);

        return (
            <div>
                { showChangeScene.name === "" ?
                  <div>
                    <Typography variant="h2">
                            Szenen
                    </Typography>
                    {scenes.map((element, i) => {
                        return (<SceneButtons sceneState={element} setShowChangeSceneFunction = {setShowChangeScene}/>)
                    })}
                    <AddButton type={ElementType.SCENE} parentName={"test2"} parentType={ParentType.NOPARENT}/>
                   </div>
                    : 
                    <div>
                        <ChangeScene sceneState={showChangeScene} setShowChangeSceneFunction = {setShowChangeScene}></ChangeScene>
                    </div>
                }
            </div>
        );
}
import React from 'react';
import SceneButtons from './SceneButtons';
import { ScenesState } from './states/SceneStates';

interface SceneProps { }

export class Scenes extends React.Component<SceneProps> {

    private readonly scenesInfo:ScenesState = {
        scenes: [
            { name: "Morgenprogramm", url: "https://www.poynter.org/wp-content/uploads/2019/07/shutterstock_264132746.jpg" },
            { name: "Abendprogramm", url: "https://content.thriveglobal.com/wp-content/uploads/2019/04/Sunset_in_Coquitlam.jpg" },
            { name: "Urlaub", url: "https://www.dmjmaviation.com/wp-content/uploads/2018/05/caribbean-destination.jpg" }
        ]
    };

    render() {
        return (
            <div>
                 {this.scenesInfo.scenes.map((element, i) => {
                    return (<SceneButtons sceneState={element} />)
                })}
            </div>
        )
    }
}
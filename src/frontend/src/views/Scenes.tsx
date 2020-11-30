import React from 'react';
import SceneButtons from './SceneButtons';
import { ScenesState } from './states/SceneStates';

interface SceneProps { }

export class Scenes extends React.Component<SceneProps> {

    private readonly scenesInfo:ScenesState = {
        scenes: [
            { name: "Morgenprogramm", url: "Null" },
            { name: "Abendprogramm", url: "Null" },
            { name: "Urlaub", url: "Null" }
        ]
    };

    
    render() {
        return (
            <div>
                 {this.scenesInfo.scenes.map((element, i) => {
                    return (<SceneButtons info={element} key={i}/>)
                })}
            </div>
        )
    }
}
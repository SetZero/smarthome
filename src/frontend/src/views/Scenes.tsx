import React from 'react';
import SceneButtons from './SceneButtons';

interface SceneProps { }

export class Scenes extends React.Component<SceneProps> {
    
    render() {
        return (
            <div>
                <SceneButtons />
            </div>
        )
    }
}
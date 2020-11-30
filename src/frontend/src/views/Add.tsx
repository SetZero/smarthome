import React from 'react';
import AddSelection from './AddSelection';

interface AddProps { }

export class Add extends React.Component<AddProps> {
    
    render() {
        return (
            <div>
                <AddSelection />
            </div>
        )
    }
}
import React from 'react';
import AddRoom from './AddScreen/AddRoom';
import AddScene from './AddScreen/AddScene';
import AddItem from './AddScreen/AddItem';

interface AddProps { }

export class Add extends React.Component<AddProps> {
    
    render() {
        return (
            <div>
                <AddItem />
            </div>
        )
    }
}
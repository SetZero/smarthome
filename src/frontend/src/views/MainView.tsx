import { Rooms } from './Rooms';
import { SingleRoom } from './SingleRoom';
import { Scenes } from './Scenes';
import { Add } from './Add';
import { BottomNavigation, BottomNavigationAction, Container } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import AddIcon from '@material-ui/icons/Add';
import TimelineIcon from '@material-ui/icons/Timeline';
import React from 'react';

enum CurrentView {
    Room,
    Scene,
    SingleRoom,
    Add
}

interface MainViewProps { }
interface MainViewState {
    currentView: CurrentView;
}

export class MainView extends React.Component<MainViewProps, MainViewState> {
    constructor(props: MainViewProps) {
        super(props);
        this.state = { currentView: CurrentView.Room };
    }

    private handleChange(change: React.ChangeEvent<{}>, value: CurrentView.Room) {
        this.setState({ currentView: value });
    }
    render() {
        let showComponent = null;
        switch (this.state.currentView) {
            case CurrentView.Room:
                showComponent = <Rooms />;
                break;
            case CurrentView.Scene:
                showComponent = <Scenes />;
                break;
            case CurrentView.Add:
                showComponent = <Add />;
                break;
            case CurrentView.SingleRoom:
                showComponent = <SingleRoom />;
                break;
            default:
                showComponent = <div />;
        }

        return (<div className="MainDiv">
            <Container className="flexGrow">
                {showComponent}
            </Container>
            <BottomNavigation
                onChange={(c, v) => { this.handleChange(c, v) }}
                showLabels
            >
                <BottomNavigationAction label="Räume" icon={<HomeIcon />} value={CurrentView.Room} />
                <BottomNavigationAction label="Szenen" icon={<RoomServiceIcon />} value={CurrentView.Scene} />
                <BottomNavigationAction label="Add" icon={<AddIcon />} value={CurrentView.Add} />
                <BottomNavigationAction label="Raum" icon={<AddIcon />} value={CurrentView.SingleRoom} />
                <BottomNavigationAction label="Hinzufügen" icon={<AddIcon />} value={CurrentView.Add} />
            </BottomNavigation>
        </div>)
    }
}

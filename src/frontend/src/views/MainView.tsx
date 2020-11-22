import { Rooms } from './Rooms';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import TimelineIcon from '@material-ui/icons/Timeline';
import React from 'react';

enum CurrentView {
    Room,
    Scene,
    Data
}

interface MainViewProps {}
interface MainViewState {
    currentView: CurrentView;
}

export class MainView extends React.Component<MainViewProps, MainViewState> {
    constructor(props: MainViewProps) {
        super(props);
        this.state = {currentView: CurrentView.Room};
    }

    private handleChange(change: React.ChangeEvent<{}>, value: CurrentView.Room) {
        this.setState({currentView: value});
    }
    render() {
        let showComponent = null;
        switch (this.state.currentView) {
            case CurrentView.Room:
                showComponent = <Rooms />;
                break;
            case CurrentView.Scene:
                showComponent = <div />;
                break;
            case CurrentView.Data:
                showComponent = <div />;
                break;
            default:
                showComponent = <div />;
        }

        return (<div>
            {showComponent}


            <BottomNavigation
                onChange={(c, v) => {this.handleChange(c, v)} }
                showLabels
            >
                <BottomNavigationAction label="Räume" icon={<HomeIcon />} value={CurrentView.Room} />
                <BottomNavigationAction label="Szenen" icon={<RoomServiceIcon />} value={CurrentView.Scene} />
                <BottomNavigationAction label="Daten" icon={<TimelineIcon />} value={CurrentView.Data} />
            </BottomNavigation>
        </div>)
    }
}
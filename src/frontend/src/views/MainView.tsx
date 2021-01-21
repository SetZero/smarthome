import Rooms from './Rooms';
import Settings from './Settings'
import { Scenes } from './Scenes';
import { AppBar, BottomNavigation, BottomNavigationAction, Container } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import SettingsIcon from '@material-ui/icons/Settings';
import React from 'react';

enum CurrentView {
    Room,
    Scene,
    Settings
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
                showComponent = <Rooms isNew='true'/>;
                break;
            case CurrentView.Scene:
                showComponent = <Scenes />;
                break;
            case CurrentView.Settings:
                showComponent = <Settings />
                break;
            default:
                showComponent = <div />;
        }

        return (<div>
            <Container className="flexGrow">
                {showComponent}
            </Container>
            <AppBar position="fixed" style={{top: "auto", bottom: 0}}>
                <BottomNavigation className='Stick'
                    onChange={(c, v) => { this.handleChange(c, v) }}
                    showLabels
                    value={this.state.currentView}
                >
                    <BottomNavigationAction label="Räume" icon={<HomeIcon />} value={CurrentView.Room} />
                    <BottomNavigationAction label="Szenen" icon={<RoomServiceIcon />} value={CurrentView.Scene} />
                    <BottomNavigationAction label="Einstellungen" icon={<SettingsIcon />} value={CurrentView.Settings} />
                </BottomNavigation>
            </AppBar>
        </div>)
    }
}

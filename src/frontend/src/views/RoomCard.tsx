import { Card, CardContent, Switch, Typography } from "@material-ui/core"
import React from "react"
import { RoomState } from "./states/RoomStates"

interface RoomCardProps {
    info: RoomState
}

export class RoomCard extends React.Component<RoomCardProps> {
    render() {
        return (
            <div>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.props.info.name}
                            <Switch inputProps={{ 'aria-label': 'primary checkbox' }} />
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        )
    }
}
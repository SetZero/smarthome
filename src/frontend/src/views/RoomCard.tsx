import { Card, CardContent, Switch, Typography, Grid, makeStyles } from "@material-ui/core"
import React from "react"
import { RoomState } from "../reducer/states/RoomStates"

interface RoomCardProps {
    info: RoomState
}

export class RoomCard extends React.Component<RoomCardProps> {
    render() {

        return (
            <Grid item xs={12} sm={6} md={3} lg={2}>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.props.info.name}
                            <Switch inputProps={{ 'aria-label': 'primary checkbox' }} />
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        )
    }
}
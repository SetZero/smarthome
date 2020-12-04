import { Paper, Container, Button, Switch, Grid, Typography, LinearProgress, IconButton, Slider } from "@material-ui/core"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import React from "react"
import { RoomCardSize, RoomState } from "../reducer/states/RoomStates"
import { ApiService } from "../Utils/ApiService";

interface SingleRoomProps {
}

export class SingleRoom extends React.Component<SingleRoomProps, RoomState> {
    constructor(props : any) {
        super(props);
        this.state = { name : "Wohnzimmer", icon : "Whatever", cardSize: RoomCardSize.SMALL, sensors : [{name : "Temperature", value : "23°C"}]};
    }

    render() {
        return (
            <div>
                <Container maxWidth="sm">
                    <Paper variant="outlined" elevation={3}>
                        <Grid container alignItems="center" justify="space-around" spacing={2}>
                            <Grid item sm={8} xs={10}>
                                <Typography variant="h4" component="h3">
                                    {this.state.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={2} sm={2}>
                                <Switch name="unused" inputProps={{ 'aria-label': 'secondary-checkbox' }} />
                            </Grid>
                            <Grid item xs={2} sm={2}>
                                <IconButton
                                    aria-label="more"
                                    aria-controls="long-menu"
                                    aria-haspopup="true"
                                >
                                    <MoreVertIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" justify="flex-start" item xs spacing={2}>
                            <Grid item sm={4} xs={10}>
                                <Typography variant="h5" component="h6">
                                    Temperatur
                                    </Typography>
                            </Grid>
                            <Grid item sm={6} xs={6}>
                                <LinearProgress variant="determinate" value={25} />
                            </Grid>
                            <Grid item sm={2} xs={2}>
                                <Typography>
                                    23°C
                            </Typography>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" justify="flex-start" item xs spacing={2}>
                            <Grid item sm={4} xs={10}>
                                <Typography variant="h5" component="h6">
                                    Helligkeit
                                </Typography>
                            </Grid>
                            <Grid item sm={6} xs={6}>
                                <Slider defaultValue={50} aria-labelledby="discrete-slider" step={10} marks min={0} max={100} />
                            </Grid>
                            <Grid item sm={2} xs={2}>
                                <Typography>
                                    50%
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" justify="flex-start" item xs spacing={2}>
                            <Grid item sm={8} xs={10}>
                                <Typography variant="h5" component="h6">
                                    Fernseher
                                </Typography>
                            </Grid>
                            <Grid item sm={4} xs={6}>
                                <Switch name="unused" inputProps={{ 'aria-label': 'secondary-checkbox' }} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { ApiService.ChangeSwitch(event.target.checked,"DeckenlampeSZ") }}/>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" justify="flex-start" item xs spacing={2} >
                            <Grid item sm={8} xs={10}>
                                <Typography variant="h5" component="h6">
                                    Lampe
                                </Typography>
                                
                            </Grid>
                            <Grid item sm={4} xs={6}>
                                <Switch name="unused" inputProps={{ 'aria-label': 'secondary-checkbox' }} />
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" justify="flex-start" item xs spacing={2}>
                            <Grid item sm={12}>
                                <Button>
                                    Actions
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </div>
        )
    }
}

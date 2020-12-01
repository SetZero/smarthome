import { Card, CardContent, Switch, Typography, Grid, makeStyles, Theme, createStyles, CardMedia, CardActionArea } from "@material-ui/core"
import React from "react"
import { RoomCardSize, RoomState } from "../reducer/states/RoomStates"

interface RoomCardProps {
    info: RoomState
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fullHeightCard: {
            height: "100%",
        },
        media: {
            height: 140
        }
    }));

export const RoomCard: React.FC<RoomCardProps> = ({ info }) => {
    let sizeXS: 6 | 3 | 2 | 12 | 1 | 4 | 5 | 7 | 8 | 9 | 10 | 11;
    let sizeSM: 6 | 3 | 2 | 12 | 1 | 4 | 5 | 7 | 8 | 9 | 10 | 11;
    let sizeMD: 6 | 3 | 2 | 12 | 1 | 4 | 5 | 7 | 8 | 9 | 10 | 11;
    let sizeLG: 6 | 3 | 2 | 12 | 1 | 4 | 5 | 7 | 8 | 9 | 10 | 11;
    const classes = useStyles();

    switch (info.cardSize) {
        case RoomCardSize.SMALL:
            sizeXS = 6;
            sizeSM = 6;
            sizeMD = 3;
            sizeLG = 3;
            break;
        case RoomCardSize.MEDIUM:
            sizeXS = 12;
            sizeSM = 12;
            sizeMD = 9;
            sizeLG = 6;
            break;
        case RoomCardSize.LARGE:
            sizeXS = 12;
            sizeSM = 12;
            sizeMD = 12;
            sizeLG = 6;
            break;
    }

    return (
        <Grid item xs={sizeXS} sm={sizeSM} md={sizeMD} lg={sizeLG} className={classes.fullHeightCard}>
            <Card className={classes.fullHeightCard}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image="https://content.thriveglobal.com/wp-content/uploads/2019/04/Sunset_in_Coquitlam.jpg"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {info.name}
                            <Switch inputProps={{ 'aria-label': 'primary checkbox' }} />
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

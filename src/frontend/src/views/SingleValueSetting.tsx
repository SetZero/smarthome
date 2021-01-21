import React from 'react'
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import Switch  from "@material-ui/core/Switch";

import { ItemState } from '../reducer/states/ItemState'

interface SingleValueSettingProps {
    labelName: string
    settingType: string
    min?: number
    max?: number
    currentValue : number | ItemState
    updateSettingHandle: (newValue: ItemState | number) => void
};

export default function SingleValueSetting({ labelName, settingType, currentValue, min, max, updateSettingHandle }: SingleValueSettingProps) {
    if (min === undefined) {
        min = 0;
    }

    if (max === undefined) {
        max = 100;
    }

    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography variant="h6">
                    {labelName}
                </Typography>
            </Grid>
            {settingType === "Dimmer" ?
                (() => {
                    return (
                        <Grid container item xs={6}>
                            <Grid item xs={10}>
                                <Slider defaultValue={currentValue as number}
                                    aria-labelledby="discrete-slider"
                                    min={min} max={max}
                                    onChange={(ev, val) => {
                                        updateSettingHandle(val as number);
                                    }} />
                            </Grid>
                            <Grid item xs={2}>
                                <Typography>
                                    {currentValue}
                                </Typography>
                            </Grid>
                        </Grid>
                    );
                })()
                : ""
            }
            { settingType === "Switch" ?
                (() => {
                    const asBool = currentValue as ItemState === ItemState.ON ? true : false;
                    return (
                            <Grid item xs={6}>
                                <Switch
                                    name ="unused"
                                    inputProps={{ 'aria-label': 'secondary-checkbox' }}
                                    onChange={(ev : any, state: any) => {
                                        updateSettingHandle((!asBool) ? ItemState.ON : ItemState.OFF);
                                    }}
                                    checked={asBool} />
                            </Grid>
                    )
                })()
            : ""
            }
        </Grid>
    );
}
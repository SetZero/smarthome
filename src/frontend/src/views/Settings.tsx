import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../reducer/rootReducer";
import { ItemState, DimmerDefaults, SwitchDefaults } from "../reducer/states/ItemState";
import { itemUpdateInfo } from "../reducer/actions/ItemActions";
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Autocomplete from '@material-ui/lab/Autocomplete'

export default function Settings() {
    const items = useSelector<StateType, StateType["itemsReducer"]["items"]>((state) => state?.itemsReducer?.items ?? []);
    const dispatch = useDispatch();

    const GetAllItemNames = () => {
        return items.map(e => e.name);
    };

    const HandleRangeChange = (event : any, newValue : number | number []) => {
        setItemRange(newValue as number[]);
    }

    const GetCurrentItem = (itemName : string) => {
        return items.find(e => e.name === itemName);
    }

    const GetValueRangeOfItem = (itemName : string) => {
        let currentItem = GetCurrentItem(itemName);
        let min = 0;
        let max = 0;

        if (currentItem !== undefined) {
            if (currentItem.min !== undefined && currentItem.min as number) {
                min = currentItem.min as number;
            }
            if (currentItem.max !== undefined && currentItem.max as number) {
                max = currentItem.max as number;
            }
        }

        return [min, max];
    }

    const SelectedItem = (event: any, value : any) => {
        setCurrentItem(value as string);
        const currentItemInstance = GetCurrentItem(value as string);

        if (currentItemInstance === undefined) {
            return;
        }

        if (currentItemInstance.type === "Dimmer") {
            setItemRange(GetValueRangeOfItem(value as string));
            setIgnoreRoomSwitch((currentItemInstance.ignoreRoomSwitch === undefined ? DimmerDefaults.ignoreRoomSwitch : currentItemInstance.ignoreRoomSwitch) as boolean);
            setOnAction((currentItemInstance.onState === undefined ? DimmerDefaults.onState : currentItemInstance.onState) as number);
            setOffAction((currentItemInstance.offState === undefined ? DimmerDefaults.offState : currentItemInstance.onState) as number);
        } else if (currentItemInstance.type === "Switch") {
            setIgnoreRoomSwitch((currentItemInstance.ignoreRoomSwitch === undefined ? SwitchDefaults.ignoreRoomSwitch : currentItemInstance.ignoreRoomSwitch) as boolean);
            setOnAction((currentItemInstance.onState === undefined ? SwitchDefaults.onState : currentItemInstance.onState) as ItemState);
            setOffAction((currentItemInstance.offState === undefined ? SwitchDefaults.offState : currentItemInstance.onState) as ItemState);
        }
    };

    const UpdateSelectedItemRange = (event: any) => {
        let updatedItem = GetCurrentItem(CurrentItem);

        if (updatedItem === undefined) {
            return;
        }

        updatedItem.min = itemRange[0];
        updatedItem.max = itemRange[1];
        dispatch(itemUpdateInfo(updatedItem));
    }

    const [itemRange, setItemRange] = React.useState<number[]>([0, 0]);
    const [ignoreRoomSwitch, setIgnoreRoomSwitch] = React.useState<boolean>(true);
    const [onAction, setOnAction] = React.useState<ItemState | number>(0);
    const [offAction, setOffAction] = React.useState<ItemState | number>(0);
    const [CurrentItem, setCurrentItem] = React.useState<string>("");

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h2">
                    Einstellungen
                </Typography>
            </Grid>
            <Grid item xs={12}>
            <Typography variant="h4">
                Allgemein
            </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4">
                    Geräteeinstellungen
                </Typography>
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={6}>
                <Autocomplete 
                fullWidth={true}
                defaultValue = ""
                options={GetAllItemNames()}
                renderInput={(params) =>  <TextField {...params} label="Geräte" variant="outlined" /> } 
                onChange={SelectedItem}/>
            </Grid>
            <Grid item xs={3} />
            {
                items.filter(e => e.name === CurrentItem).map(e => {
                    return (
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={3} />
                                    { e.type === "Dimmer" ?
                                    <Grid container item xs={6} spacing={2}>
                                        <Grid item xs={6} >
                                            <Typography variant="h6"> Gültigen Bereich wählen</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Slider valueLabelDisplay="auto" aria-labelledby="range-slider" value={itemRange} onChange={HandleRangeChange}/>
                                        </Grid>
                                        <Grid item xs={4} />
                                        <Grid item xs={4} onClick={UpdateSelectedItemRange}>
                                            <Button variant="contained" color="secondary"> Übernehmen </Button>
                                        </Grid>
                                        <Grid item xs={4} />
                                    </Grid>
                                        : ""
                                    }
                                <Grid item xs={3} />
                            </Grid>
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}
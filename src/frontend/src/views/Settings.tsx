import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../reducer/rootReducer";
import { ItemState, DimmerDefaults, SwitchDefaults } from "../reducer/states/ItemState";
import { itemUpdateInfo } from "../reducer/actions/ItemActions";
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Slider from '@material-ui/core/Slider'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Accordion, AccordionDetails, AccordionSummary, Box, Container } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SingleValueSetting from './SingleValueSetting'

export default function Settings() {
    const items = useSelector<StateType, StateType["itemsReducer"]["items"]>((state) => state?.itemsReducer?.items ?? []);
    const dispatch = useDispatch();

    const GetAllItemNames = () => {
        return items.map(e => e.name);
    };

    const HandleRangeChange = (event: any, newValue: number | number[]) => {
        setItemRange(newValue as number[]);
    }

    const HandleIgnoreRoomSwitch = (event : any, state : any) => {
        setIgnoreRoomSwitch(!ignoreRoomSwitch);
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

    const ReadDefaultValues = (selectedItem : string) => {
        const currentItemInstance = GetCurrentItem(selectedItem);

        if (currentItemInstance === undefined) {
            return;
        }

        if (currentItemInstance.type === "Dimmer") {
            setItemRange(GetValueRangeOfItem(selectedItem));
            setIgnoreRoomSwitch((currentItemInstance.ignoreRoomSwitch === undefined ? DimmerDefaults.ignoreRoomSwitch : currentItemInstance.ignoreRoomSwitch) as boolean);
            setOnAction((currentItemInstance.onState === undefined ? DimmerDefaults.onState : currentItemInstance.onState) as number);
            setOffAction((currentItemInstance.offState === undefined ? DimmerDefaults.offState : currentItemInstance.onState) as number);
        } else if (currentItemInstance.type === "Switch") {
            setIgnoreRoomSwitch((currentItemInstance.ignoreRoomSwitch === undefined ? SwitchDefaults.ignoreRoomSwitch : currentItemInstance.ignoreRoomSwitch) as boolean);
            setOnAction((currentItemInstance.onState === undefined ? SwitchDefaults.onState : currentItemInstance.onState) as ItemState);
            setOffAction((currentItemInstance.offState === undefined ? SwitchDefaults.offState : currentItemInstance.onState) as ItemState);
        }
    }

    const SelectedItem = (event: any, value: any) => {
        setCurrentItem(value as string);
        ReadDefaultValues(value as string);
    };

    const UpdateSelectedItem = (event: any) => {
        let updatedItem = GetCurrentItem(CurrentItem);

        if (updatedItem === undefined) {
            return;
        }

        updatedItem.min = itemRange[0];
        updatedItem.max = itemRange[1];
        updatedItem.ignoreRoomSwitch = ignoreRoomSwitch;
        updatedItem.onState =  onAction;
        updatedItem.offState =  offAction;
        dispatch(itemUpdateInfo(updatedItem));
    }

    const [itemRange, setItemRange] = React.useState<number[]>([0, 0]);
    const [ignoreRoomSwitch, setIgnoreRoomSwitch] = React.useState<boolean>(true);
    const [onAction, setOnAction] = React.useState<number | ItemState>(0);
    const [offAction, setOffAction] = React.useState<number | ItemState>(0);
    const [CurrentItem, setCurrentItem] = React.useState<string>("");

    return (
        <Box p={2}>
            <Box pb={8}>
                <Typography variant="h2">
                    Einstellungen
                </Typography>
            </Box>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Allgemein</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Keine Optionen vorhanden!
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Geräteeinstellungen</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Container>
                    <Container>
                        <Autocomplete
                            fullWidth={true}
                            defaultValue=""
                            options={GetAllItemNames()}
                            renderInput={(params) => <TextField {...params} label="Geräte" variant="outlined" />}
                            onChange={SelectedItem} />
                    </Container>
                    {
                        items.filter(e => e.name === CurrentItem).map(e => {
                            return (
                                <Box mt={6} mb={2}>
                                    <Grid container spacing={2}>
                                        {e.type === "Dimmer" ?
                                            <Grid container item xs={12} spacing={2}>
                                                <Grid item xs={6} >
                                                    <Typography variant="h6"> Gültigen Bereich wählen</Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Slider valueLabelDisplay="auto" aria-labelledby="range-slider" value={itemRange} onChange={HandleRangeChange} />
                                                </Grid>
                                            </Grid>
                                            : ""
                                        }
                                        <Grid item xs={6}>
                                            <Typography variant="h6">
                                                Raumschalter ignorieren
                                                    </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Switch
                                                name="unused"
                                                inputProps={{ 'aria-label': 'secondary-checkbox' }}
                                                onChange={HandleIgnoreRoomSwitch}
                                                checked={ignoreRoomSwitch} />
                                        </Grid>

                                        {ignoreRoomSwitch ?
                                            <Grid item xs={12}>
                                                <SingleValueSetting
                                                    labelName="Anschaltwert"
                                                    settingType={e.type}
                                                    currentValue={onAction}
                                                    updateSettingHandle={setOnAction} />
                                            </Grid>
                                            : ""
                                        }

                                        {ignoreRoomSwitch ?
                                            <Grid item xs={12}>
                                                <SingleValueSetting
                                                    labelName="Ausschaltwert"
                                                    settingType={e.type}
                                                    currentValue={offAction}
                                                    updateSettingHandle={setOffAction} />
                                            </Grid>
                                            : ""
                                        }

                                        <Grid item xs={6} onClick={(e) => { ReadDefaultValues(CurrentItem); }}>
                                            <Button variant="contained" color="secondary"> Zurücksetzen </Button>
                                        </Grid>
                                        <Grid item xs={6} onClick={UpdateSelectedItem}>
                                            <Button variant="contained" color="secondary"> Übernehmen </Button>
                                        </Grid>
                                        <Grid item xs={3} />
                                    </Grid>
                                </Box>
                            )
                        })
                    }
                    </Container>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}
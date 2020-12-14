
import { Accordion, AccordionDetails, AccordionSummary, Backdrop, Container, Typography } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';

interface LoadingErrorProps {
    error: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        backdrop: {
            zIndex: 100,
        },
    }),
);

export const LoadingError: React.FC<LoadingErrorProps> = ({ error }) => {
    const classes = useStyles();
    return (
        <Backdrop open={true} className={classes.backdrop}>
            <Container maxWidth="sm">
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>
                            <div>There was an error while contacting OpenHAB.</div>
                            <div>Is OpenHAB running?</div>
                    </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Error Message: <code> {JSON.stringify(error)} </code>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Container>
        </Backdrop>
    )
};
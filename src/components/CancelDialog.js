import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import i18next from "i18next";
import FormControl from "@material-ui/core/FormControl";
import {FormControlLabel, Radio, RadioGroup} from "@material-ui/core";

export default function CancelDialog(props) {
    const [cancelValue, setCancelValue] = React.useState("cancel_without_data");

    function handleChange(event) {
        setCancelValue(event.target.value);
    }

    // the redirection to the debriefing slides happens in Redirection which is only rendered after 0.5s AND if all videos have been uploaded
    function handleOK() {
        if (cancelValue === "cancel_without_data") {
            // Redirect to introduction page
            window.location.hash = '/';
            window.location.reload();
        } else {
            if (cancelValue === "no_cancel") {
                props.handleCancelDialog();
            }
        }
    }

    return (
        <Dialog
            open={props.cancelDialogIsOpen}
            onClose={props.handleCancelDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {i18next.t('alertAbortStudy.header')}
            </DialogTitle>
            <DialogContent>
                <DialogContentText
                    id="alert-dialog-description alert"
                    className="alert-text"
                >
                    {i18next.t('cancelDialog.question')}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="cancel" name="cancel" value={cancelValue} onChange={handleChange}>
                        <FormControlLabel value="cancel_without_data" control={<Radio />} label={i18next.t('cancelDialog.cancel_without_data')} />
                        <FormControlLabel value="no_cancel" control={<Radio />} label={i18next.t('cancelDialog.no_cancel')} />
                    </RadioGroup>
                </FormControl>
            </DialogActions>
            <DialogActions>
                <div className="center-horizontal">
                    <Button
                        onClick={handleOK}
                        className="alert-buttons">OK</Button>
                </div>
            </DialogActions>
        </Dialog>
    );
}
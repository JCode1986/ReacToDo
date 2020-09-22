import 'date-fns';
import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker
} from '@material-ui/pickers';

function UpdateDateAndTime(props) {
    const {updateDateDeadline, setUpdateDateDeadline } = props;

    const handleUpdateDateChange = (date) => {
        setUpdateDateDeadline(date._d)
    }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid container justify="center">
            <KeyboardDatePicker
                disableToolbar
                helperText={'Deadline Date'}
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                value={updateDateDeadline}
                onChange={handleUpdateDateChange}
                KeyboardButtonProps={{'aria-label': 'change date',}}
            />
            <KeyboardTimePicker
                margin="normal"
                helperText={'Deadline Time'}
                id="time-picker"
                value={updateDateDeadline}
                onChange={handleUpdateDateChange}
                KeyboardButtonProps={{'aria-label': 'change time',}}
            />
        </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default UpdateDateAndTime

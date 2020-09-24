import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker
} from '@material-ui/pickers';

export default function DateAndTime(props) {
    const {dateDeadline, setDateDeadline } = props;

    const handleDateChange = (date) => {
      setDateDeadline(date._d);
      console.log(dateDeadline, "dateDeadline for create");
    }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid container justify="center">
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Deadline Date"
                value={dateDeadline}
                onChange={handleDateChange}
                KeyboardButtonProps={{'aria-label': 'change date',}}
            />
            <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Deadline Time"
                value={dateDeadline}
                onChange={handleDateChange}
                KeyboardButtonProps={{'aria-label': 'change time',}}
            />
        </Grid>
    </MuiPickersUtilsProvider>
  );
}
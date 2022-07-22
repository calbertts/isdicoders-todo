import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

export default function EditDialog({task, openDialog, onCloseDialog, onSaveDialog}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const title = task?.title || '';
  const description = task?.description || '';
  const status = task?.status || '';

  const [taskTitle, setTaskTitle] = React.useState(title);
  const [taskDescription, setTaskDescription] = React.useState(description);
  const [taskStatus, setStatusValue] = React.useState(status);

  React.useEffect(() => {
    setTaskTitle(title);
  }, [title]);

  React.useEffect(() => {
    setTaskDescription(description);
  }, [description]);

  React.useEffect(() => {
    setStatusValue(status);
  }, [status]);

  const handleChange = (event) => {
    setStatusValue(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTaskTitle(event.target.value);
  }

  const handleDescriptionChange = (event) => {
    setTaskDescription(event.target.value);
  }

  const onSave = () => {
    const newTask = {
      id: task?.id,
      title: taskTitle,
      description: taskDescription,
      status: taskStatus
    };

    onSaveDialog(newTask);
  }

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={onCloseDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <TextField fullWidth id="outlined-basic" label="Task Title" value={taskTitle} onChange={handleTitleChange} />
        </DialogTitle>
        <DialogContent style={{minHeight: '270px', minWidth: '350px'}}>
          <Divider />
          <br />
          <TextField id="standard-basic" label="Description" multiline fullWidth rows={4} value={taskDescription} onChange={handleDescriptionChange} />
          <br />
          <br />
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={taskStatus}
              onChange={handleChange}
            >
              <MenuItem value={'PENDING'}>Pending</MenuItem>
              <MenuItem value={'IN_PROGRESS'}>In Progress</MenuItem>
              <MenuItem value={'DONE'}>Completed</MenuItem>
              <MenuItem value={'CANCELLED'}>Cancelled</MenuItem>
            </Select>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onCloseDialog}>
            Cancel
          </Button>
          <Button onClick={onSave} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

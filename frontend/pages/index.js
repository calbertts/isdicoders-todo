import * as React from 'react';
import Head from 'next/head'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import Chip from '@mui/material/Chip';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import EditDialog from './EditDialog';
import {
  getTaskList,
  createTask,
  updateTask,
  deleteTask,
} from '../lib/browser-api';

export default function Home(props) {
  const taskList = props.taskList;
  const [tasks, setTaskList] = React.useState(taskList || []);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [curTask, setTask] = React.useState(null);

  const [toastMessage, setToastMessage] = React.useState('');
  const [toastOpen, setToastOpen] = React.useState(false);

  const handleToggle = (value) => () => {
    setTask(value);
    setOpenDialog(true);
  };

  const handleClickOpen = () => {
    setTask(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleClose = (_event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setToastOpen(false);
  };

  const handleDelete = (task) => async () => {
    try {
      await deleteTask(task);

      setToastMessage('Task deleted');
      setToastOpen(true);

      setTaskList(await getTaskList());
    } catch (error) {
      setToastMessage(error.message);
      setToastOpen(true);
    }
  };

  const onSaveDialog = async (task) => {
    const toastMessage = task.id ? 'Task updated successfully' : 'Task created successfully';

    try {
      if (task.id) {
        await updateTask(task);
      } else {
        await createTask(task);
      }

      setOpenDialog(false);
      setToastOpen(true);
      setToastMessage(toastMessage);

      setTaskList(await getTaskList());
    } catch (e) {
      setToastMessage('Error: ' + e.message);
    }
  }

  return (
    <div className="container">
      <Head>
        <title>ISDI Coders - ToDo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <List
          sx={{ width: '100%', bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              ISDI Coders - ToDo
            </ListSubheader>
          }
        >
        {tasks.map(task => {
          const StatusChip = task.status === 'PENDING' ? <Chip variant="outlined" label="Pending" color="primary" icon={<PlayArrowIcon />} style={{'marginRight': '5px'}} />
            : task.status === 'IN_PROGRESS' ? <Chip label="In Progress" color="primary" icon={<RotateRightIcon />} style={{'marginRight': '5px'}} />
            : task.status === 'DONE' ? <Chip label="Done" color="success" icon={<TaskAltIcon  />} style={{'marginRight': '5px'}} />
            : task.status === 'CANCELLED' ? <Chip label="Cancelled" color="error" icon={<CancelIcon  />} style={{'marginRight': '5px'}} />
            : null;

          const backgroundColor = task.status === 'PENDING' ? '#fff' 
            : task.status === 'IN_PROGRESS' ? '#f1f9fd' 
            : task.status === 'DONE' ? '#eff7ee' 
            : task.status === 'CANCELLED' ? '#fef7f7' : '#fff';

          return (
            <div key={task.id}>
              <ListItem
                style={{ backgroundColor }}
                secondaryAction={
                  <IconButton edge="end" aria-label="edit" onClick={handleDelete(task)}>
                    <DeleteForeverIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton role={undefined} onClick={handleToggle(task)}>
                  <ListItemText primary={task.title} secondary={task.description} style={{"textDecoration": task.status === 'CANCELLED' ? "line-through" : ""}}/>
                  <ListItemIcon>
                    {StatusChip}
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </div>
          )
        })}
        </List>
        <Fab onClick={handleClickOpen} color="primary" aria-label="add" variant="extended" style={{position: 'absolute', 'bottom': '25px', 'right': '25px'}} >
          <AddIcon />
          New Task
        </Fab>
        <EditDialog openDialog={openDialog} task={curTask} onCloseDialog={handleCloseDialog} onSaveDialog={onSaveDialog} />
        <Snackbar
          open={toastOpen}
          autoHideDuration={6000}
          onClose={handleClose}
          message={toastMessage}
        />
      </main>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}


export async function getServerSideProps() {
  return {
    props: {
      taskList: await getTaskList(),
    }
  };
}


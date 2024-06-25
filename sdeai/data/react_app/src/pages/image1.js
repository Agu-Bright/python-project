import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, Typography, Button, Avatar, List, ListItem, ListItemText, ListItemAvatar, Divider, LinearProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#000',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#333',
    },
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  progress: {
    width: '100%',
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  avatarGroup: {
    display: 'flex',
  },
  avatar: {
    margin: theme.spacing(0.5),
  },
  taskTable: {
    marginTop: theme.spacing(2),
  },
  taskItem: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  recentActivity: {
    marginTop: theme.spacing(2),
  }
}));

const DashboardPage = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth="lg">
      <Typography variant="h4" className={classes.title}>
        Tasks
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper className={classes.paper}>
            <Typography variant="body1">Tasks In Progress</Typography>
            <Typography variant="h3">234</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper className={classes.paper}>
            <Typography variant="body1">New Assignment</Typography>
            <Typography variant="h3">345</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper className={classes.paper}>
            <Typography variant="body1">Project Completed</Typography>
            <Typography variant="h3">122</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper className={classes.paper}>
            <Typography variant="body1">Team Tasks</Typography>
            <Typography variant="h3">56</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Button variant="contained" className={classes.button} fullWidth>
            Create Task
          </Button>
        </Grid>
        <Grid item xs={12} md={9} className={classes.taskTable}>
          <Paper className={classes.paper}>
            <List>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Application Name 1" />
                <ListItemText primary="Application Name 2" />
                <ListItemText primary="Application Name 3" />
                <ListItemText primary="Application Name 4" />
              </ListItem>
              <Divider className={classes.divider} />
              {/* Repeat the below ListItem for each task */}
              <ListItem className={classes.taskItem} button>
                <ListItemText primary="Task Name 1" />
                <ListItemText primary="50%" />
                <ListItemText primary="04/23/2024" />
                <ListItemText primary="04/30/2024" />
                <ListItemText primary="Reporter name" />
                <ListItemText primary="owner name" />
                <ListItemText primary="..." />
              </ListItem>
              {/* Repeat ListItem ends */}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} className={classes.recentActivity}>
          <Paper className={classes.paper}>
            <Typography variant="body1">Recent Activity</Typography>
            <List>
              <ListItem>
                <ListItemText primary="9:30 am" secondary="Team Member 1 added a comment in Task Name 1" />
              </ListItem>
              <ListItem>
                <ListItemText primary="10:00 am" secondary="Owner attached the Business Doc. in Task Name 3" />
              </ListItem>
              <ListItem>
                <ListItemText primary="9:30 pm" secondary="Reporter reviewed completed in Task Name 2" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper className={classes.paper}>
            <Typography variant="body1">Team (9)</Typography>
            <div className={classes.avatarGroup}>
              {/* Repeat the below Avatar for each team member */}
              <Avatar className={classes.avatar}>N</Avatar>
              {/* Repeat Avatar ends */}
            </div>
            <div className={classes.progress}>
              <Typography variant="body2">In Progress</Typography>
              <LinearProgress variant="determinate" value={50} />
              <Typography variant="body2">Completed</Typography>
              <LinearProgress variant="determinate" value={90} />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
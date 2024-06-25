import React from 'react';
import { Container, Grid, Box, Typography, Button, TextField, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, IconButton, Badge, Divider } from '@material-ui/core';
import UploadIcon from '@material-ui/icons/CloudUpload';
import NotificationsIcon from '@material-ui/icons/Notifications';
// import SupportIcon from '@material-ui/icons/Support';
import HomeIcon from '@material-ui/icons/Home';
import InterviewIcon from '@material-ui/icons/RecordVoiceOver';
import ResumeBuilderIcon from '@material-ui/icons/InsertDriveFile';
import CoverLetterIcon from '@material-ui/icons/Description';
import PortfolioIcon from '@material-ui/icons/Work';
import JobBoardIcon from '@material-ui/icons/BusinessCenter';
import SettingsIcon from '@material-ui/icons/Settings';

const TicketSupport = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          {/* Sidebar */}
          <Box>
            <Typography variant="h6">Hevonic.Ai</Typography>
            <Divider />
            <Box mt={2}>
              <IconButton color="primary"><HomeIcon /></IconButton>
              <Typography>Home</Typography>
              <IconButton color="primary"><InterviewIcon /></IconButton>
              <Typography>Interviews</Typography>
              <IconButton color="primary"><ResumeBuilderIcon /></IconButton>
              <Typography>Resume Builder</Typography>
              <IconButton color="primary"><CoverLetterIcon /></IconButton>
              <Typography>Cover Letter</Typography>
            </Box>
            <Divider />
            <Box mt={2}>
              <IconButton color="primary"><PortfolioIcon /></IconButton>
              <Typography>Portfolio</Typography>
              <IconButton color="primary"><JobBoardIcon /></IconButton>
              <Typography>Job Board</Typography>
            </Box>
            <Divider />
            <Box mt={2}>
              <IconButton color="primary"><NotificationsIcon /></IconButton>
              <Badge badgeContent={10} color="secondary"><Typography>Notifications</Typography></Badge>
              {/* <IconButton color="primary"><SupportIcon /></IconButton> */}
              <Badge badgeContent={7} color="secondary"><Typography>Support</Typography></Badge>
              <IconButton color="primary"><SettingsIcon /></IconButton>
              <Typography>Settings</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box mb={4}>
            <Typography variant="h4" fontWeight="bold">Ticket Support</Typography>
            <Typography variant="subtitle1">Get started with your interview preparation and improve your resume.</Typography>
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box component={Paper} p={4}>
                <Typography variant="h5" fontWeight="bold">Create New Ticket</Typography>
                <Typography variant="subtitle2">Facing a problem? Raise a ticket and we will resolve your problem.</Typography>
                <TextField fullWidth label="Ticket Number" margin="normal" variant="outlined" defaultValue="996528" disabled />
                <TextField fullWidth label="Subject" margin="normal" variant="outlined" />
                <TextField fullWidth label="Describe the problem" margin="normal" variant="outlined" multiline rows={4} />
                <Box mt={2} display="flex" alignItems="center" justifyContent="space-between" border={1} borderColor="grey.400" p={2} borderRadius={4}>
                  <Box display="flex" alignItems="center">
                    <UploadIcon color="primary" />
                    <Typography variant="body2" color="textSecondary" ml={1}>Tap to Upload Resume<br/>only png format supported | 10MB max.</Typography>
                  </Box>
                  <Button variant="contained" color="primary">Upload</Button>
                </Box>
                <Box mt={2}>
                  <Button variant="contained" color="primary" fullWidth>Raise Ticket</Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box component={Paper} p={4}>
                <Typography variant="h5" fontWeight="bold">Support History</Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Ticket No.</TableCell>
                        <TableCell>Subject</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>998652</TableCell>
                        <TableCell>Interview Results</TableCell>
                        <TableCell><Button variant="contained" style={{backgroundColor: '#6cd36c'}}>New</Button></TableCell>
                        <TableCell>19 September, 2023</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>998652</TableCell>
                        <TableCell>Mock Interview</TableCell>
                        <TableCell><Button variant="contained" style={{backgroundColor: '#6b8ae7'}}>Resolved</Button></TableCell>
                        <TableCell>01 September, 2023</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>998652</TableCell>
                        <TableCell>Analysis</TableCell>
                        <TableCell><Button variant="contained" style={{backgroundColor: '#f2b95e'}}>In Progress</Button></TableCell>
                        <TableCell>23 August, 2023</TableCell>
                      </TableRow>
                      {/* Additional rows can be added here following the same format */}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TicketSupport;
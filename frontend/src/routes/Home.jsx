import * as React from 'react';
import { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import {Link} from 'react-router-dom';
import { getLeaderboard} from '../api/backend_calls';

export default function Home({ userToken }) {
    const [totalPages, setTotalPages] = useState(null)
    const [userName, setUserName] = useState(null)
    const [leaderboard, setLeaderBoard] = useState([])

  useEffect(() => {
    const fetchLeaderBoard = async () => {
      try {
        const pagesRead = await getLeaderboard();
        setLeaderBoard(pagesRead)
        console.log(pagesRead)
        // pagesRead.forEach((item) => {
        //   const { username, pages_completed} = item
        //   setTotalPages(item.pages_completed);
        //   setUserName(item.username)
        // })
        // const userNames = pagesRead.map(item => item.username);
        // const totalPageCount = pagesRead.map(item => item.pages_completed);
        
      } catch (error) {
        console.error("Leaderboard error: ", error);
      }
    };

    fetchLeaderBoard();
  }, [])

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Grid container spacing={2}>
          {/* Horizontal container on top */}
          <Grid item xs={12}>
            <Box sx={{ bgcolor: '#cfe8fc', height: '10vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              {/* Text in the top horizontal container */}
              <Typography variant="h5" align="center">
                Welcome to Chapter Chat
              </Typography>
            </Box>
          </Grid>

          {/* Left container with text */}
          <Grid item xs={6}>
            <Box sx={{ bgcolor: '#cfe8fc', height: '30vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              {/* Text in the left vertical container */}
              <Typography variant="body1" align="center">
                Features
              </Typography>
              {/* Divider under "Features" */}
              <Divider sx={{ width: '80%', mt: 1, mb: 1 }} />
            </Box>
          </Grid>

          {/* Right container */}
          <Grid item xs={6}>
            <Box sx={{ bgcolor: '#cfe8fc', height: '30vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              {/* Text in the right vertical container */}
              <Typography variant="body1" align="center">
                Start Here
              </Typography>
              {/* Divider under "Start Here" */}
              <Divider sx={{ width: '80%', mt: 1, mb: 1 }} />
              
              <ul>
                {/* <button>Search</button> */}
                {userToken? (
                <>
                  <li className="nav-item">
                    <Link to="/search">Search</Link>
                  </li>
                </>
                ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login">Search</Link>
                  </li>
                </>
                  )}
              </ul>
                  {/* <div>
                  <h3>Leaderboard</h3>
                
                  <div>
                    {/* <p>{`${userName} : ${totalPages}`}</p> */}
                    {/* {leaderboard.map((name, index) => (
                      <p key={index}>{`${name.username}: ${name.pages_completed}`}</p>))} */}
                  {/* </div> */}

                  <div>
                  <h3>Leaderboard</h3>
                  {leaderboard !== null && leaderboard.length > 0 ? (
                    <ol>
                      {leaderboard
                        .sort((a, b) => b.pages_completed - a.pages_completed)
                        .slice(0, 5) 
                        .map((user, index) => (
                          <li key={index}>{`${user.username}: ${user.pages_completed}`}</li>
                        ))}
                    </ol>
                  ) : (
                    'Log in to view Leaders'
                  )}
                </div>
              
            </Box>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}



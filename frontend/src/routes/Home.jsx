import * as React from 'react';
import { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import {Link} from 'react-router-dom';
import { getLeaderboard, getPagesCompleted} from '../api/backend_calls';
import './css/home_page.css'
import mglass from '../assets/magnifying-glass.png';
import list from '../assets/list.png';
import leaders from '../assets/leaderboard.png';
import networking from '../assets/networking.png';
import rate from '../assets/rate.png';
import tally from '../assets/tally-marks.png';


export default function Home({ userToken }) {
    const [totalPages, setTotalPages] = useState(null)
    const [userName, setUserName] = useState(null)
    const [leaderboard, setLeaderBoard] = useState([])
    

  useEffect(() => {
    const fetchLeaderBoard = async () => {
      try {
        const pagesRead = await getLeaderboard();
        const appUser = await getPagesCompleted();
        setLeaderBoard(pagesRead)
        setUserName(appUser.username)
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
console.log(userName)
  return (
    <div className="page-container">


        <div className="start-here-container">
          <div className="start-here-item">
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
          <div className="start-here-item">
            {userName ? (<div className="welcome-user">Welcome {userName}!</div>) : (
            <>
            <b>Begin your literary journey by clicking down below</b>
            <div><Link to={'/signup'}><button>Sign Up</button></Link></div>
              </>
            )}

          </div>
        </div>


        <div className="page-item">
          <h2 className="welcome">Welcome to Chapter Chat!</h2>
            <div className='feature'>
              <img src={mglass} />
                <span className="feature-text">Seamlessly search for books by title, author, or subject</span>
            </div>
            <div className='feature'>
              <img src={list} />
                <span className="feature-text">manage your reading journey by adding books to your "To Be Read" or "Completed" lists</span>
            </div>
            <div className='feature'>
              <img src={rate} />
                <span className="feature-text">Rate, recommend, and explore user ratings and suggestions for books</span>
            </div>
            <div className='feature'>
              <img src={leaders} />
                <span className="feature-text">earn a spot on the leaderboard for most pages read</span>
            </div>
            <div className='feature'>
              <img src={tally} />
                <span className="feature-text">Keep a running tally of your total pages read</span>
            </div>
            <div className='feature'>
              <img src={networking} />
                <span className="feature-text">Engage with fellow readers through the book club feature</span>
            </div>
        </div>

               
                <div> Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik"> Freepik </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>

  </div>
              

  );
}



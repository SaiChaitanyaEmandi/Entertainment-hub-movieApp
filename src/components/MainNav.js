import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import './MainNav.css'

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  useEffect(()=>{
    if (value === 0) navigate("/")
    else if (value === 1) navigate("/movies")
    else if (value === 2) navigate("/series")
    else if (value === 3) navigate("/search")
  },[value,navigate]);

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        style={{backgroundColor : "#2d313a"}}
        className='root'
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction style={{color : "white"}} label="Trending" icon={<WhatshotIcon />} />
        <BottomNavigationAction style={{color : "white"}} label="Movies" icon={<MovieIcon />} />
        <BottomNavigationAction style={{color : "white"}} label="Tv Series" icon={<TvIcon />} />
        <BottomNavigationAction style={{color : "white"}} label="Search" icon={<SearchIcon />} />
      </BottomNavigation>
    </Box>
  );
}
import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from 'axios';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary : {
      main : "#fff",
    },
  },
});


const Search = () => {

  const [ type,setType ] = useState(0);
  // eslint-disable-next-line
  const [ page,setPage ] = useState(1);
  const [ searchText, setSearchText ] = useState("");
  const [ content,setContent ] = useState();
  const [ numOfPages,setNumOfPages ] = useState();

  const fetchSearch = async () =>{
    const { data } = await axios.get(`
    https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=1fbd0b0cf26225f1821f4f12e18f0195&language=en-US&query=${searchText}&page=${page}&include_adult=false`)
  
    setContent(data.results);
    setNumOfPages(data.total_pages);
    
  }

  useEffect(()=>{
    window.scroll(0,0);
  
    fetchSearch();
    // eslint-disable-next-line
  },[type, page])

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div style={{display : 'flex' , margin : "15px 0"}}>
          <TextField  style={{flex : 1}} className="searchBox" id="filled-basic" label="Search" variant="filled" onChange={(e)=>setSearchText(e.target.value)} />
          <Button variant='contained' style={{marginLeft : 10}} onClick={ fetchSearch } > <SearchIcon/></Button>
        </div>

        <Tabs value={type} indicatorColor="primary" textColor='primary' onChange={(event,newvalue)=>{
          setType(newvalue)
          setPage(1);
        }} style={{paddingBottom : 5}} >
          <Tab style={{ width : "50%" }} label="Search Movies" />
          <Tab style={{ width : "50%" }} label="Search Tv Series" />
        </Tabs>
      </ThemeProvider>
      <div className='trending'>
          {
            content && content.map((c)=>(
              <SingleContent
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.release_date || c.first_air_date}
                media_type={type ? "tv" : "movie"}
                vote_average={c.vote_average}
              />
            ))
          }
          { searchText && !content && 
          ( type ? <h2>No Series found</h2> : <h2>No Movies found</h2> )}
        </div>
        { numOfPages>1 && (
          <CustomPagination setPage={setPage} numOfPages={numOfPages} />
        )}
      
    </div>
  )
}

export default Search
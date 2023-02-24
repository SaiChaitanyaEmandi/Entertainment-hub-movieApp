import React from 'react'
import { Pagination } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary : {
        main : "#fff",
      },
    },
  });

const CustomPagination = ({setPage, numOfPages = 10}) => {

    const handlePageChange =(page) =>{
        setPage(page);
    }

  return (
    <div
        style={{
            width : "100%",
            display : "flex",
            justifyContent : "center",
            marginTop : '13px',
        }}    
    >  
    <ThemeProvider theme={darkTheme}>
        <Pagination  count={numOfPages} onClick={(e)=> handlePageChange(e.target.textContent)} color='primary' hideNextButton hidePrevButton/>
    </ThemeProvider>
    </div>
  )
}

export default CustomPagination
import { Chip } from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'

const Genres = ({genres,setGenres,selectedGenres,setSelectedGenres,type,setPage}) => {

    const handleAdd = (genre) =>{
        setSelectedGenres([...selectedGenres,genre])
        setGenres(genres.filter((g) => g.id !== genre.id))
        setPage(1);
    }

    const handleRemove = (genre) =>{
        setSelectedGenres(selectedGenres.filter((selected)=> selected.id !== genre.id))
        setGenres([...genres,genre])
        setPage(1);
    }

    const fetchGenres = async () =>{
        const { data } = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=1fbd0b0cf26225f1821f4f12e18f0195&language=en-US`)
        setGenres(data.genres)
    }

    useEffect(()=>{
        fetchGenres()
        return ()=>{
            setGenres({})
        }//eslint-disable-next-line
    },[])

  return (
    <div style={{ padding : "6px 0"}}>
        { selectedGenres && selectedGenres.map((genre)=>(
                <Chip  label={genre.name} style={{margin : '2px'}} size='small' color='primary' key={genre.id} clickable onDelete={()=>handleRemove(genre)} />
            ))
        }
        { genres && genres.map((genre)=>(
                <Chip  label={genre.name} style={{margin : '2px' , backgroundColor : 'white'}}  size='small' key={genre.id} clickable  onClick={()=>handleAdd(genre)} />
            ))
        }
    </div>
  )
}

export default Genres
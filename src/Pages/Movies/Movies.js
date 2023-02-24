import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';
import Genres from '../../components/Genres';
import useGenres from '../../hooks/useGenre';

const Movies = () => {
  
  const [ page, setPage ] = useState(1);
  const [ content,setContent ] = useState();
  const [ numOfPages, setNumOfPages ] = useState();
  const [ genres, setGenres] = useState([]);
  const [ selectedGenres, setSelectedGenres] = useState([]);
  const genreforURL = useGenres(selectedGenres)

  const fetchMovies = async () => {
    const { data } =  await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=1fbd0b0cf26225f1821f4f12e18f0195&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)
    
    //console.log(data)
    setContent(data.results)
    setNumOfPages(data.total_pages)
  }
 
  useEffect(()=>{
    fetchMovies();
  },[page,genreforURL]);

  return (
    <div >
      <span className='pageTitle'>Movies</span>
      <Genres type='movie' genres={Array.from(genres)} setGenres={setGenres} selectedGenres={Array.from(selectedGenres)} setSelectedGenres={setSelectedGenres} setPage={setPage} />
      <div className='trending'>
          {
            content && content.map((c)=>(
              <SingleContent
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.release_date || c.first_air_date}
                media_type="movie"
                vote_average={c.vote_average}
              />
            ))
          }
        </div>
        { numOfPages>1 && (
          <CustomPagination setPage={setPage} numOfPages={numOfPages} />
        )}
    </div>
  )
}

export default Movies

// &with_watch_monetization_types=flatrate
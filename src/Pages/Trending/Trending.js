import axios from 'axios'
import React, { useState, useEffect } from 'react'
import SingleContent from '../../components/SingleContent/SingleContent';
import './Trending.css';
import CustomPagination from '../../components/Pagination/CustomPagination'

const Trending = () => {

  const [content,setContent] = useState([]);
  const [page,setPage] = useState(1);

  

  useEffect(()=>{
    const fetchTrending = async () =>{
      const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=1fbd0b0cf26225f1821f4f12e18f0195&page=${page}`);
    
      //console.log(data)
  
      setContent(data.results);
    }
    fetchTrending();
  },[page]);

  return (
    <div>
        <span className='pageTitle'>Trending</span>
        <div className='trending'>
          {
            content && content.map((c)=>(
              <SingleContent
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.release_date || c.first_air_date}
                media_type={c.media_type}
                vote_average={c.vote_average}
              />
            ))
          }
        </div>
        <CustomPagination setPage={setPage} />
    </div>
  )
}

export default Trending
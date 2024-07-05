import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {

  const {id} = useParams();

  //functionality for backArrow icon
  const navigate = useNavigate();

  const [apiData,setApiData] = useState({
    name:"",
    key:"",
    published_at:"",
    typeof:""
  });

// tmdb api to give different id's to videos
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MmMwMzNkNTkzZDcyMDk0YmI4OTk1Y2NjZGQ2Mjg2ZiIsIm5iZiI6MTcyMDEzMjA3My4zODY5OTcsInN1YiI6IjY2ODcyMDdlOWIyNjZiNTEzZDhiNjdlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qlQWXS3k7Kp_zqBRIPA3azYfMIea9hNSab8-UecVtbM'
  }
};

useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(response => response.json())
  .then(response => setApiData(response.results[0]))
  .catch(err => console.error(err));
},[])



  return (
    <div className='player'>
      <img onClick={()=>{navigate(-2)}} src={back_arrow_icon} alt="" />
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`}  title = "trailer"  frameborder="0" allowFullScreen></iframe>
      <div className="player-info">
        <p> {apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
        
      </div>
    </div>
  )
}

export default Player


// https://youtu.be/yGbGxWMv9KA?si=78N16EigonWt09OS 
{/* <iframe width="560" height="315" src="https://www.youtube.com/embed/0XETsoyx-i8?si=m_D51Jwav0fN8DAO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';




const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

//tmdb api
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MmMwMzNkNTkzZDcyMDk0YmI4OTk1Y2NjZGQ2Mjg2ZiIsIm5iZiI6MTcyMDEzMjA3My4zODY5OTcsInN1YiI6IjY2ODcyMDdlOWIyNjZiNTEzZDhiNjdlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qlQWXS3k7Kp_zqBRIPA3azYfMIea9hNSab8-UecVtbM'
  }
};





const handleWheel = (event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(response => response.json())
  .then(response => setApiData(response.results))
  .catch(err => console.error(err));



  cardsRef.current.addEventListener('wheel',handleWheel)
},[])


  return (
    <div className='title-cards'>
        <h2 >{title?title:"Popular On Netflix"}</h2>
        <div className="card-list" ref = {cardsRef}>
          {apiData.map((card, index)=>{
               return <Link to={`/player/${card.id}`} className="card" key={index}>
                <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
                <p>{card.original_title}</p>
               </Link> 
          })}
        </div>


    </div>
  )
}

export default TitleCards
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import TrendingSlider from './TrendingSlider';
import { Link, useParams } from 'react-router-dom';


const SearchElement = () => {
    //console.log(useParams())

    const {searchTerm} =useParams();
    const [data, setData] =useState([]);

    useEffect(()=>{
       const  fetchData = async() =>{

            const api = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
           
            const data = await api.json();

            setData(data.meals)

           // console.log(data);
           

        };
        fetchData();
    },[searchTerm])
  return (
   <>
   <Navbar/>
    <div style={{
      width:"90%",
      display:"grid", 
      margin:"auto",
      gridTemplateColumns:"repeat(auto-fit, minmax(15rem, 1fr))",
      gridGap:"1rem",
      marginTop:"2rem",

    }}>
     {
      data.map((cat) =>{
        return(<>
        <Link to={`/${cat.idMeal}`} className="link">
        <div style={{textAlign:"center"}}>
             <div className='img'>
              <img src={cat.strMealThumb} alt='' style={{width:"13rem"}}/>

             </div>
             <h3>{cat.strMeal}</h3>
             </div>
             </Link>
        </>)
      })
     }
     </div>
     <TrendingSlider/>
   </>
  )
}

export default SearchElement
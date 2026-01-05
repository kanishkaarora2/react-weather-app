import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import cloud_icon from "../assets/cloud.jpg";
import drizzle_icon from '../assets/drizzle.webp';
import rainy_icon from '../assets/rainy icon.png';
import sun_icon from '../assets/sun-icon.png';
import humidity from '../assets/humidity.png';
import wind from '../assets/wind.png';

const Weather =  () =>  {
    const [input, setInput] = useState("London");
    const[weather,setWeather] = useState(false);

    const search = async(city)=>{
        if (city=="") {
            alert("Enter city name");
            return;
        }
        const respond = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`);
        const data =  await respond.json();
        console.log(data); 
        setWeather({
            humidity : data.main.humidity,
            windSpeed: data.wind.speed,
            temperature:Math.floor(data.main.temp),
            location:data.name,
            iconCode:data.weather[0].icon
            
        });
    }
    useEffect(()=>{search(input)},[]);

  return (
    <div className='w-65 h-80
    absolute top-1/2 left-1/2
     -translate-y-1/2 -translate-x-1/2
     bg-linear-to-bl from-violet-500 to-fuchsia-500 
     rounded-3xl 
     flex flex-col 
     items-center pt-4 pl-2'>

        <div className='flex 
        items-center 
        gap-1  '>
            <input type='text'
             placeholder='search location' 
             className='rounded-xl bg-amber-50
              outline-none h-7
              border-none
             text-black py-3 pl-3 ' value={input} onChange={(e)=>setInput(e.target.value)}/>

            <button
             className=" 
            rounded-full w-7 h-7
            cursor-pointer flex items-center justify-center bg-amber-50" onClick={()=>search(input)}>
                <FaSearch />
                </button> 
        </div>
        <img src={`https://openweathermap.org/img/wn/${weather.iconCode}@2x.png`} className='object-fit w-20 h-25 pt-6 '/>
        <p className='pt-4 font-bold text-3xl'>{weather.temperature} C</p>
        <p className='pt-2  text-xl'>{weather.location}</p>
        <div className='flex justify-between gap-3 pt-2'>
            <div className='flex flex-col items-center'>
            <img src={humidity} className='w-7 h-6 object-contain'/>
            <p>{weather.humidity}%</p>
            <span>Humidity</span>
        </div>
         <div className='flex flex-col items-center'>
            <img src={wind} className='w-7 h-6 object-cover'/>
            <p>{weather.windSpeed}km/h</p>
            <p>Wind Speed</p>
        </div>
        </div>
    </div>
  )
}

export default Weather;

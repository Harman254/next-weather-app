'use client'

import React, {useState} from 'react'

import Input from "./components/Input"
import Weekforecast from './components/Weekforecast';
import Current from './components/Current';
import Details from './components/Details';

interface WeatherData {
  
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  forecast: {
    forecastday: {
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
          text: string;
          icon: string;
        };
      };
    }[];
  };
  
}


export default function Home() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("")
  const [error, setError] = useState("");

  const url = `http://api.weatherapi.com/v1/forecast.json?key=ecbdaff67e7a4b23a6f82249230208&q=${location}&days=7&aqi=yes&alerts=yes` 

const handleSearch = async(e: React.KeyboardEvent<HTMLInputElement>) => {
  if(e.key === 'Enter'){
    e.preventDefault();
    try {
      const res = await fetch(url)
      if(!res.ok){
        throw new Error()
      }
      const data = await res.json()
      setData(data)
      setLocation("")
      setError("")
    } catch (error) {
      setError('City not found')
      setData({})

    }
  }

}
    let content;
    if (Object.keys(data).length === 0 && error === "") {
      content = (
        <div className='text-white text-center h-screen mt-[5rem]'>
          <h2 className='text-3xl font-bold mb-4'>Welcome to Weather app</h2>
          <p className='text-3xl'>Enter a City name to get the Weather Forecast</p>
        </div>
      );
    } else if (error !== "") {
      content = (
        <div className='text-white text-center h-screen mt-[5rem]' >
          <p className='text-3xl font-bold mb-4'>City not found</p>
          <p className='text-xl'>Enter a valid city</p>
        </div>
      )
    } else {
      content= (
        <>
        <div className='flex md:flex-row flex-col p-12 items-center justify-between '>
          
          <Current data={data} />
          <Weekforecast data={data}/>
          

        </div>
        <div>
          <Details data={data}/>

        </div>
        </>
      )
    }

  return (
    <div className="bg-cover bg-gradient-to-r from-blue-500 to-blue-300 h-fit">
      <div className="bg-white/25 w-full flex flex-col h-fit">
        {/*input and logo*/}
        <div className="flex flex-col justify-between items-center p-12 md:flex-row">
          <Input handleSearch={handleSearch} setLocation={setLocation} />
          <h1 className="mb-8 md:mb-0 order-1 text-white py-2 px-4 rounded-xl italic font-bold ">Weather App</h1>
          
        </div>
        {content}

            

      </div>
     
    </div>
  )
}

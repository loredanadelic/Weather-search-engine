import React, { FunctionComponent, useEffect, useState } from 'react';
import './App.css';
import { useQueryApi } from './services/api';
import {  Weather } from './types/types';
import { BrowserRouter } from 'react-router-dom';
import styled, { keyframes, ThemeProvider } from 'styled-components';
import { defaultTheme } from './theme/theme';
const Form=styled.form`
display:grid;
grid-template-column:1fr;
${({theme})=>`
row-gap: ${theme.spacing.large};`}

`
const Input=styled.input`
background-color:#282c34;
height:1.75rem;
width:30%;
display: block;
 margin : 0 auto;
 text-align:center;
 ${({theme})=>`
font-size: ${theme.fontSize.medium}; 
color:${theme.color.secondary.dimGrey}
`
}`
const InfiniteLoop = keyframes`
	0% { transform: rotate(360deg); }
	100% { transform: rotate(0deg); } 
`;

const ImageLoader=styled.img`
padding-top:20px;
animation: ${InfiniteLoop} 3s linear infinite;
width: 70px;
  height: 70px;
`
const MainContainer=styled.div`
width:100%;
height:100%;
text-align:center;
${({theme})=>`
background-color: ${theme.color.secondary.dimGrey}`}
`
export const App:FunctionComponent=()=> {
  const [inputValue, setInputValue]=useState('Split')
  const [{weather, city, temp, error, icon}, setWeather] = useState({weather:'',city:'', temp:0, error:'', icon:''});
  const [showLoading, setShowLoading] = useState(false);
   const {
      data: weatherData,
      refetch: refetchWeatherData,
      isFetching: isFetchingWeather,
      isError: isErrorGetWeather,
    } = useQueryApi<Weather>(`/data/2.5/weather?q=${inputValue}&APPID=${process.env.REACT_APP_API_KEY}`, `weather`);
     
    
  const handleChange=(e:any)=>{
    setInputValue(e.target.value)
  }
  useEffect(()=>{
    if(!isFetchingWeather){
      const timeout=setTimeout(()=>{
      setShowLoading(false)
      }, 500)
      return()=>clearTimeout(timeout)

    }
    else{
      setShowLoading(true)
    }
  }, [isFetchingWeather])
  useEffect(()=>{
    if(weatherData){
     
      setWeather({weather:weatherData.weather[0].main, city:weatherData.name, temp: Math.round(weatherData.main.temp-273.15), error:'', icon: weatherData.weather[0].icon})
  }
  }, [weatherData])
 useEffect(()=>{

  isErrorGetWeather&& setWeather({weather:'', city:'', temp:0, error:'City not found', icon:''})
  if(weatherData){
  !isErrorGetWeather && setWeather({weather:weatherData.weather[0].main, city:weatherData.name, temp: Math.round(weatherData.main.temp-273.15), error:'', icon: weatherData.weather[0].icon})
 }}, [isErrorGetWeather])

  const handleSubmit=(e:any)=>{
    e.preventDefault()
    if(!inputValue){
      setWeather({weather:'', city:'', temp:0, error:'', icon:''})
    
      return
    }
    refetchWeatherData()
  }
  console.log(isErrorGetWeather)

  return (
    <div>
      <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
      <header className="App-header">
        <MainContainer>
        <h1>Discover current weather</h1>
        <Form data-testid="city-form" onSubmit={handleSubmit}>
          <label>Enter city name</label>
          <Input
          value={inputValue} onChange={handleChange} name='city'
          />
        </Form>
        {error==='' ? (showLoading? <ImageLoader src={'/images/loading.png'}/>: (weather?<div>
        <p>
          {city}
        </p>
        <p>
          Clouds: {weather}
        </p>
        <p>{weatherData?.weather[0].description}</p>
        <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
        <p>Temperature: {temp}°C</p>
        </div>: <p></p>)): <p>{error}</p>}
        </MainContainer>
      </header>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

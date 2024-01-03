import React, { useEffect, useState } from 'react';
import './Adhan.css'
import axios from 'axios';


function Adhan() {

  const [date,setDate] = useState("")
  const [city,setCity] = useState("Mecca")
  const [PrayersTimes,setPrayersTimes] = useState({
    Fajr: "",
    Sunrise:"",
    Duhr:"",
    Asr:"",
    Maghrib:"",
    Isha:""
  })

  const getDate = () =>{
    axios
      .get(
        "http://api.aladhan.com/v1/timingsByCity?city=Ouezzane&country=Morocco&method=3"
      )
      .then(function (response) {
        let currentDate = response.data.data.date.readable;
        console.log(response)
        setDate(currentDate)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const getPrayersTimes = (cityName) => {
    axios
      .get(
        "http://api.aladhan.com/v1/timingsByCity?&country=&method=3&city=" +
          cityName
      )
      .then(function (response) {
        let fajr = response.data.data.timings.Fajr;
        let Sunrise = response.data.data.timings.Sunrise;
        let duhr = response.data.data.timings.Dhuhr;
        let asr = response.data.data.timings.Asr;
        let maghrib = response.data.data.timings.Maghrib;
        let isha = response.data.data.timings.Isha;
        console.log(response)
        setPrayersTimes({
          Fajr:`${fajr} PM`,
          Sunrise:`${Sunrise} PM`,
          Duhr:`${duhr} PM`,
          Asr:`${asr} AM`,
          Maghrib:`${maghrib} AM`,
          Isha:`${isha} AM`
        }) 
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(()=>{
    getDate()
    getPrayersTimes()
  },[])
  return (
    <>  
    <div className="container">
        <div className="navbar">
            <div className="form">
                <i className="fa-solid fa-location-crosshairs gps"></i>
                <input type="text" placeholder="Enter a city name" className="input" value={city} onChange={(e)=>setCity(e.target.value)}/>
                <button className="btn"><i className="fa-solid fa-magnifying-glass search" onClick={(e)=>getPrayersTimes(city)}></i></button>
            </div>
            <i className="fa-solid fa-mosque mosque"></i>
        </div>

        <div className="main">
            <div className="picture">

                <div className="day">
                    <h3 style={{"display":"inline"}}>The Day </h3>
                    <i className="fa-regular fa-calendar-days"></i>
                    <p className="date">{date}</p>
                    <p className="city-name"></p>
                </div>
            </div>

            <div className="data">
                <div className="prayers">
                    <div className="pray">
                        <img src="../assets/images/sunrise.png" alt=""/>
                        <div className="info">
                            <h3>Al-Fajr</h3>
                            <p className="Fajr">{PrayersTimes.Fajr}</p>
                        </div>
                    </div>
                    <div className="pray">
                        <img src="../assets/images/sunrisefdf.png" alt="" />
                        <div className="info">
                            <h3>Sunrise</h3>
                            <p className="Sunrise">{PrayersTimes.Sunrise}</p>
                        </div>

                    </div>
                    <div className="pray">
                        <img src="../assets/images/sunny-day.png" alt="" />
                        <div className="info">
                            <h3>Al-Duhr</h3>
                            <p className="Duhr">{PrayersTimes.Duhr}</p>
                        </div>

                    </div>
                    <div className="pray">
                        <img src="../assets/images/cloudy.png" alt=""/>
                        <div className="info">
                            <h3>AL-Asr</h3>
                            <p className="Asr">{PrayersTimes.Asr}</p>
                        </div>

                    </div>
                    <div className="pray">
                        <img src="../assets/images/sunset.png" alt="" />
                        <div className="info">
                            <h3>Al-Maghrib</h3>
                            <p className="Maghrib">{PrayersTimes.Maghrib}</p>
                        </div>
                    </div>
                    <div className="pray">
                        <img src="../assets/images/cloudy-night.png" alt="" />
                        <div className="info">
                            <h3>Al-Ishaa</h3>
                            <p className="Isha">{PrayersTimes.Isha}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
}

export default Adhan;

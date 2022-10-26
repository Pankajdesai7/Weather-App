import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { FaSortDown } from 'react-icons/fa'
import AddNewCity from './components/AddNewCity/AddNewCity';
import ListItem from './components/ListItem/ListItem';
import './App.scss';
import WeatherDetails from './components/WeatherDetails/WeatherDetails';

function App() {

  const [searchText,setSearchText] =useState("")
  const [cityList, setCityList] = useState([])
  const [openAddCityModal,setOpenAddCityModal] = useState(false)
  const [openWeatherDetailsModal,setOpenWeatherDetailsModal] = useState(false)
  const [ weatherOfCity , setWeatherOfCity] =useState("");

  const addCity = ( city ) => {

    for(let i=0;i<cityList?.length;i++)
    {
       if(cityList[i]?.name===city)
       {
          return 
       }
    }
    let temp = {
      name:city,
      id:uuidv4()
    }

    setCityList([...cityList,temp])
  }

  const handleAddCityClick = () => {
   setOpenAddCityModal(!openAddCityModal)
  }

  const handleClickOnCity = ( city ) => {

    setWeatherOfCity(city)
    setOpenWeatherDetailsModal(true);
  }

  const deleteCity = (id) => {
    setCityList(cityList.filter( city => city.id!==id));
  }

  const handleChange = (e) => {
    setSearchText(e.target.value)
  }

  return (
    <div className="App">
      <div className="weather-container">
        <div className='header-component'>
          <h3>List Of Cities</h3>
          <div className="search-component">
          <form>
            <input 
             className='search-field' 
             placeholder='Search City'
             type="text" 
             onChange={(e) => handleChange(e)} 
             value={searchText}></input>
          </form>
          <button className="add-city-btn" onClick={handleAddCityClick}>+ Add City</button>
          </div>
        </div>
        <div className='list-header'>
           <div className='seqNumber'>No</div>
           <div className='name'>Name <FaSortDown/></div>
        </div>
        <div className='list-container'>
          <div className="city-list">
            { cityList?.length != 0 ? (
              <>
               {
                  cityList.filter( city => {
                    if(searchText === "")
                    {
                      return city;
                    }
                    else if(city?.name?.toLowerCase().includes(searchText.toLowerCase())){
                      return city;
                    }
                  }).map( ( city ,index ) => 
                  <ListItem 
                  city={city} 
                  sequenceNumber={index}
                  deleteCity={deleteCity}
                  setOpenWeatherModal={handleClickOnCity}
                />)
               }
              </>
            ) : <div className='city-list-empty'> Add Cities </div>}
          </div>
        </div>
      </div>
      { openAddCityModal && 
      <AddNewCity 
       setOpenModal={setOpenAddCityModal}
       addCity={addCity}
      
      />}
      {
        openWeatherDetailsModal && 
        <WeatherDetails
          city={weatherOfCity}
          closeModal={setOpenWeatherDetailsModal}
         />
      }
    </div>
  );
}

export default App;

import React, { useState } from "react"
import "./AddNewCity.scss"
import { FaTimesCircle } from 'react-icons/fa'
import axios from "axios";

function AddNewCity({ setOpenModal ,addCity }) {

  const [ city , setCity ] = useState("")
  const [invalidCity , setInvalidCity] = useState(false);

  const handleChange = (event) => {
    setCity(event.target.value)
    console.log(city)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if( city.length === 0)
    {
        setInvalidCity(true);
    }
    else{
        const url=`http://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=1&appid=01e040aa6a086402fc71b6d7f5983cdb`
        axios.get(url).then( res => {
            if( res.data.city.name.toLowerCase() === city.toLowerCase())
            {
                setInvalidCity(false)
                setOpenModal(false)
                addCity(res.data.city.name)
            }
            else setInvalidCity(true)
            setCity("");
        }).catch( () => {
            setInvalidCity(true)
            setCity("")
        })
    } 
  }
  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="title-container">
            <div className="title">
                <h2> Add new city</h2>
            </div>
            <div className="title-closeBtn">
              <button 
                className="closeBtn"
                onClick={ () => setOpenModal(false)}
              >
                <FaTimesCircle size={28}/>
              </button>
            </div>
        </div>
        <div className="body">
            <form onSubmit={handleSubmit}>
                <div>
                  <input
                   className="input-city-field"
                   type="text" 
                   placeholder="Add City" 
                   value={city} 
                   onChange={handleChange}
                  />
                  { invalidCity && <p className="error-msg"> Please enter valid city name</p>}
                </div>
                <div>
                  <button
                  onClick={()=>setOpenModal(false)}
                  type="button"
                  className="bottom-close-btn"
                  >Close
                  </button>
                  <button 
                   type="submit"
                   className="save-btn"
                  >Save</button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
}

export default AddNewCity;
import React, { useState } from "react"
import "./AddNewCity.scss"
import { FaTimesCircle } from 'react-icons/fa'
import axios from "axios";
import { checkCityValidUrl } from "../../requests/request";

function AddNewCity({ setOpenModal ,addCity }) {

  const [ city , setCity ] = useState("")
  const [invalidCity , setInvalidCity] = useState(false);

  const handleChange = (event) => {
    setCity(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if( city.length === 0)
    {
        setInvalidCity(true);
    }
    else{
        axios.get(checkCityValidUrl(city)).then( res => {
            if( res.data.city.name.toLowerCase() === city.toLowerCase())
            {
                setInvalidCity(false)
                setOpenModal(false)
                addCity(res.data.city.name)
            }
            else setInvalidCity(true)
            setCity("");
        }).catch( ( error ) => {
            if(error.response.status === 404)
            {
              setInvalidCity(true)
              setCity("")
            } 
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
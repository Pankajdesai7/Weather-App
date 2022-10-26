import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import './ListItem.scss'


const ListItem = ({ city, sequenceNumber, deleteCity ,setOpenWeatherModal}) => {
    const { name, id } = city
    return (
        <div key={id} className='item-container'>
            <div className='item-content'>
                <div className='sequence-number'  onClick={()=> setOpenWeatherModal(name)}>
                    {sequenceNumber + 1}
                </div>
                <div className='city-name'  onClick={()=> setOpenWeatherModal(name)}>
                    {name}
                </div>
                <div className='delete-item'>
                    <button
                     className='delete-city-button'
                     onClick={() => deleteCity(id)}
                    >
                      <FaTrashAlt />
                    </button>
                </div>
            </div>
        </div>
    )
}


export default ListItem
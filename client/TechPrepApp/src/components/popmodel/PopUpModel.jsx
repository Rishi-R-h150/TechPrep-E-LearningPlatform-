import React from 'react'
import './PopUpModel.css'
const PopUpModel = ({message, onClose}) => {
  return (
    <div className='modal-overlay'>
        <div className='modal-content'>
            <p className='innertext'>{message}</p>
            <button onClick={onClose}>Close</button>
        </div>
      
    </div>
  )
}

export default PopUpModel

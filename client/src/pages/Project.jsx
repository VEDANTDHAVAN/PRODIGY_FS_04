/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useLocation } from 'react-router-dom'

const Project = () => {
    const location = useLocation();
    console.log(location.state)
    return (
    <main>
        
    </main>
  )
}

export default Project
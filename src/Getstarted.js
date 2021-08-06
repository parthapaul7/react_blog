import React from 'react'
import { Link } from 'react-router-dom'
import './App.css'

export default function Getstarted() {
    return (
        <>
        <div className="backImage"> <h1>Chhaliyeeeee suru karte hai</h1></div>
        <div className="start">
            <Link to="/home"> <button className="btn btn-primary align-middle" id="startBtn">Get started</button></Link>
            
        
        </div>
        </>
    )
}

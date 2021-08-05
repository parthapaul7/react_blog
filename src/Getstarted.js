import React from 'react'
import { Link } from 'react-router-dom'

export default function Getstarted() {
    return (
        
            <div className="container my-10">
            <Link to="/home"> <button className="btn btn-primary align-middle">Get started</button></Link>
        </div>
    )
}

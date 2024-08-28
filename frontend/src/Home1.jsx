import Navbar from './Navbar'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function Home1() {
    const navigate = useNavigate()
    return (
    <>
    <button type="button" class="btn btn-primary" onClick={() => navigate('/login')}>Login</button>
    <button type="button" class="btn btn-primary" onClick={() => navigate('/register')}>Register</button>
    </>
    )
}

export default Home1;
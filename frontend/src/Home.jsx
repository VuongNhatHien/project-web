import Navbar from './Navbar'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Home1 from './Home1'
import Home2 from './Home2'

function Home() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  if (user) {
    return (
    <>
     <Home2 />
    </>
    )
  }
  return (
    <>
      <Home1 />
    </>
  )

}

export default Home;
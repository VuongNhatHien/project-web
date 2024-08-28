
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function Login() {
  const navigate = useNavigate()
  const [name, setName] = useState(null)
  const [pass, setPass] = useState(null)
  const handleOnSubmit = () => {
      axios.post('http://localhost:5000/login', {
        name: name,
        pass: pass,
      })
      .then(result => {
        console.log(result)
        if (result.data === "Invalid password") {
          alert("Wrong password")
        }
        else if (result.data === "Invalid username") {
          alert("Invalid username")
        }
        else {
          localStorage.setItem("user", JSON.stringify({name: name}))
          navigate('/')
        }
      })
      .catch(err => console.log(err))
  }
  return (
  <>
    <div class="mb-3 row">
        <label for="username" class="col-sm-2 col-form-label">User Name</label>
        <div class="col-sm-10">
        <input type="text" class="form-control" id="username" onChange={e => setName(e.target.value)}/>
        </div>
    </div>

    <div class="mb-3 row">
        <label for="pass" class="col-sm-2 col-form-label" >Password</label>
        <div class="col-sm-10">
        <input type="password" class="form-control" id="pass" onChange={e => setPass(e.target.value)}/>
        </div>
    </div>
    <button type="button" class="btn btn-primary" onClick={handleOnSubmit}>Sign up</button>

    <p>Not a member?</p>
    <button type="button" class="btn btn-primary" onClick={() => navigate('/register')}>Register</button>
  </>
  );
}

export default Login;
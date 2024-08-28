
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function Register() {
    const navigate = useNavigate()
    const [name, setName] = useState(null)
    const [display, setDisplay] = useState(null)
    const [pass, setPass] = useState(null)
    const [age, setAge] = useState(null)
    const [gender, setGender] = useState('male')
    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [activity, setActivity] = useState(null)
    const [protein, setProtein] = useState(25)
    const [carbs, setCarbs] = useState(45)
    const [fat, setFat] = useState(30)

    const handleOnSubmit = () => {
        const user = {
            name: name,
            display: display,
            pass: pass,
            age: age,
            gender: gender,
            height: height,
            weight: weight,
            activity: activity,
            protein: protein,
            carbs: carbs,
            fat: fat,
        }
        if (Number(protein) + Number(carbs) + Number(fat) !== 100) {
            console.log(Number(protein) + Number(carbs) + Number(fat))
            alert("Your ratios must equal 100%")
            return
        }
        axios.post('http://localhost:5000/register', user)
        .then(result => {
            if (result.data === "username existed") {
                alert("Username existed")
                return
            }
            else {
                navigate('/login')
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
        <label for="display" class="col-sm-2 col-form-label">Display Name</label>
        <div class="col-sm-10">
        <input type="text" class="form-control" id="display" onChange={e => setDisplay(e.target.value)}/>
        </div>
    </div>

    <div class="mb-3 row">
        <label for="pass" class="col-sm-2 col-form-label" >Password</label>
        <div class="col-sm-10">
        <input type="password" class="form-control" id="pass" onChange={e => setPass(e.target.value)}/>
        </div>
    </div>

    <div class="mb-3 row">
        <label for="age" class="col-sm-2 col-form-label">Age</label>
        <div class="col-sm-10">
        <input type="text" class="form-control" id="age" onChange={e => setAge(e.target.value)}/>
        </div>
    </div>

    <div class="form-check">
    
    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked
        onClick={ () => setGender('male') } 
    />
    <label class="form-check-label" for="flexRadioDefault1">
        Male
    </label>
    </div>
    <div class="form-check">
    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
        onClick={ () => setGender('female') } 
    />
    <label class="form-check-label" for="flexRadioDefault2">
        Female
    </label>
    </div>

    <div class="mb-3 row">
        <label for="height" class="col-sm-2 col-form-label">Height</label>
        <div class="col-sm-10">
        <input type="text" class="form-control" id="height" onChange={e => setHeight(e.target.value)}/>
        </div>
    </div>

    <div class="mb-3 row">
        <label for="weight" class="col-sm-2 col-form-label">Weight</label>
        <div class="col-sm-10">
        <input type="text" class="form-control" id="weight" onChange={e => setWeight(e.target.value)}/>
        </div>
    </div>

    <div class="mb-3 row">
        <label for="weight" class="col-sm-2 col-form-label">Active</label>
        <div class="col-sm-10">
            <select class="form-select" aria-label="Default select example" id="option" onChange={(e) => {setActivity(e.target.value)}}>
                <option value = {0}selected>None</option>
                <option value = {0.2}>Sedentary</option>
                <option value = {0.375}>Lightly Active</option>
                <option value = {0.5}>Moderately Active</option>
                <option value = {0.9}>Very Active</option>
            </select>
        </div>
    </div>

    <div class="mb-3 row">
        <label for="protein" class="col-sm-2 col-form-label">Protein</label>
        <div class="col-sm-10">
        <input type="text" class="form-control" id="protein" value={protein} onChange={e => setProtein(e.target.value)}/>
        </div>
    </div>

    <div class="mb-3 row">
        <label for="carbs" class="col-sm-2 col-form-label">Carbs</label>
        <div class="col-sm-10">
        <input type="text" class="form-control" id="carbs" value={carbs} onChange={e => setCarbs(e.target.value)}/>
        </div>
    </div>

    <div class="mb-3 row">
        <label for="fat" class="col-sm-2 col-form-label">Fat</label>
        <div class="col-sm-10">
        <input type="text" class="form-control" id="fat" value={fat} onChange={e => setFat(e.target.value)}/>
        </div>
    </div>

    <button type="button" class="btn btn-primary" onClick={handleOnSubmit}>Sign up</button>

    <p>Already have an account?</p>
    <button type="button" class="btn btn-primary" onClick={() => navigate('/login')}>Login</button>
  </>
  );
}

export default Register;
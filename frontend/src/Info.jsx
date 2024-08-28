import { useState, useEffect } from 'react'
import axios from 'axios'

function Info() {

  const [name, setName] = useState(null)
  const [age, setAge] = useState(null)
  const [gender, setGender] = useState(null)
  const [height, setHeight] = useState(null)
  const [weight, setWeight] = useState(null)
  const [activity, setActivity] = useState(null)

  const [disable, setDisable] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:5000/get')
    .then(users => {
      const storageUser = JSON.parse(localStorage.getItem("user")).name
      const user = users.data.filter((user) => 
        user.name === storageUser
      )[0]
      setName(user?.name)
      setAge(user?.age)
      setGender(user?.gender)
      setHeight(user?.height)
      setWeight(user?.weight)
      setActivity(user?.activity)
    })
    
  }, [])

  const handleOnSubmit = () => {
    setDisable(true)
    const user = {
      name: name,
      age: age,
      gender: gender,
      height: height,
      weight: weight,
      activity: activity,
  }
  axios.post('http://localhost:5000/update/profile/info', user)
  .then(result => console.log(result))
  .catch(err => console.log(err))
  }

  return (
  <>
    <h2>Info</h2>
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-primary" onClick={ () => setDisable(false) }>Edit</button>
      <button type="submit" class="btn btn-primary" onClick={ handleOnSubmit }>Save</button>
    </div>

    <fieldset disabled={disable}>

      <div class="form-check">
      

        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={gender === 'male' ? true : null}
            onClick={ () => setGender('male') } 
        /> 
      <label class="form-check-label" for="flexRadioDefault1">
          Male
      </label>
      </div>
      <div class="form-check">
      <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked={gender === 'female' ? true : null}
          onClick={ () => setGender('female') } 
      />
      <label class="form-check-label" for="flexRadioDefault2">
          Female
      </label>
      </div>

      <div class="mb-3 row">
          <label for="age" class="col-sm-2 col-form-label">Age</label>
          <div class="col-sm-10">
          <input type="text" class="form-control" id="age" value={age} onChange={e => setAge(e.target.value)}/>
          </div>
      </div>

      <div class="mb-3 row">
          <label for="height" class="col-sm-2 col-form-label">Height</label>
          <div class="col-sm-10">
          <input type="text" class="form-control" id="height" value={height} onChange={e => setHeight(e.target.value)}/>
          </div>
      </div>

      <div class="mb-3 row">
          <label for="weight" class="col-sm-2 col-form-label">Weight</label>
          <div class="col-sm-10">
          <input type="text" class="form-control" id="weight" value={weight} onChange={e => setWeight(e.target.value)}/>
          </div>
      </div>

      <div class="mb-3 row">
        <label for="weight" class="col-sm-2 col-form-label">Active</label>
        <div class="col-sm-10">
            <select class="form-select" aria-label="Default select example" id="option" value={activity} onChange={(e) => {setActivity(e.target.value)}}>
                <option value = {0}>None</option>
                <option value = {0.2}>Sedentary</option>
                <option value = {0.375}>Lightly Active</option>
                <option value = {0.5}>Moderately Active</option>
                <option value = {0.9}>Very Active</option>
            </select>
        </div>
      </div>
    </fieldset>
  </>
  );
}

export default Info;
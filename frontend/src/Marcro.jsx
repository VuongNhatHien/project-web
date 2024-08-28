import { useState, useEffect } from 'react'
import axios from 'axios'

function Macro() {

  const [name, setName] = useState(null)

  const [protein, setProtein] = useState(null)
  const [carbs, setCarbs] = useState(null)
  const [fat, setFat] = useState(null)

  const [disable, setDisable] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:5000/get')
    .then(users => {
      const storageUser = JSON.parse(localStorage.getItem("user")).name
      const user = users.data.filter((user) => 
        user.name === storageUser
      )[0]
      setName(user?.name)
      setProtein(user?.protein)
      setCarbs(user?.carbs)
      setFat(user?.fat)
    })
    
  }, [])

  const handleOnSubmit = () => {
    setDisable(true)
    const user = {
      name: name,
      protein: protein,
      carbs: carbs,
      fat: fat,
  }
  axios.post('http://localhost:5000/update/profile/macro', user)
  .then(result => console.log(result))
  .catch(err => console.log(err))
  }

  return (
  <>
      <h2>Macro</h2>

      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-primary" onClick={ () => setDisable(false) }>Edit</button>
        <button type="submit" class="btn btn-primary" onClick={ handleOnSubmit }>Save</button>
      </div>
    <fieldset disabled={disable}>
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
    </fieldset>
  </>
  );
}

export default Macro;
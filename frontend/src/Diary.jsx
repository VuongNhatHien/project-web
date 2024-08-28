import Navbar from './Navbar'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Diary() {

  const [age, setAge] = useState(null)
  const [gender, setGender] = useState(null)
  const [height, setHeight] = useState(null)
  const [weight, setWeight] = useState(null)
  const [activity, setActivity] = useState(null)

  const [protein, setProtein] = useState(null)
  const [carbs, setCarbs] = useState(null)
  const [fat, setFat] = useState(null)

  const curEnergy = 2100
  const curProtein = 50
  const curCarbs = 50
  const curFat = 50

  useEffect(() => {
    axios.get('http://localhost:5000/get')
    .then(users => {
      const storageUser = JSON.parse(localStorage.getItem("user")).name
      const user = users.data.filter((user) => 
        user.name === storageUser
      )[0]

      setAge(user?.age)
      setGender(user?.gender)
      setHeight(user?.height)
      setWeight(user?.weight)
      setActivity(user?.activity)
      setProtein(user?.protein)
      setCarbs(user?.carbs)
      setFat(user?.fat)
    })
  }, [])

  var energy = 0
  if (gender === 'male') {
    energy = 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) + 5
  }
  else {
    energy = 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) - 161
  }
  energy += energy * activity
  energy = Math.round(energy)

  const gramProtein = Math.round(protein/100*energy/4)
  const gramCarbs = Math.round(carbs/100*energy/4)
  const gramFat = Math.round(fat/100*energy/9)


  return (
  <>
    <Navbar />

    <div class="progress" role="progressbar" aria-label="Info example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
      <div class="progress-bar bg-info text-dark" style={{width: curEnergy/energy*100 + "%"}}>Energy {curEnergy} kcal / {energy} kcal {Math.round(curEnergy/energy*100)}%</div>
    </div>

    <div class="progress" role="progressbar" aria-label="Warning example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
      <div class="progress-bar bg-warning text-dark" style={{width: curProtein/gramProtein*100 + "%"}}>Protein {curProtein}g / {gramProtein}g {Math.round(curProtein/gramProtein*100)}%</div>
    </div>

    <div class="progress" role="progressbar" aria-label="Success example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
      <div class="progress-bar bg-success" style={{width: curCarbs/gramCarbs*100 + "%"}}>Carbs {curCarbs}g / {gramCarbs}g {Math.round(curCarbs/gramCarbs*100)}%</div>
    </div>

    <div class="progress" role="progressbar" aria-label="Danger example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
      <div class="progress-bar bg-danger" style={{width: curFat/gramFat*100 + "%"}}>Fat {curFat}g / {gramFat}g {Math.round(curFat/gramFat*100)}%</div>
    </div>
    {/* <div class="progress" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
      <div class="progress-bar bg-success" style={{width: "25%"}}>25%</div>
    </div>

    <div class="progress" role="progressbar" aria-label="Danger example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
      <div class="progress-bar bg-danger" style={{width: "100%"}}>100%</div>
    </div> */}
  </>
  );
}

export default Diary;

import Navbar from './Navbar'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Account() {
  const [name, setName] = useState(null)
  const [display, setDisplay] = useState(null)
  const [updateDisplay, setUpdateDisplay] = useState(null)
  const [oldPass, setOldPass] = useState(null)
  const [newPass, setNewPass] = useState(null)
  const [confirmNewPass, setConfirmNewPass] = useState(null)


  useEffect(() => {
    axios.get('http://localhost:5000/get')
    .then(users => {
      const storageUser = JSON.parse(localStorage.getItem("user")).name
      const user = users.data.filter((user) => 
        user.name === storageUser
      )[0]
      setName(user?.name)
      setDisplay(user?.display)
      setUpdateDisplay(user?.display)
    })
    
  }, [])

  const submitName = () => {
    setDisplay(updateDisplay)
    const user = {
      name: name,
      display: updateDisplay,
  }
  axios.post('http://localhost:5000/update/account/name', user)
  .then(result => console.log(result))
  .catch(err => console.log(err))
  }


  const submitPass = () => {

    setOldPass('')
    setNewPass('')
    setConfirmNewPass('')

    const info = {
      name: name,
      oldPass: oldPass,
      newPass: newPass,
    }
    if (newPass !== confirmNewPass) {
      alert("Passwords do not match")

      return
    }
    axios.post('http://localhost:5000/update/account/pass', info)
    .then(result => {
      if (result.data === "wrong old pass") {
        alert("Incorrect old password")
      }
      else
      {
        alert("Change password successfully")
      }
    })
    .catch(err => console.log(err))
  }
  

  return (
  <>
    <Navbar />
    {/* <!-- Button trigger modal --> */}

    <div class="row g-3 align-items-center">
      <div class="col-auto">
        <label for="display" class="col-form-label">Display Name</label>
      </div>

      <div class="col-auto">
      <input type="text" class="form-control" id="display" value={display} disabled/>
      </div>

      <div class="col-auto">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal1">
          Update
        </button>

        {/* <!-- Modal --> */}
        <div class="modal fade" id="modal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Change display name</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                {/* body */}
                <div class="row g-3 align-items-center">
                  <div class="col-auto">
                    <label for="display" class="col-form-label">New display name</label>
                  </div>

                  <div class="col-auto">
                  <input type="text" class="form-control" id="display" value={updateDisplay} onChange={(e) => setUpdateDisplay(e.target.value)}/>
                  </div>

                </div>
                {/* body */}
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setUpdateDisplay(display)}>Close</button>
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={submitName}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-3 align-items-center">
      <div class="col-auto">
        <label for="pass" class="col-form-label">Password</label>
      </div>

      <div class="col-auto">
      <input type="password" class="form-control" id="pass" value="**********" disabled/>
      </div>

      <div class="col-auto">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal2">
          Update
        </button>

        {/* <!-- Modal --> */}
        <div class="modal fade" id="modal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Change password</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                {/* body */}
                <div class="row g-3 align-items-center">
                  <div class="col-auto">
                    <label for="display" class="col-form-label">Old password</label>
                  </div>

                  <div class="col-auto">
                  <input type="password" class="form-control" id="display" value={oldPass} onChange={(e) => setOldPass(e.target.value)}/>
                  </div>

                </div>

                <div class="row g-3 align-items-center">
                  <div class="col-auto">
                    <label for="display" class="col-form-label">New password</label>
                  </div>

                  <div class="col-auto">
                  <input type="password" class="form-control" id="display" value={newPass} onChange={(e) => setNewPass(e.target.value)}/>
                  </div>

                </div>

                <div class="row g-3 align-items-center">
                  <div class="col-auto">
                    <label for="display" class="col-form-label">Confirm new password</label>
                  </div>

                  <div class="col-auto">
                  <input type="password" class="form-control" id="display" value={confirmNewPass} onChange={(e) => setConfirmNewPass(e.target.value)}/>
                  </div>

                </div>
                {/* body */}
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                  onClick={() => {
                    setOldPass('')
                    setNewPass('')
                    setConfirmNewPass('')
                  }}
                >Close</button>
                <button type="button" class="btn btn-primary" onClick={submitPass}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

export default Account;
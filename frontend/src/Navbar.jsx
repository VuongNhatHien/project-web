import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.clear()
    console.log(localStorage)
    navigate('/')
    window.location.reload();
  }
  return (
  <>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      
      <div class="container-fluid">
        <Link to='/' className="navbar-brand" role="button">
          Home
        </Link>
        {/* <a class="navbar-brand" role="button" onClick={() => navigate('/')}>Home</a> */}
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              {/* <a class="nav-link" role="button" onClick={() => navigate('/diary')}>Diary</a> */}
              <Link to='/diary' className="nav-link" role="button">
                Diary
              </Link>
            </li>

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Foods
              </a>
              <ul class="dropdown-menu">
                <Link to='/custom-recipe' className="dropdown-item" role="button">
                  Custom Recipe
                </Link>
                <Link to='/custom-foods' className="dropdown-item" role="button">
                  Custom Foods
                </Link>


              </ul>

            </li>
            <li class="nav-item">
              {/* <a class="nav-link" role="button" onClick={() => navigate('/diary')}>Diary</a> */}
              <Link to='/account' className="nav-link" role="button">
                Account
              </Link>
            </li>

            <li class="nav-item">
              {/* <a class="nav-link" role="button" onClick={() => navigate('/diary')}>Diary</a> */}
              <Link to='/profile' className="nav-link" role="button">
                Profile
              </Link>
            </li>

            <li class="nav-item">
              {/* <a class="nav-link" role="button" onClick={() => navigate('/diary')}>Diary</a> */}
              <button type="button" class="btn btn-primary" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </>
  );
}

export default Navbar;

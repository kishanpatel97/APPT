import axios from 'axios';
import { MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = (e : MouseEvent<HTMLButtonElement>) =>{
    axios.post("http://localhost:8000/api/users/logout",{},{withCredentials: true})
    .then((res) =>{
        navigate("/login")
    })
    .catch((err) =>{
        console.log("failed logout from navbar", err)
    })
}

  return (
    <header>
      <nav className="navbar">
        <div className="flex items-center flex-no-shrink text-white mr-6">
          <img src="http://www.ipharmd.net/images/white_medical_cross.png" className="h-8 w-8 mr-2" width="54" height="54"/>
          <span className="logoText font-bold text-xl tracking-tight">APPT</span>
        </div>
        {
          location.pathname!=="/login"&&location.pathname!=='/register'?
          <div>
            <a href="https://symptoms.webmd.com" className="navLink">Symptom Search</a>
            <button onClick={logout} className="navLink ml-5">Logout</button>
          </div>
          :null
        }
      </nav>
    </header>
  )
}

export default Header;
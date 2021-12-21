import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Redirect from './components/redirect';
import Login from './components/login';
import Register from './components/register';
import NavBar from './components/navbar';
import Modal from './components/modal';
import AppointmentList from './components/appointmentList';

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path='/' element={<Redirect />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/dashboard' element={<AppointmentList />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

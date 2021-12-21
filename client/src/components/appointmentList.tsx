import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from './card';
import { IAppointment } from '../../../shared/interfaces/appointment.interface';

const AppointmentList: React.FC = (props) => {
  const [appointments, setAppointments] = useState<IAppointment[]>([])
  const [error, setError] = useState("")
  const [loaded, setLoaded] = useState(false)
  
  const fetchAppointments = async() => {
    try {
      const response =  await axios.get<IAppointment[]>('http://localhost:8000/api/appointments',{withCredentials:true})
      setAppointments(prev => [...prev, ...response.data])
      setLoaded(prev => !prev)
    } catch(e: any) {
      setError(e)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  return (
    <div className="flex flex-col items-center w-3/5 mx-auto mt-10">
      <Link to='/add_appointment' className='btn block w-fit self-start mt-3'>Add Appointment</Link>
      {
        loaded?
          appointments.length > 0?
          appointments.map(({_id, name, specialty, time, location}, index) => <Card key={index} _id={_id} name={name} specialty={specialty} time={time} location={location} notes=""/>)
          :
          <div className='m-auto text-center mt-20'>
            <h2 className='text-3xl font-bold'>There are no appointments documented.</h2>
          </div>
        :<p>Loading...</p>
      }
    </div>
  );
};

export default AppointmentList;
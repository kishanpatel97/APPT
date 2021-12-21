import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from './modal'
import Card from './card';
import { IAppointment } from '../../../shared/interfaces/appointment.interface';

const AppointmentList: React.FC = (props) => {
  const [appointments, setAppointments] = useState<IAppointment[]>([])
  const [error, setError] = useState({})
  const [loaded, setLoaded] = useState(false)
  
  const fetchAppointments = async() => {
    try {
      const response =  await axios.get<IAppointment[]>('http://localhost:8000/api/appointments')
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
    <div className="flex flex-col">
      {loaded && appointments.map(({_id, name, specialty, time, location}, index) => <Card key={index} _id={_id} name={name} specialty={specialty} time={time} location={location} notes=""/>)}
    </div>
  );
};

export default AppointmentList;
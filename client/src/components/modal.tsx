import axios from 'axios';
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { IAppointmentPost } from '../../../shared/interfaces/appointment.interface';

const Modal: React.FC = () => {
    const { id: appointmentId } = useParams();
    const [appointmentIdError, setAppointmentIdError] = useState(false);
    const navigate = useNavigate();
    const nameField = useRef<HTMLInputElement>(null);
    const specialtyField = useRef<HTMLInputElement>(null);
    const timeField = useRef<HTMLInputElement>(null);
    const locationField = useRef<HTMLInputElement>(null);
    const notesField = useRef<HTMLInputElement>(null);
    const [appt, setAppt] = useState<IAppointmentPost>({
        name: '',
        specialty: '',
        time: '',
        location: '',
        notes: '',
    });
    const [errors, setErrors] = useState<any>({
        name: '',
        specialty: '',
        time: '',
        location: '',
        notes: '',
    });

    useEffect(() => {
        if (appointmentId) {
            axios
                .get<IAppointmentPost>(`http://localhost:8000/api/appointment/${appointmentId}`, {
                    withCredentials: true,
                })
                .then((res) => {
                    setAppt({
                        name: res.data.name,
                        specialty: res.data.specialty,
                        time: res.data.time,
                        location: res.data.location,
                        notes: res.data.notes,
                    });
                })
                .catch((err) => {
                    setAppointmentIdError(true);
                });
        }
    }, [appointmentId]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAppt({
            ...appt,
            [e.target.name]: e.target.value,
        });
        setErrors({
            ...errors,
            [e.target.name]: '',
        });
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();

        if (appointmentId && !appointmentIdError) {
            axios
                .put<IAppointmentPost>(
                    `http://localhost:8000/api/appointment/${appointmentId}`,
                    appt,
                    {
                        withCredentials: true,
                    }
                )
                .then((res) => {
                    setAppt({
                        name: '',
                        specialty: '',
                        time: '',
                        location: '',
                        notes: '',
                    });
                    setErrors({
                        name: '',
                        specialty: '',
                        time: '',
                        location: '',
                        notes: '',
                    });
                    navigate('/dashboard');
                })
                .catch((err) => {
                    setErrors(err.response.data.errors);
                });
        } else {
            axios
                .post<IAppointmentPost>('http://localhost:8000/api/appointments', appt, {
                    withCredentials: true,
                })
                .then((res) => {
                    setAppt({
                        name: '',
                        specialty: '',
                        time: '',
                        location: '',
                        notes: '',
                    });
                    setErrors({
                        name: '',
                        specialty: '',
                        time: '',
                        location: '',
                        notes: '',
                    });
                    navigate('/dashboard');
                })
                .catch((err) => {
                    setErrors(err.response.data.errors);
                });
        }
    };

    return (
        <>
            <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                <div className='containerWidth relative my-6 mx-auto max-w-3xl'>
                    {/*content*/}
                    <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                        {/*header*/}
                        <div className='flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
                            <h3 className='text-3xl font-semibold'>
                                {appointmentId && !appointmentIdError
                                    ? 'Edit Appointment'
                                    : 'New Appointment'}
                            </h3>
                            <button
                                className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                                onClick={() => navigate('/dashboard')}
                            >
                                <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className='relative p-6 pb-2 flex-auto'>
                            <form
                                onSubmit={submit}
                                className='text-blueGray-500 text-lg leading-relaxed'
                            >
                                <div className='relative'>
                                    <input
                                        autoFocus
                                        ref={nameField}
                                        onChange={handleChange}
                                        name='name'
                                        value={appt.name}
                                        className={
                                            errors.name
                                                ? 'loginRegInput mb-2'
                                                : 'loginRegInput mb-5'
                                        }
                                        placeholder='Name'
                                        type='text'
                                    />
                                    {errors.name ? (
                                        <p className='alertBadLeft mb-2'>{errors.name.message}</p>
                                    ) : null}
                                    <input
                                        ref={specialtyField}
                                        onChange={handleChange}
                                        name='specialty'
                                        value={appt.specialty}
                                        className={
                                            errors.specialty
                                                ? 'loginRegInput mb-2'
                                                : 'loginRegInput mb-5'
                                        }
                                        placeholder='Specialty'
                                        type='text'
                                    />
                                    {errors.specialty ? (
                                        <p className='alertBadLeft mb-2'>
                                            {errors.specialty.message}
                                        </p>
                                    ) : null}
                                    <input
                                        ref={timeField}
                                        onChange={handleChange}
                                        name='time'
                                        value={appt.time}
                                        className={
                                            errors.time
                                                ? 'loginRegInput mb-2'
                                                : 'loginRegInput mb-5'
                                        }
                                        placeholder='Time'
                                        type='datetime-local'
                                        max='2999-12-31T23:59'
                                    />
                                    {errors.time ? (
                                        <p className='alertBadLeft mb-2'>{errors.time.message}</p>
                                    ) : null}
                                    <input
                                        ref={locationField}
                                        onChange={handleChange}
                                        name='location'
                                        value={appt.location}
                                        className={
                                            errors.location
                                                ? 'loginRegInput mb-2'
                                                : 'loginRegInput mb-5'
                                        }
                                        placeholder='Location'
                                        type='text'
                                    />
                                    {errors.location ? (
                                        <p className='alertBadLeft mb-2'>
                                            {errors.location.message}
                                        </p>
                                    ) : null}
                                    <input
                                        ref={notesField}
                                        onChange={handleChange}
                                        name='notes'
                                        value={appt.notes}
                                        className='loginRegInput'
                                        placeholder='Notes'
                                        type='text'
                                    />
                                </div>
                                {/*footer*/}
                                <div className='flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b mt-6'>
                                    <button
                                        className='text-red-500 background-transparent font-bold uppercase px-4 py-2 text-sm outline-none hover:outline-2 hover:outline-red-500 rounded focus:outline-none mr-2 mb-1 ease-linear transition-all duration-300'
                                        type='button'
                                        onClick={() => navigate('/dashboard')}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className='bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:opacity-90 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                                        type='submit'
                                    >
                                        {appointmentId && !appointmentIdError
                                            ? 'Save Changes'
                                            : 'Add Appointment'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
    );
};

export default Modal;

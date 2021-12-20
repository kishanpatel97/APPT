import axios from 'axios';
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { IAppointment } from '../../../shared/interfaces/appointment.interface';

const Modal: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');
    const nameField = useRef<HTMLInputElement>(null);
    const specialtyField = useRef<HTMLInputElement>(null);
    const timeField = useRef<HTMLInputElement>(null);
    const locationField = useRef<HTMLInputElement>(null);
    const notesField = useRef<HTMLInputElement>(null);
    const [appt, setAppt] = useState<IAppointment>({
        name: '',
        specialty: '',
        time: '',
        location: '',
        notes: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAppt({
            ...appt,
            [e.target.name]: e.target.value,
        });
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();

        axios
            .post<IAppointment>('http://localhost:8000/api/appointments', appt, {
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
                setError('');
            })
            .catch((err) => {
                setError(err.response.data.message);
            });
    };

    return (
        <>
            // TODO: connect this button to the EDIT button in our card component
            <button
                className='bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                type='button'
                onClick={() => setShowModal(true)}
            >
                Edit
            </button>
            {showModal ? (
                <>
                    <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                        <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                            {/*content*/}
                            <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                                {/*header*/}
                                <div className='flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
                                    <h3 className='text-3xl font-semibold'>New Appointment</h3>
                                    <button
                                        className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className='relative p-6 flex-auto'>
                                    <form
                                        onSubmit={submit}
                                        className='my-4 text-blueGray-500 text-lg leading-relaxed'
                                    >
                                        <div className='relative'>
                                            <input
                                                autoFocus
                                                ref={nameField}
                                                onChange={handleChange}
                                                name='name'
                                                value={appt.name}
                                                className='loginRegInput mb-5'
                                                placeholder='Name'
                                                type='text'
                                            />
                                            <input
                                                ref={specialtyField}
                                                onChange={handleChange}
                                                name='specialty'
                                                value={appt.specialty}
                                                className='loginRegInput mb-5'
                                                placeholder='Specialty'
                                                type='text'
                                            />
                                            <input
                                                ref={timeField}
                                                onChange={handleChange}
                                                name='time'
                                                value={appt.time}
                                                className='loginRegInput mb-5'
                                                placeholder='Time'
                                                type='time'
                                            />
                                            <input
                                                ref={locationField}
                                                onChange={handleChange}
                                                name='location'
                                                value={appt.location}
                                                className='loginRegInput mb-5'
                                                placeholder='Location'
                                                type='text'
                                            />
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
                                        {error ? <p className='m-2 alertBad'>{error}</p> : null}
                                    </form>
                                </div>
                                {/*footer*/}
                                <div className='flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b'>
                                    <button
                                        className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                                        type='button'
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className='bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                                        type='button'
                                        onClick={() => setShowModal(false)}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
                </>
            ) : null}
        </>
    );
};

export default Modal;

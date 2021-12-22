import { useNavigate } from 'react-router';
import { IAppointment } from '../../../server/interfaces/appointment.interface';
import StarRating from "./starrating";

interface IProps extends IAppointment {
    index: number;
    _id: string;
    deleteFunc(index: number, apptId: string): void;
}

const Card: React.FC<IProps> = (props) => {
    const navigate = useNavigate();
    const { index, _id, name, specialty, time, location, notes, deleteFunc } = props;
    const date = new Date(time).toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <div className='hover:scale-105 rounded-3xl w-full bg-gray-200 mt-5 px-4 py-3 shadow-lg transition transform duration-700 cursor-pointer'>
            <div className='flex flex-col'>
                <div className='flex justify-between items-center w-50'>
                    <div className='text-lg font-semibold text-bookmark-blue flex space-x-1 items-center mb-2'>
                        <svg
                            className='w-7 h-7 text-gray-700'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                fillRule='evenodd'
                                d='M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z'
                                clipRule='evenodd'
                            />
                            <path d='M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z' />
                        </svg>
                        <span>{name}</span>
                    </div>
                    <span className='bg-green-600 rounded-full uppercase text-white text-sm px-4 py-1 font-bold shadow-xl'>
                        {date}
                    </span>
                </div>
                <div className='text-sm text-gray-500 flex space-x-1 items-center'>
                    <span>{specialty}</span>
                </div>
                <div className='text-sm text-gray-500 flex items-center'>
                    <span>{location}</span>
                </div>
                <StarRating />
                <div className='flex justify-end'>
                    <button
                        onClick={() => navigate(`/edit_appointment/${_id}`)}
                        className='mr-2 my-0 uppercase tracking-wider px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer'
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => deleteFunc(index, _id)}
                        className='mr-2 my-0 uppercase tracking-wider px-2 text-red-500 border-red-500 hover:bg-red-500 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer'
                    >
                        Delete
                    </button>
                </div>
            </div>
            {/* <div>
        <h2 className='text-3xl'>Notes:</h2>
        <span className='text-3xl'>{notes}</span>
      </div> */}
        </div>
    );
};

export default Card;

export interface IAppointment {
    _id: string;
    name: string;
    specialty: string;
    time: string;
    location: string;
    notes?: string;
}

export interface IAppointmentPost {
    name: string;
    specialty: string;
    time: string;
    location: string;
    notes: string;
}

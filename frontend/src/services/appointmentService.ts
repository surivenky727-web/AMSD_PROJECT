import { authHeader } from "../utils/auth";

export interface AppointmentInput {
  doctorId: string;
  date: string;
  time: string;
}

export const bookAppointment = async (data: AppointmentInput) => {
  const res = await fetch('/api/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Unable to book appointment');
  return res.json();
};

export const getMyAppointments = async () => {
  const res = await fetch('/api/appointments', {
    headers: authHeader(),
  });
  if (!res.ok) return [];
  return res.json();
};

export interface Appointment {
  _id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
};
export interface User {
  name: string;
  email: string;
}
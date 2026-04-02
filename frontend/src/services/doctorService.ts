import type { Doctor } from "../data/doctors";

export const getDoctors = async (): Promise<Doctor[]> => {
  const res = await fetch('/api/doctors');
  if (!res.ok) return [];
  return res.json();
};

export const getDoctorById = async (
  id: string
): Promise<Doctor | undefined> => {
  const res = await fetch(`/api/doctors/${id}`);
  if (!res.ok) return undefined;
  return res.json();
};
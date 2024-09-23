export const Base_URL = "http://localhost:5000/api";

export const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
export const user = typeof window !== 'undefined' ? localStorage.getItem("guest") : null;
export const admin = typeof window !== 'undefined' ? localStorage.getItem("admin") : null;
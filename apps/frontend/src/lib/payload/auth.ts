import api from "../utils/api";
// import { Customer } from "@repo/cms/payload-types";

interface LoginPayload {
  email: string;
  password: string;
}

interface ForgotPasswrdPayload {
  email: string;
}

async function login(payload: LoginPayload) {
  return api.post<CurrentCustomer>("/api/customers/login", payload);
}

async function logout() {
  return api.post("/api/customers/logout?allSessions=false", {});
}

async function register(payload: LoginPayload) {
  return api.post("/api/customers/register", payload);
}

async function verifyEmail(token: string) {
  return api.post(`/api/customers/verify/${token}`);
}

async function forgotPassword(payload: ForgotPasswrdPayload) {
  return api.post(`/api/customers/forgot-password`, payload);
}

export { login, logout, register, verifyEmail, forgotPassword };

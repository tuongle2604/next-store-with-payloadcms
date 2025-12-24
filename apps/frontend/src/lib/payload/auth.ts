"use server";
// import { json } from "zod";
import api from "../api";
// import { Customer } from "@repo/cms/payload-types";
import payloadSDK from "../payloadSDK";
import type { CustomerProfile } from "@/lib/payload/customer";
import type { Customer } from "@repo/cms/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface LoginPayload {
  email: string;
  password: string;
}

interface ForgotPasswrdPayload {
  email: string;
}

async function login(payload: LoginPayload) {
  const { error, data } = await payloadSDK.customers.login<Customer>(payload);

  console.log(data);

  if (data && data.user) {
    const cookieStore = await cookies();

    cookieStore.set({
      name: "payload-token",
      value: data.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    const customerProfile: CustomerProfile = {
      bio: data.user.bio,
      email: data.user.email,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      id: data.user.id,
      fullName: data.user.fullName,
    };

    return {
      error,
      data: customerProfile,
    };
  }

  return { error, data: undefined };
}

async function logout() {
  const cookieStore = await cookies();
  const token = cookieStore.get("payload-token")?.value || "";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  await api.post("/api/customers/logout?allSessions=false", {}, headers);

  cookieStore.delete("payload-token");
}

async function removeTokenCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("payload-token");
}

async function register(payload: LoginPayload) {
  return api.post("/api/customers/register", payload);
}

async function verifyEmail(token: string) {
  return payloadSDK.customers.verifyEmail(token);
}

async function forgotPassword(payload: ForgotPasswrdPayload) {
  return payloadSDK.customers.forgotPassword(payload);
}

export { login, logout, register, verifyEmail, forgotPassword, removeTokenCookie };

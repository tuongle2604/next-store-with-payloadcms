"use server";
import crypto from "crypto";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const secret = process.env.PAYLOAD_SECRET || "";

async function decodeJWT(token: string) {
  try {
    const newSecret = crypto
      .createHash("sha256")
      .update(secret)
      .digest("hex")
      .slice(0, 32);

    const secretKey = new TextEncoder().encode(newSecret);
    const { payload: decodedPayload } = await jwtVerify(token, secretKey);
    return decodedPayload;
  } catch (err) {
    console.error("JWT verification failed", err);
    return null;
  }
}

const getCustomerFromToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("payload-token")?.value || "";

  if (!token) return null;

  const data: unknown = await decodeJWT(token);

  return data || null;
};

export { getCustomerFromToken };

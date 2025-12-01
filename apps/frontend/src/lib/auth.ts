"use server";

import { type JWTPayload, SignJWT, jwtVerify } from "jose";
import crypto from "crypto";

if (!process.env.PAYLOAD_SECRET) {
  throw new Error("SECRET must be defined");
}

const secret = process.env.PAYLOAD_SECRET || "";

const newSecret = crypto
  .createHash("sha256")
  .update(secret)
  .digest("hex")
  .slice(0, 32);

const secretKey = new TextEncoder().encode(newSecret);

async function decodeJWT(token: string) {
  try {
    const { payload: decodedPayload } = await jwtVerify(token, secretKey);
    return decodedPayload;
  } catch (err) {
    console.error("JWT verification failed", err);
    return null;
  }
}

export { decodeJWT };

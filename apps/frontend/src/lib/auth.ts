"use server";

import { type JWTPayload, SignJWT, jwtVerify } from "jose";
import crypto from "crypto";

if (!process.env.PAYLOAD_SECRET) {
  throw new Error("SECRET must be defined");
}

const secret = process.env.PAYLOAD_SECRET || "";

const newSecret = crypto.createHash("sha256").update(secret).digest("hex").slice(0, 32);

const secretKey = new TextEncoder().encode(newSecret);

async function decodeJWT<T>(token: string): Promise<{ payload?: T; error?: any }> {
  try {
    const { payload } = await jwtVerify<T>(token, secretKey);

    return { payload, error: undefined };
  } catch (err) {
    console.log("JWT verification failed", err);

    return { payload: undefined, error: err };
  }
}

export { decodeJWT };

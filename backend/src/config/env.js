import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const defaultOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

function parseOrigins(value) {
  if (!value || value.trim() === "*") return "*";
  return value.split(",").map((o) => o.trim()).filter(Boolean);
}

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  isProduction,
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGO_URI,
  clientOrigin: parseOrigins(
    process.env.CLIENT_ORIGIN ??
      (isProduction ? "*" : defaultOrigins.join(","))
  ),
};

export function assertEnv() {
  if (!env.mongoUri) {
    throw new Error(
      "MONGO_URI is missing. Copy backend/.env.example to backend/.env and set your MongoDB connection string."
    );
  }
}

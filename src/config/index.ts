import dotenv from "dotenv";

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new Error(`⚠️  Couldn't find .env file  ⚠️`);
}

// Environment variable exports.
export default {
  port: process.env.PORT || 3000,
};
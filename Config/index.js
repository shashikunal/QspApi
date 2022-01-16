require("dotenv").config("../Config/index");
export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV;
export const MONGODB_URL = process.env.MONGODB_URL;
export const GEOCODER_PROVIDER = process.env.GEOCODER_PROVIDER;
export const GEOCODER_API_KEY = process.env.GEOCODER_API_KEY;

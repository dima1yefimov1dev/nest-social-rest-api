import * as dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const SALT = Number(process.env.SALT) || 10;
export const TOKEN_LIFETIME = Number(process.env.TOKEN_LIFE_TIME) || 1000000;

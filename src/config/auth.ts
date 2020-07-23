// import { resolve } from 'path';
// import dotenv from 'dotenv';

// if (process.env.NODE_ENV !== 'production') {
//   const path = resolve(__dirname, '..', '..', '.env.');

//   dotenv.config({
//     path: resolve(`${path}${process.env.NODE_ENV || 'development'}`),
//   });
//   dotenv.config({
//     path: resolve(`${path}local`),
//   });
// } else {
//   dotenv.config();
// }

export default {
  secret: process.env.API_KEY,
  expiresIn: '7d',
};

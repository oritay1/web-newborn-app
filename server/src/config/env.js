import 'dotenv/config';

export const env = {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGODB_URI,
  clientOrigin: process.env.CLIENT_ORIGIN,
  isProduction: process.env.NODE_ENV === 'production',
};

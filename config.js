module.exports = {
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  URL: process.env.BASE_URL || 'http://localhost:3000',
  URI:
    process.env.MONGODB_URI ||
    'mongodb+srv://phoenix622:abhishek1@testcluster1-eomps.mongodb.net/test?retryWrites=true&w=majority',
  JWT_SECRET: process.env.JWT_SECRET || 'secret1'
};

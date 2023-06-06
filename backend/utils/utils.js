const urlRegex = /^https?:\/\/(wwq\.)?[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]{1,}#?\/|(\.[a-z]{1,})$/i;

const corsOrigins = {
  origin: [
    'http://api.rin.dz.nomoredomains.rocks',
    'http://localhost:3000',
    'https://web.postman.co',
  ],
  credentials: true,
};

module.exports = {
  urlRegex,
  corsOrigins,
};

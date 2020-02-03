require('dotenv').config();
const server = require('./api/server');

const PORT = process.env.PORT || 8080;

server.listen(PORT, () =>
  console.log(`\n*** Server running on port ${PORT} ***\n`)
);

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

module.exports = server => {
  server.use(morgan('dev'), helmet(), cors(), express.json());
};

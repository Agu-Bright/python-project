require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes = require('./api/users/users.routes');

app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
      
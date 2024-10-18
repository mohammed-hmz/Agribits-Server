const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'https://agribits.co',
  credentials: true,
}));

// Routes
app.use('/api', authRoutes);

const PORT =  3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

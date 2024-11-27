require('dotenv').config();
require('./config/connectDB');
require('./services/admin.service');

const express = require('express');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: ["http://localhost:5173", "https://vrv-security-two.vercel.app"],
    methods: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(express.json());
app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;

const auth = require('./routes/auth.route');
const user = require('./routes/user.route');
const health = require('./routes/health.route');

app.use("/", health)
app.use("/auth", auth);
app.use("/user", user);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})



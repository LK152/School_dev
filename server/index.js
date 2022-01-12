const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './config.env' });
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(require('./routes/routes'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

require('dotenv').config();
const app = require('./src/app');
console.log("Environment Check - JWT_SECRET loaded:", !!process.env.JWT_SECRET);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

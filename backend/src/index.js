const app = require('./app');

const port = 5000;  // Hardcoded port number

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

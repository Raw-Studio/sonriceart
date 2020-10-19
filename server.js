const app = require('./app.js')
const mongoConnection = require('./helpers/db');

const PORT = process.env.PORT || 3000;

mongoConnection.connect();


app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);
})
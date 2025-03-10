const app = require('./app');
const http = require('http');
const port = process.env.PORT;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
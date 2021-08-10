const http = require('http');
const https = require('https');

const callApi = () => {
    return new Promise(resolve => {
        const url = "https://official-joke-api.appspot.com/jokes/ten"

        let all_chunks = [];

        const request = https.request(url, (response) => {

            response.on('data', (chunk) => {
                all_chunks.push(chunk);
                // let response_body = Buffer.concat(all_chunks);
                // console.log(response_body.toString())
                // res.write(str, 'utf8', () => {
                //     console.log("Writing Buffer Data...");
                // });
            });

            response.on('end', () => {

            });

            response.on('error', (error) => {
                console.log(error.message);
            });
        });

        request.on('error', (error) => {
            console.log(error.message);
        });

        request.end();

        return all_chunks;
    })
}

const apiQuery = async () => {
    return await callApi();
}

const hostname = '127.0.0.1';
const port = 3030;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    console.log(apiQuery())

    // Creating buffer
    const buff = Buffer.from('str', 'utf8');

    res.end('\n...ok');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
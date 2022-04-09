/***************************************************************
*                                                              *
*     Main node.js server program, run with  node prog1.js     *
*                                                              *
***************************************************************/

const http = require('http');
const path = require('path');
const fs = require('fs');


//added later for timestamped console messages
require('log-timestamp');


function handleRequest(req, res) {
  // What did we request?
  let pathname = req.url;


  // If blank let's ask for index.html
  if (pathname == '/') {
    pathname = '/index.html';
  }



  //This is so I can read console logs without the spam, there still is the problem of 'japaneese' ips spamming the server with requests that I'm choosing to ignore
  if(pathname == '/index.html'){
    console.log(req.headers['x-forwarded-for'] ||
       req.socket.remoteAddress ||
       null);
  }


  // Ok what's our file extension
  let ext = path.extname(pathname);

  // Map extension to file type
  const typeExt = {
    '.html': 'text/html',
    '.js':   'text/javascript',
    '.css':  'text/css'
  };

  // What is it?  Default to plain text
  let contentType = typeExt[ext] || 'text/plain';

  // Now read and write back the file with the appropriate content type
  fs.readFile(__dirname + pathname,
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading ' + pathname);
      }
      // Dynamically setting content type
      res.writeHead(200,{ 'Content-Type': contentType });
      res.end(data);
    }
  );
}


let server = http.createServer(handleRequest);
server.listen(8000);

console.log('server started\n');


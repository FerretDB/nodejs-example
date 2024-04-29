# Quick Start: Node.js and MongoDB

This is a fork of https://github.com/FerretDB/nodejs-example, simplified to run with FerretDB.

### Execution Steps

1. `npm install`
2. `node index.js --uri='mongodb://localhost:27017/'`
3. To run with strict Stable API: `node index.js --uri='mongodb://localhost:27017/' --strict`
4. To run with PLAIN authentication pass PLAIN to the `authMechanism` URI option: `node index.js --uri='mongodb://localhost:27017/?authMechanism=PLAIN'`

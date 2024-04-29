const { MongoClient } = require("mongodb");

const { parseArgs } = require('node:util');
const args = ['--uri', 'u', '--strict'];

const options = {
    uri: {
        type: 'string',
    },
    strict: {
        type: 'boolean',
        short: 's',
    },
};
const { values, tokens } = parseArgs({ options, tokens: true });

const uri = values.uri;

const client = new MongoClient(uri);

async function run() {
  try {
    // TODO finish
    let res = await client.db("admin").command({ ping: 1 });
    console.log(res);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

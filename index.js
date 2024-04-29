const { MongoClient, ServerApiVersion } = require("mongodb");
const { parseArgs } = require('node:util');

const options = {
    uri: {
        type: 'string',
    },
    strict: {
        type: 'boolean',
        short: 's',
    },
};
const { values } = parseArgs({ options, tokens: false });

const uri = values.uri;

let client;

if (values.strict) {
    client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
        }
    });
} else {
    client = new MongoClient(uri);
}


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

const assert = require('assert');
const { parseArgs } = require('node:util');

const { MongoClient, ServerApiVersion } = require("mongodb");

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
    client = new MongoClient(uri, {
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
    let res = await client.db('test').command({ ping: 1 });
    assert.equal(res.ok, 1, 'ping failed');
    res = await client.db('test').command({ dropDatabase: 1 });
    assert.equal(res.ok, 1, 'dropDatabase failed');
    
    let docs = [];
    for (let i = 1; i <= 4; i++) {
      docs.push({ _id: i, a: i });
    }

    res = await client.db('test').collection('foo').insertMany(docs);
    assert.equal(res.insertedCount, 4);

    const actual = await client.db('test').collection('foo').findOne({ a: 4 });
    assert.equal(actual.a, 4, 'Value should be 4');

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run()

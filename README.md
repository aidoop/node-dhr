# @things-factory/node-dhr

DH Robotics gripper(AG95) client module for nodejs.

## Install

```bash
$ npm install @things-factory/node-dhr --save
```

## Examples

Run the examples from the examples directory.
```javascript
const { AG95Client } = require('@things-factory/node-dhr')
const { sleep } = require('../build/utils')

;(async function () {
  var client = new AG95Client('192.168.1.29', 8888)
  await client.connect()

  await client.initialize()
  await sleep(5000)

  await client.close()
  await sleep(5000)

  await client.open()
  await sleep(5000)

  client.disconnect()
  console.log('application ended')
})()

```


### Moving Robot Arm


## API Documentation

...

## Test

`npm test`.

## Contributing

I'm happy to accept most PR's if the tests run
green, all new functionality is tested, and there are no objections in the PR.

## MIT License

The library is distributed under the MIT License - if for some reason that
doesn't work for you please get in touch.

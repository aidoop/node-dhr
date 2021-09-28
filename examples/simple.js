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

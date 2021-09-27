const { IndyDCPClient, sleep } = require('@things-factory/node-indydcp')

async function waitForState(client, checkFn) {
  var robotStatus = await client.getRobotStatus()
  while (!checkFn(robotStatus)) {
    await sleep(1000)
    robotStatus = await client.getRobotStatus()
  }
}

;(async function () {
  var client = new IndyDCPClient('192.168.1.207', 'NRMK-Indy7')
  await client.connect()

  await client.goHome()
  console.log(await client.getRobotStatus())

  await waitForState(client, status => !status.isBusy)

  await client.goZero()
  console.log(await client.getRobotStatus())

  await waitForState(client, status => !status.isBusy)

  client.disconnect()
})()

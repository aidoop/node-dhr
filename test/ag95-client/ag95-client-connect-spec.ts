import { AG95Client } from '../../src/ag95-client'
import { sleep } from '../../src/utils'
import { AG95_IP, AG95_PORT } from '../settings'

describe('AG95Client', function () {
  describe('#connect()', function () {
    this.timeout(100000000)

    it('should return binary string', async () => {
      var client = new AG95Client(AG95_IP, AG95_PORT)
      await client.connect()
      console.log('connected')

      await sleep(2000)

      await client.initialize()
      await sleep(5000)

      await client.setPosition(0)
      await sleep(5000)

      await client.setPosition(1000)
      await sleep(5000)

      console.log('set force')
      await client.setForce(30)
      await sleep(3000)
      console.log('get force')
      let forceResult = await client.getForce()
      console.log('force: ', forceResult)

      let gripperState = await client.getState()
      console.log('state: ', gripperState)

      client.disconnect()
      console.log('disconnected')
    })
  })
})

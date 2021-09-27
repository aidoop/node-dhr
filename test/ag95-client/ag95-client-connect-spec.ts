import { AG95Client } from '../../src/ag95-client'
import { sleep } from '../../src/utils'
import { AG95_IP, AG95_PORT } from '../settings'

describe('AG95Client', function () {
  describe('#connect()', function () {
    this.timeout(100000)

    it('should return binary string', async () => {
      var client = new AG95Client(AG95_IP, AG95_PORT)
      await client.connect()
      console.log('connected')

      // await client.getRobotStatus()
      // console.log(client.robotStatus)
      sleep(3000)

      await client.initialize()

      client.disconnect()
      console.log('disconnected')
    })
  })
})

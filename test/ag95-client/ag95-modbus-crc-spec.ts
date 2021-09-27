import { expect } from 'chai'

import { getCrc16Modbus } from '../../src/utils'

describe('ModbusCRC', function () {
  describe('compare the expected value', function () {
    this.timeout(100000)

    it('should return modbus-crc 16bit value', async () => {
      let testBuf = Buffer.from([0x01, 0x06, 0x01, 0x00, 0x00, 0x1])
      let result = getCrc16Modbus(testBuf)
      console.log('result = ', result.toString(16))

      expect(result).to.be.equal(0xf649)
    })
  })
})

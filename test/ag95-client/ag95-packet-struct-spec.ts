import { RTUPacketData } from '../../src/packets'

describe('RTUPacketData', function () {
  describe('RTUPacketData handling', function () {
    this.timeout(100000)

    it('should return modbus-crc 16bit value', async () => {
      let packetData = new RTUPacketData(0x01, 0x06)
      let { fields, buffer } = packetData.buildRTUPacket(0x0405, 0x012c)

      let fullPacket = packetData.buildFullPacket(buffer)
      console.log('full packet: ', fullPacket)
    })
  })
})

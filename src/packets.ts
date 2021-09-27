import Struct from 'struct'

// RTU function type
export const PACKET_FUNC_READ = 0x03
export const PACKET_FUNC_MREAD = 0x04
export const PACKET_FUNC_WRITE = 0x06
export const PACKET_FUNC_MWRITE = 0x10

// default slave address
export const PACKET_DEFAULT_SLVADDR = 0x01

// RTUPacket type declaration
export const RTUPacket = Struct() // need to be packed
  .word8Sle('slaveAddress')
  .word8Sle('func')
  .word16Sle('regiserAddress')
  .word16Sle('registerData')

export class RTUPacketData {
  private _slaveAddress
  private _func
  private _registerAddr
  private _registerData

  constructor(slaveAddress, func) {
    this._slaveAddress = slaveAddress
    this._func = func
  }

  setRegister(addr, data) {
    this._registerAddr = addr
    this._registerData = data
  }

  createPacketData(addr, data): { fields: any; buffer: Buffer } {
    var fields = RTUPacket.allocate().fields
    var buffer = RTUPacket.buffer()

    fields.slaveAddress = this._slaveAddress
    fields.func = this._func
    fields.regiserAddress = this._registerAddr
    fields.registerData = this._registerData

    return { fields, buffer }
  }

  parseBuffer(buffer: Buffer) {
    RTUPacket._setBuff(buffer)
    return RTUPacket.fields
  }
}

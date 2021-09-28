import Struct from 'struct'

import { getCrc16Modbus } from './utils'

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
  .word16Sbe('regiserAddress')
  .word16Sbe('registerData')

export const RTUPacketByte = Struct() // need to be packed
  .word8Sle('slaveAddress')
  .word8Sle('func')
  .word16Sbe('regiserAddress')
  .word8Sle('registerData')
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

  // RTU packet: slave address(1) + function(1) + register address
  buildRTUPacket(addr, data): { fields: any; buffer: Buffer } {
    var fields = RTUPacket.allocate().fields
    var buffer = RTUPacket.buffer()

    this._registerAddr = addr
    this._registerData = data

    fields.slaveAddress = this._slaveAddress
    fields.func = this._func
    fields.regiserAddress = this._registerAddr
    fields.registerData = this._registerData

    return { fields, buffer }
  }

  // RTU packet: slave address(1) + function(1) + register address
  buildRTUPacketByte(addr, data): { fields: any; buffer: Buffer } {
    var fields = RTUPacketByte.allocate().fields
    var buffer = RTUPacketByte.buffer()

    this._registerAddr = addr
    this._registerData = data

    fields.slaveAddress = this._slaveAddress
    fields.func = this._func
    fields.regiserAddress = this._registerAddr
    fields.registerData = this._registerData

    return { fields, buffer }
  }

  // RTU packet + CRC(Modbus-16) packet
  buildFullPacket(buffer) {
    let resultCrc = getCrc16Modbus(buffer)
    let crcBuffer = Buffer.alloc(2)
    crcBuffer.writeUInt16LE(resultCrc)

    return Buffer.concat([buffer, crcBuffer], buffer.length + crcBuffer.length)
  }

  parseBuffer(buffer: Buffer) {
    RTUPacket._setBuff(buffer)
    return RTUPacket.fields
  }
}

// RTUPacket type declaration
export const RTUReadPacket = Struct() // need to be packed
  .word8Sle('slaveAddress')
  .word8Sle('func')
  .word8Sle('readBit')
  .word16Sbe('registerData')
  .word16Sle('crc')

import { Socket } from 'net'
import PromiseSocket from 'promise-socket'

import { RTUPacketData, RTUReadPacket } from './packets'

export class AG95Client {
  public socket
  public serverIp
  public serverPort
  public robotStatus

  constructor(serverIp, serverPort) {
    this.socket
    this.serverIp = serverIp
    this.serverPort = serverPort
  }

  async connect() {
    const socket = new Socket()
    socket.setKeepAlive(true, 60000)

    this.socket = new PromiseSocket(socket)

    await this.socket.connect(this.serverPort, this.serverIp)

    console.log(`Connect: Server IP (${this.serverIp})`)
  }

  disconnect() {
    this.socket && this.socket.destroy()
    this.socket = null
  }

  shutdown() {
    this.disconnect()
  }

  async _sendMessage(buf, size?) {
    await this.socket.write(buf, size || buf.length)
  }

  async _recvMessage(size) {
    this.socket.setTimeout(20000)
    var message = await this.socket.read(size)
    if (!message) {
      throw new Error('socket closed')
    }
    return message
  }

  async initialize() {
    let packetData = new RTUPacketData(0x01, 0x06)
    let { fields, buffer } = packetData.buildRTUPacket(0x0100, 0x00a5)
    let fullPacket = packetData.buildFullPacket(buffer)

    await this._sendMessage(fullPacket, fullPacket.length)
    var recvMessage = await this._recvMessage(fullPacket.length)
    return recvMessage
  }

  async _setRegisterValue(address, value) {
    let packetData = new RTUPacketData(0x01, 0x06)
    let { fields, buffer } = packetData.buildRTUPacket(address, value)
    let fullPacket = packetData.buildFullPacket(buffer)

    await this._sendMessage(fullPacket, fullPacket.length)
    return await this._recvMessage(fullPacket.length)
  }

  async _getRegisterValue(address) {
    let packetData = new RTUPacketData(0x01, 0x03)
    let { fields, buffer } = packetData.buildRTUPacket(address, 0x0001)
    let fullPacket = packetData.buildFullPacket(buffer)
    await this._sendMessage(fullPacket, fullPacket.length)

    let recvBuffer = await this._recvMessage(RTUReadPacket.length)
    RTUReadPacket._setBuff(recvBuffer)
    fields = RTUReadPacket.fields
    return fields.registerData
  }

  async setForce(value) {
    return await this._setRegisterValue(0x0101, value)
  }

  async getForce() {
    return await this._getRegisterValue(0x0101)
  }

  async setPosition(value) {
    return await this._setRegisterValue(0x0103, value)
  }

  async getPosition() {
    return await this._getRegisterValue(0x0103)
  }

  async open() {
    return await this.setPosition(1000)
  }

  async close() {
    return await this.setPosition(0)
  }

  async setSpeed(value) {
    return await this._setRegisterValue(0x0104, value)
  }

  async getSpeed() {
    return await this._getRegisterValue(0x0104)
  }

  async getState() {
    return await this._getRegisterValue(0x0201)
  }
}

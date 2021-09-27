import { Socket } from 'net'
import PromiseSocket from 'promise-socket'

import { PACKET_INITIALIZATION } from './consts'
import { sleep } from './utils'

/* Indy Client Class */
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
    var message = await this.socket.read(size)
    if (!message) {
      throw new Error('socket closed')
    }
    return message
  }

  async initialize() {
    var sbuf = Buffer.from(PACKET_INITIALIZATION)
    await this._sendMessage(sbuf, sbuf.length)
    console.log('message sent')
    sleep(1000)
    var recvMessage = await this._recvMessage(sbuf.length)
    console.log('message recv', recvMessage)
    console.log(recvMessage)
  }
}

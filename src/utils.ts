export function bin(int) {
  return (int >>> 0).toString(2)
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function getCrc16Modbus(buffer) {
  var crc = 0xffff
  var odd

  for (var i = 0; i < buffer.length; i++) {
    crc = crc ^ buffer[i]

    for (var j = 0; j < 8; j++) {
      odd = crc & 0x0001
      crc = crc >> 1
      if (odd) {
        crc = crc ^ 0xa001
      }
    }
  }

  return crc
}

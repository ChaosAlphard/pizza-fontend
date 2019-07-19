import crypto from 'crypto'

function getMD5(password) {
  return crypto.createHash('md5').update(password).digest('hex')
}

export default getMD5
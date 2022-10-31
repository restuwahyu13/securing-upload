import crypto from 'crypto-js'

export const cryptoEncrypt = (input: string) => {
  const cipher: CryptoJS.lib.CipherParams = crypto.AES.encrypt(input, process.env.CRYPTO_SECRET_KEY)
  const res: string = cipher.toString(crypto.format.OpenSSL)
  return res
}

export const cryptoDecrypt = (input: string) => {
  const cipher: CryptoJS.lib.WordArray = crypto.AES.decrypt(input, process.env.CRYPTO_SECRET_KEY)
  const res: string = cipher.toString(crypto.enc.Utf8)
  return res
}

import crypto from 'crypto-js'

export const cryptoEncrypt = (input) => {
	const cipher = crypto.AES.encrypt(input, process.env.REACT_APP_CRYPTO_SECRET_KEY)
	const res = cipher.toString(crypto.format.OpenSSL)
	return res
}

export const cryptoDecrypt = (input) => {
	const cipher = crypto.AES.decrypt(input, process.env.REACT_APP_CRYPTO_SECRET_KEY)
	const res = cipher.toString(crypto.enc.Utf8)
	return res
}

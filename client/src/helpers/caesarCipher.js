let alphabet = 'abcdefghijklmnopqrstuvwxyz'
let lc = alphabet.replace(/\s/g, '').toLowerCase().split('')
let uc = alphabet.replace(/\s/g, '').toUpperCase().split('')

export function caesarEncrypt(token, rotate) {
	return Array.from(token)
		.map((v) => {
			if (lc.indexOf(v.toLowerCase()) === -1 || uc.indexOf(v.toUpperCase()) === -1) return v

			const lcEncryptIndex = (lc.indexOf(v.toLowerCase()) + rotate) % alphabet.length
			const lcEncryptedChar = lc[lcEncryptIndex]

			const ucEncryptIndex = (uc.indexOf(v.toUpperCase()) + rotate) % alphabet.length
			const ucEncryptedChar = uc[ucEncryptIndex]

			return lc.indexOf(v) !== -1 ? lcEncryptedChar : ucEncryptedChar
		})
		.join('')
}

export function caesarDecrypt(token, rotate) {
	return Array.from(token)
		.map((v) => {
			if (lc.indexOf(v.toLowerCase()) === -1 || uc.indexOf(v.toUpperCase()) === -1) return v

			let lcEncryptIndex = (lc.indexOf(v.toLowerCase()) - rotate) % alphabet.length
			lcEncryptIndex = lcEncryptIndex < 0 ? lcEncryptIndex + alphabet.length : lcEncryptIndex
			const lcEncryptedChar = lc[lcEncryptIndex]

			let ucEncryptIndex = (uc.indexOf(v.toUpperCase()) - rotate) % alphabet.length
			ucEncryptIndex = ucEncryptIndex < 0 ? ucEncryptIndex + alphabet.length : ucEncryptIndex
			const ucEncryptedChar = uc[ucEncryptIndex]

			return lc.indexOf(v) !== -1 ? lcEncryptedChar : ucEncryptedChar
		})
		.join('')
}

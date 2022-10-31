import axios from 'axios'

export const httpClient = async (url, method, contentType, data = {}) => {
	try {
		return await axios(url, {
			method: method,
			data: data,
			headers: {
				'Accept': contentType,
				'Content-Type': contentType
			}
		})
	} catch (e) {
		console.error(`httpClient error: ${e.message}`)
		return e
	}
}

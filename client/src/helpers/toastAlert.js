import { toast } from 'react-toastify'

export const toastAlert = (type, text) => {
	if (type === 'error') {
		toast.error(text, {
			position: 'top-right',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'colored'
		})
	}

	if (type === 'success') {
		toast.success(text, {
			position: 'top-right',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'colored'
		})
	}

	if (type === 'info') {
		toast.info(text, {
			position: 'top-right',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'colored'
		})
	}
}

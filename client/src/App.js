import React, { useEffect, useState } from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'

import Card from './components/Card'
import Alert from './components/Alert'
import { httpClient } from './helpers/httpClient'
import { caesarDecrypt } from './helpers/caesarCipher'
import { cryptoDecrypt } from './helpers/cryptoCipher'
import { toastAlert } from './helpers/toastAlert'

function App() {
	const [fileNames, setFileNames] = useState([])
	const [file, setFile] = useState({})
	const [listImages, setListImages] = useState({ data: [] })
	const [screenLoading, setScreenLoading] = useState(true)
	const [btnLoading, setBtnLoading] = useState(false)

	useEffect(() => {
		;(async () => {
			try {
				const res = await httpClient('/uploads', 'GET', 'application/json')
				if (res) {
					setListImages(res.data)
					setTimeout(() => setScreenLoading(false), 2000)
				}
			} catch (e) {
				console.error(e)
			}
		})()
	}, [])

	const handleDrop = (acceptedFiles) =>
		setFileNames(
			acceptedFiles.map((file) => {
				if (file) setFile(file)
				return file.name
			})
		)
	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const formData = new FormData()
			formData.append('file', file)
			formData.append('type', 'image')

			const res = await httpClient('/uploads', 'POST', 'multipart/form-data', formData)
			setBtnLoading(true)
			if (res) {
				setTimeout(() => {
					toastAlert('success', res.data.stat_msg)
					setBtnLoading(false)
				}, 2000)
				setTimeout(() => window.location.reload(), 3000)
			}
		} catch (e) {
			console.error(e)
			if (axios.isAxiosError(e)) toastAlert('error', e.response.data.stat_msg)
			else toastAlert('error', e.message)
		}
	}

	return (
		<>
			<Alert />
			<div className="flex items-center justify-center p-10 mt-5 align-middle">
				<Card
					className="w-11/12 shadow-md"
					content={
						<div>
							<form className="p-5" onSubmit={handleSubmit}>
								<Dropzone onDrop={handleDrop}>
									{({ getRootProps, getInputProps }) => (
										<div {...getRootProps({ className: 'dropzone' })}>
											<input {...getInputProps()} />
											<p>Drag'n'drop files, or click to select files</p>
										</div>
									)}
								</Dropzone>
								<div>
									<strong>Filename:</strong>
									<ul className="list-none">
										{fileNames.map((fileName) => (
											<li key={fileName} className="text-xl font-semibold text-black">
												{fileName}
											</li>
										))}
									</ul>
								</div>

								<div className="flex items-center justify-center mt-10 align-middle">
									<button type="submit" className="w-11/12 p-3 text-lg text-white bg-blue-500 rounded-md">
										{btnLoading ? 'Uploads...' : 'Uploads'}
									</button>
								</div>
							</form>
						</div>
					}
				/>
			</div>
			{screenLoading ? (
				<div className="flex items-center justify-center w-11/12 p-5 align-middle">
					<h1 className="text-3xl font-semibold">Loading ...</h1>
				</div>
			) : (
				<div>
					<div className="flex items-center justify-center py-10 align-middle">
						<div className="z-10 w-6/12 p-5 rounded-md shadow-md">
							<span className="flex justify-center mx-5 font-sans text-5xl font-semibold text-gray-800">Image Gallery</span>
							<div className="grid h-auto grid-cols-3 gap-5 mt-10 space-y-5">
								{listImages && listImages.data.length > 0 ? (
									listImages.data.map((val) => (
										<>
											<Card className="w-8/12 shadow-md" content={<img width={512} height={512} key={val.id} src={caesarDecrypt(cryptoDecrypt(caesarDecrypt(val.link, 20)), 20)} alt="logo" />} />
										</>
									))
								) : (
									<Card className="w-8/12 shadow-md" content={<img width={512} height={512} src={<img width={512} height={512} src="https://logos-world.net/wp-content/uploads/2020/11/Nvidia-Symbol.jpg" alt="logo" />} alt="logo" />} />
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default App

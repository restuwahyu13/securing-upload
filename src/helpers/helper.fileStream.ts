import https from 'https'
import http from 'http'
import fs, { WriteStream, ReadStream } from 'fs'
import path from 'path'
import sharp, { Sharp } from 'sharp'
import os from 'os'

import { caesarEncrypt } from '@helpers/helper.caesarCipher'

export const fileStream = (url: string, pathname: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const checkProtocol: string = url.match(/(https|http)\b/i)[0]
    let chunkRes: any = ''

    if (checkProtocol == 'https') {
      https.get(url, (res: http.IncomingMessage): void => {
        const filename: string = path.basename(url)
        const extfile: string = path.extname(filename)
        let dirname: string = path.resolve(pathname, `${filename.split('.')[0]}.${extfile != '.pdf' ? 'webp' : 'pdf'}`)

        const wStream: WriteStream = fs.createWriteStream(dirname)
        const streamData: Sharp | WriteStream = extfile != '.pdf' ? sharp().webp({ quality: 75, effort: os.cpus().length / 2 }) : wStream

        if (extfile != '.pdf') {
          res
            .pipe(streamData)
            .on('data', (chunk: Buffer) => wStream.write(chunk))
            .on('end', () => {
              const rStream: ReadStream = fs.createReadStream(dirname, 'base64')
              rStream.on('data', (chunk: Buffer) => (chunkRes += chunk))
              rStream.on('end', () => {
                const base64Url: string = extfile != '.pdf' ? `data:image/webp;base64,${chunkRes}` : `data:application/pdf;base64,${chunkRes}`
                const rotateCode: string = caesarEncrypt(base64Url, 20)

                resolve(rotateCode)
                fs.unlink(dirname, (err: Error) => !err && console.info(`Deleted file ${filename} success`))
              })
            })
        } else {
          res.pipe(streamData).on('finish', () => {
            const rStream: ReadStream = fs.createReadStream(dirname, 'base64')
            rStream.on('data', (chunk: Buffer) => (chunkRes += chunk))
            rStream.on('end', () => {
              const base64Url: string = extfile != '.pdf' ? `data:image/webp;base64,${chunkRes}` : `data:application/pdf;base64,${chunkRes}`
              const rotateCode: string = caesarEncrypt(base64Url, 20)

              resolve(rotateCode)
              fs.unlink(dirname, (err: Error) => !err && console.info(`Deleted file ${filename} success`))
            })
          })
        }
      })
    } else {
      http.get(url, (res: http.IncomingMessage): void => {
        const filename: string = path.basename(url)
        const extfile: string = path.extname(filename)
        const dirname: string = path.resolve(pathname, `${filename.split('.')[0]}.${extfile != '.pdf' ? 'webp' : 'pdf'}`)

        const wStream: WriteStream = fs.createWriteStream(dirname)
        const streamData: Sharp | WriteStream = extfile != '.pdf' ? sharp().webp({ quality: 75, effort: os.cpus().length / 2 }) : wStream

        if (extfile != '.pdf') {
          res
            .pipe(streamData)
            .on('data', (chunk: Buffer) => wStream.write(chunk))
            .on('end', () => {
              const rStream: ReadStream = fs.createReadStream(dirname, 'base64')
              rStream.on('data', (chunk: Buffer) => (chunkRes += chunk))
              rStream.on('end', () => {
                const base64Url: string = extfile != '.pdf' ? `data:image/webp;base64,${chunkRes}` : `data:application/pdf;base64,${chunkRes}`
                const rotateCode: string = caesarEncrypt(base64Url, 20)

                resolve(rotateCode)
                fs.unlink(dirname, (err: Error) => !err && console.info(`Deleted file ${filename} success`))
              })
            })
        } else {
          res.pipe(streamData).on('finish', () => {
            const rStream: ReadStream = fs.createReadStream(dirname, 'base64')
            rStream.on('data', (chunk: Buffer) => (chunkRes += chunk))
            rStream.on('end', async () => {
              const base64Url: string = extfile != '.pdf' ? `data:image/webp;base64,${chunkRes}` : `data:application/pdf;base64,${chunkRes}`
              const rotateCode: string = caesarEncrypt(base64Url, 20)

              resolve(rotateCode)
              fs.unlink(dirname, (err: Error) => !err && console.info(`Deleted file ${filename} success`))
            })
          })
        }
      })
    }
  })
}

// fileStream - https://vos-abs.s3.ap-southeast-3.amazonaws.com/simple-voucher.png | https://vos-abs.s3.ap-southeast-3.amazonaws.com/RETAILORDER-ABO-R8772.pdf
// ;(async () => {
//   const res = await fileStream('https://vos-abs.s3.ap-southeast-3.amazonaws.com/simple-voucher.png', process.cwd())
//   console.log(caesarDecrypt(res, 20))
// })()

import { URL } from 'node:url'

import dotenv from 'dotenv'

dotenv.config()

export const PORT = parseInt(process.env['PORT'] ?? '8000', 10)
export const HOST = process.env['HOST'] ?? '0.0.0.0'
export const API_URL = process.env['API_URL'] ?? `http://${HOST}:${PORT}`
export const API_KEY = process.env['API_KEY'] ?? 'apiKeySecret'

export const SRC_URL = new URL('../', import.meta.url)
export const ROOT_URL = new URL('../', SRC_URL)
export const UPLOADS_URL = new URL('./uploads/', ROOT_URL)

export const SUPPORTED_IMAGE_MIMETYPE = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/gif'
]

/** in megabytes */
export const MAXIMUM_IMAGE_SIZE = 10

/** in megabytes */
export const MAXIMUM_FILE_SIZE = 100

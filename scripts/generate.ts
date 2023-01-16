import { execSync as exec } from 'child_process'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs-extra'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const message = fs.readJSONSync(resolve(__dirname, '../locales/en-US.json'))

function createDefaultMessage(obj: any): Record<string, any> {
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => {
    return [key, typeof value === 'string' ? ' ' : createDefaultMessage(value)]
  }))
}

const defaultMessagePath = resolve(__dirname, '../locales/DEFAULT.json')

fs.writeJSONSync(defaultMessagePath, createDefaultMessage(message))
exec('nuxi generate', { stdio: 'inherit' })
fs.removeSync(defaultMessagePath)

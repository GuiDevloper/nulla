import fs from 'fs'
import path from 'path'
import Messages from './messages'
export const messages = Messages

export function showExit(...message) {
  console.log(...message)
  process.exit(0)
}

const distFolder = '../dist'
export function copyFile(myFile, host) {
  const myPath = (file) => `${distFolder}/deployFiles/${host}/${file}`
  const thisPath = (other) => path.join(process.cwd(), other || '')

  if (!fs.existsSync(myFile)) {
    const newDir = myFile.substring(0, myFile.lastIndexOf('/'))
    fs.mkdirSync(path.join(distFolder, newDir), { recursive: true })
    fs.writeFileSync(myFile, '')
  }
  fs.copyFileSync(myPath(myFile), thisPath(myFile))
}

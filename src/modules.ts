import fs from 'fs'
import path from 'path'
export const distDir = path.resolve(__dirname, '../dist')

export function showExit(...message) {
  console.log(...message)
  process.exit(0)
}

export function copyFile(myFile, host) {
  const myPath = (file) => `${distDir}/deployFiles/${host}/${file}`
  const thisPath = (other) => path.join(process.cwd(), other || '')

  if (!fs.existsSync(myFile)) {
    const newDir = myFile.substring(0, myFile.lastIndexOf('/'))
    fs.mkdirSync(path.join(process.cwd(), newDir), { recursive: true })
    fs.writeFileSync(myFile, '')
  }
  fs.copyFileSync(myPath(myFile), thisPath(myFile))
}

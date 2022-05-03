import chalk from 'chalk'
import checkForUpdate from 'update-check'
import { getPkgManager } from '../create/helpers/get-pkg-manager'
import packageJson from '../../package.json'

export default async function notifyUpdate(): Promise<void> {
  try {
    const res = await checkForUpdate(packageJson).catch(() => null)
    if (res?.latest) {
      const pkgManager = getPkgManager()

      console.log()
      console.log(
        chalk.yellow.bold('A new version of `nulla` is available!')
      )
      console.log(
        'You can update by running: ' +
          chalk.cyan(
            pkgManager === 'yarn'
              ? 'yarn global add nulla'
              : `${pkgManager} install --global nulla`
          )
      )
      console.log()
    }
    process.exit()
  } catch {
    // ignore error
  }
}
#! /usr/bin/env node

import chalk from 'chalk'
import { program } from 'commander'
import notifyUpdate from './src/helpers/notifyUpdate'
import { version } from './package.json'
import Messages from './src/messages'
import NewCI from './src/new-ci'
import Create from './src/create'

async function run(): Promise<void> {
  NewCI(program)
  Create(program).then(notifyUpdate)
    .catch(async (reason) => {
      console.log()
      console.log('Aborting operation.')
      if (reason.command) {
        console.log(`  ${chalk.cyan(reason.command)} has failed.`)
      } else {
        console.log(chalk.red('Unexpected error. Please report it as a bug:'))
        console.log(reason)
      }
      console.log()
      await notifyUpdate()
      process.exit(1)
    })

  program
    .name("nulla")
    .addHelpCommand(false)
    .helpOption('-h, --help', 'Learn more about a specific command')
    .version(`${Messages.version} ${version}`, '-v, --version')
    .parse(process.argv)
}

run()

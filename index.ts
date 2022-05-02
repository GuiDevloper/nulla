#! /usr/bin/env node

import { program } from 'commander'
import { messages } from './src/modules'
import { version } from './package.json'
import NewCI from './src/new-ci'

NewCI(program)

program
  .name("nulla")
  .addHelpCommand(false)
  .helpOption('-h, --help', 'Learn more about a specific command')
  .version(`${messages.version} ${version}`, '-v, --version')
  .parse(process.argv)

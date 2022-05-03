/* eslint-disable import/no-extraneous-dependencies */
import chalk from 'chalk'
import type { program as Program } from 'commander'
import path from 'path'
import prompts from 'prompts'
import { createApp, DownloadError } from './create-app'
import { getPkgManager } from './helpers/get-pkg-manager'
import { validateNpmName } from './helpers/validate-pkg'

export default function(program: typeof Program): Promise<void> {
  return new Promise((resolve) => {
    const programName = `nulla create`
    function formatDescription(description) {
      return `\n\n    ${description}\n`
    }
    program
      .command('create')
      .description('Create a Nullstack app from template or example')
      .arguments('[project-directory]')
      .usage(`${chalk.green('<project-directory>')} [options]`)
      .action(create)
      .option(
        '--ts, --typescript',
        formatDescription('Initialize as a TypeScript project.')
      )
      .option(
        '--use-npm',
        formatDescription('Explicitly tell the CLI to bootstrap the app using npm')
      )
      .option(
        '--use-pnpm',
        formatDescription('Explicitly tell the CLI to bootstrap the app using pnpm')
      )
      .option(
        '-e, --example [name]|[github-url]',
        formatDescription(`An example to bootstrap the app with. You can use an example name
      from the official Nullstack repo or a GitHub URL. The URL can use
      any branch and/or subdirectory`)
      )
      .option(
        '--example-path <path-to-example>',
        formatDescription(`In a rare case, your GitHub URL might contain a branch name with
      a slash (e.g. bug/fix-1) and the path to the example (e.g. foo/bar).
      In this case, you must specify the path to the example separately:
      --example-path foo/bar`)
      )
      .allowUnknownOption()

    async function create(projectPath, args) {
      if (typeof projectPath === 'string') {
        projectPath = projectPath.trim()
      }

      if (!projectPath) {
        const res = await prompts({
          type: 'text',
          name: 'path',
          message: 'What is your project named?',
          initial: 'my-app',
          validate: (name) => {
            const validation = validateNpmName(path.basename(path.resolve(name)))
            if (validation.valid) {
              return true
            }
            return 'Invalid project name: ' + validation.problems![0]
          },
        })

        if (typeof res.path === 'string') {
          projectPath = res.path.trim()
        }
      }

      if (!projectPath) {
        console.log()
        console.log('Please specify the project directory:')
        console.log(
          `  ${chalk.cyan(programName)} ${chalk.green('<project-directory>')}`
        )
        console.log()
        console.log('For example:')
        console.log(`  ${chalk.cyan(programName)} ${chalk.green('my-app')}`)
        console.log()
        console.log(
          `Run ${chalk.cyan(`${programName} --help`)} to see all options.`
        )
        process.exit(1)
      }

      const resolvedProjectPath = path.resolve(projectPath)
      const projectName = path.basename(resolvedProjectPath)

      const { valid, problems } = validateNpmName(projectName)
      if (!valid) {
        console.error(
          `Could not create a project called ${chalk.red(
            `"${projectName}"`
          )} because of npm naming restrictions:`
        )

        problems!.forEach((p) => console.error(`    ${chalk.red.bold('*')} ${p}`))
        process.exit(1)
      }

      if (args.example === true) {
        console.error(
          'Please provide an example name or url, otherwise remove the example option.'
        )
        process.exit(1)
      }

      const packageManager = !!args.useNpm
        ? 'npm'
        : !!args.usePnpm
        ? 'pnpm'
        : getPkgManager()

      const example = typeof args.example === 'string' && args.example.trim()
      try {
        await createApp({
          appPath: resolvedProjectPath,
          packageManager,
          example: example && example !== 'default' ? example : undefined,
          examplePath: args.examplePath,
          typescript: args.typescript,
        })
      } catch (reason) {
        if (!(reason instanceof DownloadError)) {
          throw reason
        }

        const res = await prompts({
          type: 'confirm',
          name: 'builtin',
          message:
            `Could not download "${example}" because of a connectivity issue between your machine and GitHub.\n` +
            `Do you want to use the default template instead?`,
          initial: true,
        })
        if (!res.builtin) {
          throw reason
        }

        await createApp({
          appPath: resolvedProjectPath,
          packageManager,
          typescript: args.typescript,
        })
        resolve()
      }
    }
  })
}

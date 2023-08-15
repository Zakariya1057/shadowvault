import { Command } from 'commander'
import { Provider } from '@entities/provider'
import { setCommonOptions } from '@libs/commander/options/set-common-options'

describe('setCommonOptions', () => {
  let command: Command

  beforeEach(() => {
    command = new Command()
  })

  it('should set the --all option', () => {
    setCommonOptions(command)

    const allOptionDefined = command.options.some(
      (option) => option.flags === '-A, --all',
    )
    expect(allOptionDefined).toBe(true)
  })

  it('should set the common options and [files...] argument correctly', () => {
    const enhancedCommand = setCommonOptions(command)

    const options = enhancedCommand.options.map((opt) => opt.flags)
    const expectedOptions = [
      '-A, --all',
      '-n, --name <projectName>',
      '-s, --stage <stage>',
      '-p, --provider <type>',
    ]

    expectedOptions.forEach((expectedOption) => {
      expect(options).toContain(expectedOption)
    })

    // Ensure the command has the [files...] argument
    const args = (enhancedCommand as unknown as { _args: any[] })._args
    const hasFilesArgument = args.some((arg) => arg._name === 'files')
    expect(hasFilesArgument).toBe(true)
  })

  it('should set the --name option', () => {
    setCommonOptions(command)

    const nameOption = command.opts().name
    expect(nameOption).toBeUndefined() // Because it's an optional parameter and isn't given a default
  })

  it('should set the --stage option with default value', () => {
    setCommonOptions(command)

    const stageOption = command.opts().stage
    expect(stageOption).toBe('default')
  })

  it('should set the --provider option with default value of S3', () => {
    setCommonOptions(command)

    const providerOption = command.opts().provider
    expect(providerOption).toBe(Provider.S3)
  })
})

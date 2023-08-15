import { register } from '@providers/register'
import { setup } from '@libs/commander/setup'

async function main(): Promise<void> {
  await register()
  const program = await setup()
  program.parse()
}

main().catch((error) => {
  console.error('Initialization error:', error)
  process.exit(1)
})

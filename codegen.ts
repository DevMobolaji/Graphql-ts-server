import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './src/modules/**/typedefs/*.graphql',
  generates: {
    './src/modules/': {
      preset: 'graphql-modules',
      presetConfig: {
        baseTypesPath: '../generated-types/graphql.ts',
        filename: ''
      },
      plugins: [
        'typescript',
        'typescript-resolvers'
      ]
    }
  }
}
export default config

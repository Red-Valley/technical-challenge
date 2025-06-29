import { config } from '@repo/eslint-config/base'
import globals from 'globals'

export default [
	...config,
	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.jest
			},
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname
			}
		},
		rules: {
			'@typescript-eslint/interface-name-prefix': 'off',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_'
				}
			]
		}
	}
]

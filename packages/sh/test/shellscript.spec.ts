import prettier from 'prettier'
import ShPlugin from 'prettier-plugin-sh'

test('fatal parse error with meaningful message', () => {
  expect(() =>
    prettier.format(`echo )`, {
      filepath: 'broken.sh',
      parser: 'sh',
      plugins: [ShPlugin],
    }),
  ).toThrow('a command can only contain words and redirects')
})

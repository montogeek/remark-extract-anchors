const reduce = require('./reduceChildren')
describe('reduceChildren', () => {
  it('should return all texts', () => {
    const data = [
      {
        type: 'text',
        value: 'Install ',
        position: {
          start: { line: 10, column: 4, offset: 413 },
          end: { line: 10, column: 12, offset: 421 },
          indent: []
        }
      },
      {
        type: 'inlineCode',
        value: 'webpack',
        position: {
          start: { line: 10, column: 12, offset: 421 },
          end: { line: 10, column: 21, offset: 430 },
          indent: []
        }
      }
    ]
    expect(reduce(data)).toEqual(['Install ', 'webpack'])
  })

  it('should return all texts within inline code', () => {
    const data = [
      {
        type: 'inlineCode',
        value: 'json-loader',
        position: {
          start: { line: 12, column: 4, offset: 435 },
          end: { line: 12, column: 17, offset: 448 },
          indent: []
        }
      },
      {
        type: 'text',
        value: ' is not required anymore',
        position: {
          start: { line: 12, column: 17, offset: 448 },
          end: { line: 12, column: 41, offset: 472 },
          indent: []
        }
      }
    ]
    expect(reduce(data)).toEqual(['json-loader', ' is not required anymore'])
  })
})

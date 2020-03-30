const remark = require('remark')
const extractAnchors = require('.')
const fs = require('fs')
const path = require('path')

function readFile(filename) {
  return fs.readFileSync(
    path.resolve(__dirname, '../fixture/', filename),
    'utf-8'
  )
}

describe('Extract anchors', () => {
  it('should return headings', () => {
    let anchors = []

    remark()
      .use(extractAnchors, { anchors })
      .process(readFile('test.md'), function(err) {
        if (err) throw err
      })

    expect(anchors).toEqual([
      { title: 'Install', id: undefined, level: 2 },
      { title: 'FAQ', id: undefined, level: 2 }
    ])
  })
  it('should return heading with code', () => {
    let anchors = []

    remark()
      .use(extractAnchors, { anchors })
      .process(readFile('code-in-heading.md'), function(err, file) {
        if (err) throw err
      })
    expect(anchors).toEqual([
      {
        title: 'Install webpack',
        id: undefined,
        level: 2
      },
      {
        title: 'json-loader is not required anymore',
        id: undefined,
        level: 2
      }
    ])
  })
})

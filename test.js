process.env.NODE_ENV = 'test'

const assert = require('assert')
const ArcheHTML = require('./ArcheHTML.js')

async function test_0() {
  const archeHtml1 = new ArcheHTML(`${__dirname}/test-react/Root1.js`)
  assert(archeHtml1.rootImport)
  assert.equal(archeHtml1.scriptImports.length, 0)

  const archeHtml2 = new ArcheHTML(`${__dirname}/test-react/Root2.js`, {
    scriptImports: [],
  })
  assert(archeHtml1.rootImport)
  assert.equal(archeHtml1.scriptImports.length, 0)
}

async function test_1() {
  const archeHtml = new ArcheHTML(`${__dirname}/test-react/Root1.js`, {
    scriptImports: [
      `${__dirname}/test-react/script1.js`,
    ],
  })

  const html = await archeHtml.render("/", {
    global: {
      a: 1,
      b: 'a',
      c: [1, 2, 3],
      d: { a: 1 }
    },
  })

  assert.equal(html, `
<div><h1>Test</h1><p>s1v1</p><p>1</p><p>a</p><p>[1, 2, 3]</p><p>{"a":1}</p></div>
  `.trim())
}

async function test_2() {
  const archeHtml = new ArcheHTML(`${__dirname}/test-react/Root2.js`, {
    scriptImports: [
      `${__dirname}/test-react/script2.js`,
    ],
  })

  const html = await archeHtml.render("/")

  assert.equal(html, `
<div class="outer-div" style="color: blue; background-color: black;" bool><div class="inner-div">1</div><div><p>dangerously-set</p></div></div>
  `.trim())
}

setImmediate(async () => {
  await test_0()
  await test_1()
  await test_2()
  console.log('success')
})

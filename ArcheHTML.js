/**
 * Arche HTML Server may be freely distributed under the CFOSS license.
 */

const { execFile } = require('child_process')

/**
 * @name ArcheHTML
 *
 * @docs
 * ```coffeescript [specscript]
 * new ArcheHTML(rootImport string, options {
 *   scriptImports: Array<string>,
 * }) -> ArcheHTML
 * ```
 */
class ArcheHTML {
  constructor(rootImport, options = {}) {
    this.rootImport = rootImport
    this.scriptImports = options.scriptImports ?? []
  }

  /**
   * @name render
   *
   * @docs
   * ```coffeescript [specscript]
   * render(url string) -> html Promise<string>
   *
   * render(url string, options {
   *   global: <Object<string|number|Array|Object>>,
   * }) -> html Promise<string>
   * ```
   */
  async render(url, options = {}) {
    const { global = {} } = options

    const html = await new Promise(resolve => {
      let output = ''
      const cmd = execFile('node', [`${__dirname}/logRootHtml.mjs`], {
        env: {
          ...process.env,
          URL: url,
          GLOBAL: JSON.stringify(global),
          ROOT_IMPORT: this.rootImport,
          SCRIPT_IMPORTS: JSON.stringify(this.scriptImports),
        },
      })
      cmd.stdin.write(JSON.stringify({ global, url }))
      cmd.stdin.end()
      cmd.stdout.on('data', buf => {
        output += buf.toString('utf8')
      })
      cmd.stderr.pipe(process.stderr)
      cmd.on('close', code => {
        resolve(output)
      })
    })

    return html
  }
}

module.exports = ArcheHTML

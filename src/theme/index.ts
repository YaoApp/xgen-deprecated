import fs from 'fs'
import lessToJs from 'less-vars-to-js'
import path from 'path'

export default lessToJs(fs.readFileSync(path.join(__dirname, `./theme.less`), 'utf8'))

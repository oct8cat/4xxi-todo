import _ from 'lodash'
import express from 'express'
import {join as j} from 'path'

import {router} from '../lib/webapp'

export var defaults = {
    'port': process.env.PORT || 3000,
    'view engine': 'jade',
    'views': j(__dirname, '..', 'lib', 'webapp', 'views')
}

export function run (opts, cb) {
    if (_.isFunction(opts)) { cb = opts; opts = {} }
    opts = _.extend(_.clone(defaults), opts)
    let app = express()
    for (let opt in opts) { app.set(opt, opts[opt]) }
    app.use(express.static(j(__dirname, '..', 'lib', 'webapp', 'public')))
    app.use(router)
    app.listen(app.get('port'), () => { cb(null, app) })
}

if (require.main === module) {
    run((err, app) => { console.log(`Now running on ${app.get('port')}`) })
}

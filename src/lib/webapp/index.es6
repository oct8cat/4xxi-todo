import express from 'express'

export var router = express.Router()
    .get('/', (req, res, next) => { res.render('index') })

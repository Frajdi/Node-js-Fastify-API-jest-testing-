const fastify = require('fastify')
const {itemRoute} = require('./routes/item')
const fastifySwagger = require('@fastify/swagger')
const fastifyPostgres = require('@fastify/postgres')
const{itemRoute_v2} = require('../src/routes/v2/items')

const build =(opts={}, optsSwagger={}, optsPostgres={})=>{
    const app = fastify(opts)
    app.register(fastifyPostgres, optsPostgres)
    app.register(fastifySwagger, optsSwagger)
    app.register(itemRoute, {prefix: '/v1'})
    app.register(itemRoute_v2, {prefix: '/v2'})

    return app
}

module.exports = {build}
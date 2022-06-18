let {items} = require('../items')
const {getItemsOpts, getItemOpts, postItemOpts, deleteItemOpts, editItemOpts} = require('../schemas/item')


const itemRoute = (fastify, options, done) => {

    fastify.get('/items',getItemsOpts, function(request, reply){
        reply.send(items)
    })

    fastify.get('/items/:id',getItemOpts, function(request, reply){
        const {id} = request.params
        const item = items.filter(item => item.id === id)
        reply.send(item[0])
    })

    fastify.post('/items',postItemOpts, function(request, reply){
        const {name, description} = request.body
        const item = {id : String(items.length + 1), name, description}
        items.push(item)
        reply.code(201).send(item)
    })

    fastify.delete('/items/:id', deleteItemOpts, function(request, reply){
        const {id} = request.params
        items = items.filter((element) => element.id !== id)
        reply.send(`Deleted item with id: ${id}`)
    })

    fastify.put('/items/:id', editItemOpts, function(request, reply){
        const {id} = request.params
        const {name, description} = request.body
        const item = items.find(item => item.id === id )
        item.name = name
        item.description = description
        reply.send(item)
    })


    done()
}

module.exports = {itemRoute}
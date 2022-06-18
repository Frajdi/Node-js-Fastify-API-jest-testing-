const {getItemsOpts, getItemOpts, postItemOptsv2, deleteItemOpts, editItemOptsv2} = require('../../schemas/item')

const vatCalculator = require('../../utils/vatCalculator')



const itemRoute_v2 = async(fastify, options, done)=> {

    fastify.get('/',getItemsOpts, async (request, reply) => {
        try {
            const client = await fastify.pg.connect();
            const {rows} = await fastify.pg.query("SELECT * FROM items")
            reply.send(rows)
        }catch (err){
            reply.send(err)
        }
    })

    fastify.get('/:id',getItemOpts, async (request, reply) => {
        try{
            const {id} = request.params
            const {rows} = await fastify.pg.query("SELECT * FROM items WHERE id=$1", [id])
            reply.send(rows[0])
        }catch(err){
            reply.send(err)
        }
    })

    fastify.put('/:id',editItemOptsv2, async(request, reply) => {
        try{
            const {id} = request.params
            const {name, description, gross_amount} = request.body

            const netAmount = vatCalculator.calculateNetAmount(gross_amount)
            const vatAmount = vatCalculator.calculateVAT(netAmount)


            const {rows} = await fastify.pg.query("UPDATE items SET name=$1, description=$2, gross_amount=$3 ,net_amount = $4, excluded_vat_amount = $5  WHERE id=$6 RETURNING *" , 
            [name, description, gross_amount, netAmount, vatAmount, id])
            
            reply.send(rows[0])
        }catch(err){
            reply.send(err)
        }
    })

    fastify.delete('/:id',deleteItemOpts, async(request, reply) => {
        try{
            const {id} = request.params
            const {rows} = await fastify.pg.query("DELETE FROM items WHERE id = $1", [id])
            reply.send(`Item with id: ${id} has been deleted`)
        }catch(err){
            reply.send(err)
        }
    })

    fastify.post('/',postItemOptsv2, async (request, reply) => {
        try{
            const client = await fastify.pg.connect();
            const {name, description, gross_amount} = request.body

            const netAmount = vatCalculator.calculateNetAmount(gross_amount)
            const vatAmount = vatCalculator.calculateVAT(netAmount)

            const {rows} = await fastify.pg.query("INSERT INTO items (name, description, gross_amount, net_amount, excluded_vat_amount) VALUES ($1, $2, $3, $4, $5) RETURNING *",
             [name, description, gross_amount, netAmount, vatAmount]);

            reply.code(201).send(rows[0])
        }catch(err){
            reply.send(err)
        }finally{
            client.release();
        }
    })

    done()
}

module.exports = {itemRoute_v2}
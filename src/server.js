const {build} = require('./app')
const env = require('./config/env')

const app = build({logger : true}, 
    {
        exposeRoute: true, 
        routePrefix: '/docs', 
        swagger:
        {
            info: {title: "Fastify API", version:"1.0.0"}
        }
    },{
        connectionString: env.POSTGRES_DB_CONNECTION_STRING
    });

    app.get('/time', (req, reply) => {
        app.pg.connect(onConnect)

        function onConnect (err, client, release) {
            if(err) return reply.send(err)

            client.query(
                'SELECT now()',
                function onResult (err, result) {
                    release()
                    reply.send(err || result.rows[0])
                }
            )
        }
    })


app.listen(env.WEB_APP_HOST_PORT,'0.0.0.0', function(error, adress){
    if(error){
        app.log.error(error)
        process.exit(1)
    }
},)
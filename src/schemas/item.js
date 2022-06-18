

const item = {
    type: 'object',
    properties: {
        id : {
            type: 'integer'
        },
        name: {
            type: 'string'
        },
        description: {
            type : 'string'
        }
    }
}

const itemv2 = {
    type: 'object',
    properties: {
        id : {
            type: 'integer'
        },
        name: {
            type: 'string'
        },
        description: {
            type : 'string'
        },
        gross_amount: {
            type: 'number'
        },
    }
}


const getItemsOpts = {
    schema:{
        response:{
            200:{
                type: 'array',
                items: itemv2
            }
        }
    }
}

const getItemOpts = {
    schema: {
        response: {
            200: itemv2
        }
    }
}

const postItemOpts = {
    schema: {
        body: {
            type: 'object',
            required:['name', 'description'],
            properties: {
                name: {
                    type: 'string',
                },
                description: {
                    type: 'string'
                } 
            }
        },
        response: {
            201: item
        }
    }
}

const deleteItemOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: {type: 'string'}
                }
            }
        }
    }
}

const editItemOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                },
                description: {
                    type: 'string'
                }
            }
        },
        response: {
            201: item
        }
    }
}




const postItemOptsv2 = {
    schema: {
        body: {
            type: 'object',
            required:['name', 'description', 'gross_amount'],
            properties: {
                name: {
                    type: 'string',
                },
                description: {
                    type: 'string'
                },
                gross_amount: {
                    type: 'number'
                }
            }
        },
        response: {
            200: itemv2
        }
    }
}

const editItemOptsv2 = {
    schema: {
        body: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                },
                description: {
                    type: 'string'
                },
                gross_amount: {
                    type: 'number'
                }
            }
        },
        response: {
            201: itemv2
        }
    }
}



module.exports = {getItemsOpts, getItemOpts, postItemOpts, deleteItemOpts, editItemOpts, postItemOptsv2, editItemOptsv2}
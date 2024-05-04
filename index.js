const express = require('express')
const app = express() 
const port = 3000
const uuid = require('uuid')
app.use(express.json())

const orders = []


const checkUserId = (request, response, next) =>{
    const { id } = request.params
    const  index = orders.findIndex(user => user.id === id)
    
    if ( index < 0) {
        return response.status(404).json({error: "User not foud"})
    }
    request.userIndex = index
    request.userId = id

    next()
}

app.get('/orders/:id',checkUserId, (request, response) => {

    const {order, clientName, price, status } = request.body
    const index =  request.userIndex
    const id = request.userId
    const aOrders = {id, order, clientName, price, status }

    orders[index] = aOrders
  
    return response.json(aOrders)
    
})

app.get('/orders', (request, response) => {

    return response.json(orders)
})

app.post('/orders', (request, response) => {
    const { order, clientName, price } = request.body

    const user = { id: uuid.v4(), order, clientName, price, status:'Em preparação' ,}

    orders.push(user)

    return response.status(201).json(user)
})

app.put('/orders/:id',checkUserId, (request, response) => {
    
    const {order, clientName, price, status } = request.body
    const index =  request.userIndex
    const id = request.userId
    const updateOrders = {id, order, clientName, price, status }

    orders[index] = updateOrders
  
    return response.json(updateOrders)
})

app.delete('/orders/:id',checkUserId, (request, response) => {
    const index =  request.userIndex

    orders.splice(index,1)

    return response.status(204).json()
})



app.listen(port, () => {
    console.log('server started on port 3000 ${port}')
})


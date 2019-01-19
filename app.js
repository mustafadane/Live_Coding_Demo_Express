const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/pokemons', require('./routes/pokemons'))


//error handlers

app.use((error, req, res, next) => {
    console.log(error.status)
    if(error.status === 404) {
        res.send('Pokemon not found')
    } else {
        res.send(error.message)
    }
})

app.listen(3000, () => {
    console.log('Server started')
})

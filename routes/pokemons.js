const router = require('express').Router()
let pokemons = require('pokemons').results

router.get('/', (req, res, next) => {
    try {
        res.send(pokemons)
    } catch(err) {
        next(err)
    }
})

router.get('/:id', (req, res, next)  => {
    try {
        const pokemon = pokemons.filter(pokemon => {
            return pokemon.national_number === req.params.id
        })
        if(pokemon.length) {
            res.send(pokemon[0])
        } else {
            const err = new Error('No Pokemon Found')
            err.status = 404
            // next(err)
            throw err
        }
    } catch (err) {
        console.log('err.message', err.message)
        next(err)
    }
})

router.post('/', (req, res, next) => {
    try {
        const { name, national_number } = req.body
        if(!name || !national_number) {
            throw new Error('Name and national number is required')
        }
        const pokemon = {name, national_number}
        pokemons.push(pokemon)
        res.send(pokemon)
    } catch (error) {
     next(error)
    }
})

router.put('/:id', (req, res, next) => {
    try {
        let updated
        pokemons = pokemons.map(pokemon => {
            if(pokemon.national_number === req.params.id) {
                updated = Object.assign(pokemon, {name: req.body.name})
                return updated
            } else {
                return pokemon
            }
        })
        res.send(updated)
    } catch (error) {
        next(err)
    }
})

router.delete('/:id', (req, res, next) => {
    try {
        let deletedName
        pokemons = pokemons.filter(pokemon => {
            if(pokemon.national_number === req.params.id) {
                deletedName = pokemon.name
            }
            return pokemon.national_number !== req.params.id
        })
        res.send(`Pokemon ${deletedName} is succesfully deleted`)
    } catch (error) {
        next(error)
    }
})




module.exports = router

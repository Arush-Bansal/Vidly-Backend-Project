const Express = require('express')
const app = Express()

app.use(Express.json()); // why my post commands can't work without this line
app.use((req, res, next) => {
    console.log("middleware1");
    next()
})
app.use((req, res, next) => {
    console.log("middleware2");
    next()
})


let genres = [
    'horror',
    'action',
    'thriller'
];

// post requests
app.post('/api/genres', (req, res) => {
    const genre = req.body.name
    genres.push(genre)
    res.json(genres)
})
// doubt => why can't I just use JSON.parse in req.body.name instead of using the Express.json middleware.

// get requests
app.get('/api/genres', (req, res) => {
    res.send(genres);
    res.end();
})
app.get('/api/genres/:id', (req, res) => {
    // res.send(genres[req.params.id]);
    res.send(req.params.id);
    res.end();
    console.log(`request recieved on id ${req.params.id}`)
})

// delete request
app.delete('/api/genres/:id', (req, res) => {
    // res.send(req.params.id)
    if (genres.includes(req.params.id)) {
        genres.splice(genres.indexOf(req.params.id), 1);
        res.send(genres);
    }
    else res.status(404).send(genres);
})

// update request
app.put('/api/genres/:id', (req, res) => {
    if (genres.length > req.params.id) {
        genres[req.params.id] = req.body.name
        res.send(genres)
    }
    else res.status(404).json(genres)

})

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
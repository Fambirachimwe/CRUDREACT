const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const server = require('http').Server(app);
const NameModel = require('./Models')
const io = require('socket.io')(server);


//  middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*'); // the * allows all site to access the
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATHCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


// mongodb connection 
mongoose.connect('mongodb://localhost:27017/crudreact', {useNewUrlParser: true, useUnifiedTopology: true});

// listengin for an open even when the connection has been set
mongoose.connection.once('open', () => {
    console.log('connected');
}).on('error', (error) => {
    console.log('connection error ', error);
});


/// routes



app.get('/names', (req, res, next) => {
    NameModel.find()
    .exec()
    .then(result => {
        // console.log(result);  array with objects
        
        if(result.length > 0){
            res.status(200).json(result)
        } else{
            res.status(200).json([])
        }
    })
});



app.post('/names', (req, res, next) => {
    const newName = new NameModel({
        name: req.body.name.name
    }).save().then(response => {
        res.status(200).json({
            message: 'new name added', response
        });

        io.on('connection', (socket) => {
            socket.on('dbchange', (payload) =>{
                // console.log(payload)
                socket.emit('change', {payload});
                
            }); 
        });
    });

    
});


app.delete('/names/:id', (req, res, next) =>{
    const id = req.params.id;
    NameModel.findOneAndDelete({_id: id})
    .exec()
    .then(data => {
        res.status(200).json({ data })
    })
});




server.listen(4000, () =>{
    console.log('server running at port 4000');
});



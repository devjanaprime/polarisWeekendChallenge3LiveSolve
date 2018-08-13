// requires
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const tasks = require( './modules/routers/tasks' );
// uses
app.use( express.static( 'server/public' ) );
app.use( bodyParser.json() ); // NG
app.use( bodyParser.urlencoded( { extended: true } ) ); // JQ
app.use( '/tasks', tasks );
// db setup
const mongoURI = 'mongodb://localhost:27017/polarisTasks';
mongoose.connect( mongoURI, ( { useNewUrlParser: true } ) );

mongoose.connection.on( 'open', ()=>{
    console.log( 'connected to Mongo' );
}) // end ongoose connection OK

mongoose.connection.on( 'error', ( err )=>{
    console.log( 'not connected to Mongo:', err );
}) // end ongoose connection OK

// globals
const port = process.env.PORT || 5000;
// server up
app.listen( port, ()=>{
    console.log( 'server up on:', port );
}) // end server up
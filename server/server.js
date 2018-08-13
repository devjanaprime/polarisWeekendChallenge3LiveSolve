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
// globals
const port = process.env.PORT || 5000;
// server up
app.listen( port, ()=>{
    console.log( 'server up on:', port );
}) // end server up
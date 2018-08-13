// requires
const express = require( 'express' );
const router = express.Router();
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const taskSchema = new Schema({
    name: { type: String },
    complete: { type: Boolean }
}) //end Schema
const Task = mongoose.model( 'Tasks', taskSchema );

// Create
router.post( '/', ( req, res )=>{
    console.log( 'in POST:', req.body );
    // write to database
    const taskToAdd = new Task( req.body );
    taskToAdd.save().then( ()=>{
        console.log( 'task saved' );
        res.sendStatus( 200 );
    }).catch( ( err )=>{
        console.log( 'error saving task:', err );
        res.sendStatus( 500 );
    }) //end save
}) // end POST

// Read
router.get( '/', ( req, res )=>{
    console.log( 'in GET hit' );
    // get all tasks from db
    Task.find( {} ).then( ( results )=>{
        res.send( results );
    }).catch( ( err )=>{
        console.log( 'error retrieving tasks:', err );
        res.sendStatus( 500 );
    })
}) // end GET

// Update
router.put( '/', ( req, res )=>{
    console.log( 'updating:', req.body );
    Task.findOne( { _id: req.body._id } ).then( ( result )=>{
        console.log( 'task found:', result );
        result.complete = !result.complete;
        result.save().then( ()=>{
            console.log( 'updated task:' );
            res.sendStatus( 200 );
        }).catch( ( err )=>{
            console.log( 'error saving updated task:', err );
            res.sendStatus( 500 );
        }) // end save
        res.sendStatus( 200 );
    }).catch( ( err )=>{
        console.log( 'error finding task' );
        res.sendStatus( 500 );
    }) // end find
}) // end PUT

// Delete
router.delete( '/', ( req, res )=>{
    console.log( 'deleting:', req.query );
    Task.findByIdAndRemove( req.query.id, ()=>{
        // remove from db
        console.log( 'task deleted' );
        res.sendStatus( 200 );
    }).catch( ( err )=>{
        console.log( 'error removing task:', err );
        res.sendStatus( 500 );
    }) //end remove
}) // end delete

// exports
module.exports = router;
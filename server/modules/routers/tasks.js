// requires
const express = require( 'express' );
const router = express.Router();

/// - test before db - ///
let tasks = [];

// Create
router.post( '/', ( req, res )=>{
    console.log( 'in POST:', req.body );
    tasks.push( req.body );
    res.send( 'roar' );
}) // end POST
// Read
router.get( '/', ( req, res )=>{
    console.log( 'in GET hit' );
    res.send( tasks );
}) // end GET

// Update
router.put( '/', ( req, res )=>{
    console.log( 'updating:', req.body );
    res.send( 'purrrrrrrrrrrrrrrrr' );
}) // end PUT

// Delete
router.delete( '/', ( req, res )=>{
    console.log( 'deleting:', req.query );
    res.send( 'kacaw' );
}) // end delete

// exports
module.exports = router;
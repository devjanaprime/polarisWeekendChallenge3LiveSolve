// requires
const express = require( 'express' );
const router = express.Router();

// Create

// Read
router.get( '/', ( req, res )=>{
    console.log( 'in GET hit' );
    res.send( 'sqeak' );
}) // end GET

// Update

// Delete

// exports
module.exports = router;
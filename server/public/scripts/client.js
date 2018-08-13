const myApp = angular.module( 'myApp', [] );

myApp.controller( 'TasksController', function( $http ){
    const vm = this;
    vm.tasks = [];

    vm.addTask = function(){
        console.log( 'adding task:', vm.nameIn );
        let objectToSend = {
            name: vm.nameIn,
            complete: false
        } // end objectToSend
        console.log( 'sending:', objectToSend );
        // $http POST call to /tasks with this data
        $http({
            method: 'POST',
            url: '/tasks',
            data: objectToSend
        }).then( function( response ){
            console.log( 'back from server with:', response );
            // update DOM
            vm.getTasks();
            // clear inputs
            vm.nameIn = '';
        }).catch( function( err ){
            alert( 'could not add task' );
            console.log( 'error adding task:', err );
        }) // end $http
    } // end addTask

    vm.deleteTask = function( index ){
        console.log( 'deleting task:', vm.tasks[ index ] );
        $http({
            method: 'DELETE',
            url: '/tasks?id=' + index
        }).then( function( response ){
            console.log( 'back from server with:', response );
            vm.getTasks();
        }).catch( function( err ){
            console.log( 'error deleting task:', err );
            alert( 'problem!' );
        }) // end $http
    } // end deleteTask

    vm.getTasks = function(){
        $http({
            method: 'GET',
            url: '/tasks'
        }).then( function ( response ){
            console.log( 'back from server:', response.data );
            vm.tasks = response.data;
        }).catch( function( err ){
            console.log( 'error getting tasks:', err );
            alert( 'unable to retrieve tasks' );
        }) // end $http
    } // end getTasks

    vm.toggleTask = function( index ){
        console.log( 'in toggleTask:', vm.tasks[ index ] );
        /// - test toggle - ///
        vm.tasks[ index ].complete = !vm.tasks[ index ].complete;
        console.log( 'updated:', vm.tasks[ index ] );
        /// - end test - ///
        // $http call to toggle
        $http({
            method: 'PUT',
            url: '/tasks',
            data: vm.tasks[ index ]
        }).then( function( response ){
            console.log( 'back from server with:', response );
            vm.getTasks();
        }).catch( function ( err ){
            console.log( 'error updating task:', err );
        }) // end $http
    } // end task click

    //init
    vm.getTasks();
}) // end TasksController
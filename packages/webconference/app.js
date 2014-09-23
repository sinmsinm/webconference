'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Webconference = new Module('webconference');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Webconference.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Webconference.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Webconference.menus.add({
    title: 'Conference Rooms',
    link: 'all conference rooms',
    roles: ['authenticated'],
    menu: 'main'
  });
    
  Webconference.menus.add({
    title: 'Create a room',
    link: 'create conference room',
    roles: ['authenticated'],
  });

  Webconference.aggregateAsset('js', '../lib/RTCMultiConnection-v2.0/index.js', {
        absolute: false
    });
  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Webconference.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Webconference.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Webconference.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Webconference;
});

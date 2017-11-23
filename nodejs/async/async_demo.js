#!/usr/bin/env node

var async = require('async');
var redis = require('redis');

var client = redis.createClient();

var details = [ { address: 'address1' }, { address: "address2" } ];

// No using async npm
var helloNoAsync = function() {
  for( var i in details ) {
    item = details[i];
    console.log(item.address);
    client.hget("exchange:mapping", item.address, function(err, reply){
      console.log("Reply: " + reply);
    });
    console.log("once over.");
  }
}

// Using async npm
var helloAsync = function() {
  async.eachSeries(details, function(item, callback){
    console.log(item.address);
    client.hget("exchange:mapping", item.address, function(err, reply){
      console.log("Reply: " + reply);
      callback(err, reply);
    });
    console.log("once over.");
  });
}

helloNoAsync();
console.log("----------------- Split --------------------");
helloAsync();

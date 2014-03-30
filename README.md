delayed-workers-tutorial
========================


###Using creating delayed jobs with node and heroku with RabbitMQ.


Scaling a node app properly means understanding its greatest limitation: blocking tasks. Consider the lifecycle of a typical express app.

1. take request object
2. extract necessary values
3. perform transfomation/storage/retrieval of data
4. send out a response

\#3 could include taking a user id, retrieving a resource from the database and/or storing from data into a database record. What about blocking tasks such as converting an image or performing some complex transformation that we don't need to send the result of directly back to the user?  In an ideal world, the amount of time between request and response should be under 500 milliseconds. 

Node itself deals with blocking tasks by having asynchronous functions. 

```
fs = require('fs');
fs.readFile('', 'utf8, function(err, contents) {
	console.log(contents);
});

```


Under the hood, Node stores an 'event' in a [priority queue](http://en.wikipedia.org/wiki/Priority_queue). File i/o access is a potential blocking event so the Event is registered in a queue to be run later. when the current code path meets its end, the event queue goes on to the next task which is has a an associated callback. This approach works surprisingly well for io bound 


For tasks in which we don't need to include the result of the blocking computations in the response, We can take care of these tasks asynchronously using an event queue like RabbitMQ. 

Async Fragments Demo using Marko
===========================

To run locally:

```bash
npm install
node server.js
```

You can also check out the live demo of this app on Heroku:
https://marko-progressive-rendering.herokuapp.com/

Progressive HTML rendering is a technique that improves the performance of websites that involves sending an HTTP response for an HTML page in multiple chunks. This improves both the actual load time, as well as the perceived load time. In this demo Node.js app we apply this technique using [Marko Templates](https://github.com/raptorjs/marko) (an asynchronous and streaming templating engine) and Node.js. In addition, we illustrate an advanced technique of flushing HTML chunks out-of-order and using JavaScript on the client-side to move fragments into the proper order in the DOM.

Learn more about Marko on GitHub:
[github.com/raptorjs/marko](https://github.com/raptorjs/marko)

More reading:
[StrongLoop Blog: Bypassing Express View Rendering for Speed and Modularity](http://strongloop.com/strongblog/bypassing-express-view-rendering-for-speed-and-modularity/)

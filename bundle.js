navigator.getMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);

navigator.getMedia (
   // constraints
   {
      video: true,
      audio: false
   },

   // successCallback
   function(localMediaStream) {
      var video = document.querySelector('video');
      var canvas = document.querySelector('#in');
      var context = canvas.getContext('2d');

      video.src = window.URL.createObjectURL(localMediaStream);

      setInterval(function() {
        canvas.width = video.videoWidth/2;
        canvas.height = video.videoHeight/2
        context.drawImage(video, 0,0, canvas.width, canvas.height);
      }, 1000/24);

      video.play();
   },

   // errorCallback
   function(err) {
    console.log("The following error occured: " + err);
   }
);

$(function() {
  var gif = new GIF({
    workers: 4,
    workerScript: '/lib/gif.worker.js',
    width: 320,
    height: 240
  });

  $('button#reset', function() {
    var gif = new GIF({
      workers: 4,
      workerScript: '/lib/gif.worker.js',
      width: 320,
      height: 240
    });
  });

  var canvas = $('canvas')[0];
  var capture = function() {
    console.log('captured');
    gif.addFrame(canvas, { copy: true });
  };

  gif.on('start', function() {
    console.log('starting');
  });

  gif.on('progress', function(p) {
    console.log(p);
  });

  gif.on('finished', function(blob) {
    img = $('img');
    img.attr('src', URL.createObjectURL(blob));
  });

  $('button#1sec').click(function() {
    var start = function() {
      var interval = setInterval(capture, 250);
      setTimeout(function() {
        clearInterval(interval);
        console.log('cleared');
        gif.running = false;
        gif.render();
      }, 2500);
    };
    start();
  });

  $('button#take').click(function() {
    capture();
    gif.running = false;
    gif.render();
  });
});

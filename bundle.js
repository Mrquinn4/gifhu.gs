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
      video.src = window.URL.createObjectURL(localMediaStream);
      video.onloadedmetadata = function(e) {
      };
      video.play();
   },

   // errorCallback
   function(err) {
    console.log("The following error occured: " + err);
   }
);

$(function() {

  $('button').click(function() {
    
    var gif = new GIF({
      workers: 4,
      workerScript: '/lib/gif.worker.js',
      width: 300,
      height: 200
    });

    var video = $('video')[0];

    var capture = function() {
      console.log('captured');
      gif.addFrame(video, { copy: true });
    };

    var start = function() {
      var interval = setInterval(capture, 100);
      setTimeout(function() {
        clearInterval(interval);
        console.log('cleared');
        gif.render();
      }, 1000);
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

    start();
  });
});

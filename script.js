$(document).ready(function() {

    /*
    * init canvas
    */
    var canvas = $('#tutorial');
    var ctx = $('#tutorial');

    var w = $(window).width();
    var h = $(window).height();

    canvas.css('width', w + 'px');
    canvas.css('height', h + 'px');

    /*
    * music player
    */
    var audioPlayer = $('#audioPlayer');
    var audioSource = new SoundCloudAudioSource('audioPlayer');
    $(".play-btn").on('click', function() {
        var btn = $(this);

        if (btn.data('playing') == 0) {
            playMusic();
            btn.data('playing', 1)
        } else {
            btn.data('playing', 0)
            audioPlayer.trigger('pause');
            mMusic = null;
        }
    });

    var vs = document.getElementById("visualizer");
    var vsctx = vs.getContext('2d');
    var vscanvas = new fabric.Canvas('visualizer');
    var mMusic = null;
    function playMusic() {
        audioSource.playStream('audio/audio1.mp3');
        mMusic = setInterval(function(){
            vscanvas.clear();
            var val = audioSource.streamData;
            for (var i = 0; i < 3; i++) {
                var barHeight = (100-((val[i]/256)*100)) *2;
                if (barHeight < 2) {
                    barHeight = Math.floor((Math.random() * 8) + 3);
                }
                var rect = new fabric.Rect({
                    left: (i*10) + 35,
                    top: 45,
                    fill: getRandomColor(),
                    width: 10,
                    height: barHeight
                });
                vscanvas.add(rect);
            }
        }, 500)
    }
});

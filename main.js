(function(){
    'use strict';


    let timer = document.getElementById('timer');
    let start = document.getElementById('start');
    let stop = document.getElementById('stop');
    let reset = document.getElementById('reset');
    let startTime;
    let elapsedTime = 0;
    let timerId;
    let timeToadd = 0;
    
    function updateTimetText(){
        let m = Math.floor(elapsedTime / 60000);
        let s = Math.floor(elapsedTime % 60000 / 1000);
        let ms = elapsedTime % 1000;
        m = ('0' + m).slice(-2); 
        s = ('0' + s).slice(-2);
        ms = ('0' + ms).slice(-2);
        timer.textContent = m + ':' + s + ':' + ms;
    }
    
    function countUp(){
        timerId = setTimeout(function(){
            elapsedTime = Date.now() - startTime + timeToadd;
            updateTimetText()
            countUp();
        },10);
    }

    start.addEventListener('click',function(){
        startTime = Date.now();
        countUp();
        start.disabled = true;
        reset.disabled = true;
        stop.disabled = false;
    });

    stop.addEventListener('click',function(){
       clearTimeout(timerId);
       timeToadd += Date.now() - startTime;
       stop.disabled = true;
       reset.disabled = false;
       start.disabled = false;
    });

    reset.addEventListener('click',function(){
        elapsedTime = 0;
        timeToadd = 0;
        reset.disabled = true;
        start.disabled = false;
        updateTimetText();
    });
})();


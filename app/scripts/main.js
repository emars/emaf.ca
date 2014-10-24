var builder;
var Tweens = ISOMERBUILDER.Tweens;
var outExpo = Tweens.outExpo;
var linear = Tweens.linear;
var linearFB = Tweens.linearFB;
var animateNav = true;
$(document).ready(function(){
  var Builder = ISOMERBUILDER.Builder;
  var Entity = ISOMERBUILDER.Entity;
  builder = new Builder('isomer-container-1');
  var divider = document.getElementsByClassName('divider1')[0];
  divider.style.backgroundPositionY = "0px";
  $(document).scroll(function(){
    var scroll = $(window).scrollTop();
    var currMargin = parseInt($('#isomer-container-1').css('margin-top'),10);
    if (scroll < 500){
        var newMargin = String((scroll / 2)) + 'px';
        $('#isomer-container-1').css('margin-top',newMargin);
    }

    var pos = parseInt(divider.style.backgroundPositionY, 10);
    var newPos = scroll/2+'px';
    divider.style.backgroundPositionY = newPos;


    if (scroll > 700){
      if (animateNav){
        animateNav = false;
        $('.nav-reduce').fadeOut(1000, function(){
          $('.m').css('margin-left','40px');
          $('.a').css('margin-left','80px');
          $('.f').css('margin-left','30px');
          $('.m').animate({'margin-left':'0px'}, 1000);
          $('.a').animate({'margin-left':'0px'}, 1000);
          $('.f').animate({'margin-left':'0px'}, 1000);
        });
      }
    }
    if (scroll < 700){
      if (! animateNav){
        animateNav = true;
        $('.m').animate({'margin-left':'40px'}, 1000, function(){
          $('.m').css('margin-left','0px');
          $('.nav-reduce').fadeIn(1000);
        });
        $('.a').animate({'margin-left':'80px'}, 1000, function(){
          $('.a').css('margin-left','0px');
        });
        $('.f').animate({'margin-left':'30px'}, 1000, function(){
          $('.f').css('margin-left','0px');
        });
      }
    }
  });

  //PIANO KEYBOARD
  builder.build([blockFour,
    blockTwo,
    blockThree,
    blockOne,
    createKey(2.5, 1200),
    createKey(1.95, 1400),
    createKey(1.4, 1600),
    createKey(0.85, 1800),
    createKey(0.3, 2000),
    createKey(-0.25, 2200),
    createKey(-0.8, 2400),
    createBlackKey(2.77, 2600),
    createBlackKey(2.22, 2800),
    createBlackKey(1.67, 3000),
    createBlackKey(0.57, 3200),
    createBlackKey(0.02, 3400),
    blockOne
    ]);
    var relativeDiv = document.getElementsByClassName('moveScroll')[0];
    var xOffset = relativeDiv.offsetLeft - 300;
    var yOffset = relativeDiv.offsetTop;
    var firstClick = true;
    var firstCoords = {};
    var secondCoords = {};
    var dx, dy, m, b, fn;
      builder.fg.addEventListener('click', function(e){
        var x = e.pageX - xOffset;
        var y = 540 + builder.div.offsetTop - e.pageY;
        console.log(x + ' ' + y);
        var note = keymap(x,y);
        console.log(note);
        var sine = T("sin", {freq:note.freq, mul:0.5});
        T("perc", {r:500}, sine).on("ended", function() {
          this.pause();
        }).bang().play();
        var timeNow = builder.totalTime;
        console.log(timeNow);
        var keypress = {
          scale:function(current){
            return{
              x:0.5,
              y:2,
              z:linearFB(current - timeNow, 0.4, -0.2, 400)
            }
          }
        };
        if (note.index < 11){
            builder.alterEntity(note.index, keypress);
        } else {
            builder.alterEntity(note.index, {
              scale:function(current){
                return{
                  x:0.25,
                  y:1.5,
                  z:linearFB(current - timeNow, 0.1, -0.05, 400)
                };
            }});
        }
        if (firstClick){
          firstCoords = {x:x, y:y};
          firstClick = false;
        } else {
          secondCoords = {x:x, y:y};
          firstClick = true;
          dx = secondCoords.x - firstCoords.x;
          dy = secondCoords.y - firstCoords.y;
          m = dy/dx;
          b = firstCoords.y - firstCoords.x * m;
          fn = "y = "+m+"x + "+b;
          console.log('function: '+fn);
        }
      });

});

var blockOne = {
  scale: function(){ return {
    x: 0.5,
    y: 2.5,
    z: 1
  };},
  coords: function(current){ return {
    x:outExpo(current - this.startTime, -5, 3.6, 1000),
    y:0,
    z:1
  };},
  color: function(){
    return {
      r:20,
      g:20,
      b:20
    };
  },
  startTime: 200,
};

var blockTwo = {
  scale: function(){ return {
    x: 0.5,
    y: 2,
    z: 1
  };},
  coords: function(current){ return {
    x:outExpo(current - this.startTime, 7, -4, 1000),
    y:0,
    z:1
  };},
  color: function(){
    return {
      r:20,
      g:20,
      b: 20
    };
  },
  startTime:200,
};

var blockThree = {
  scale: function(){ return {
    x:4,
    y:2,
    z:0.5
  }; },
  coords: function(current){
    return{
      x:-1,
      y:0,
      z:outExpo(current - this.startTime, -4, 5, 1000)
    }
  },
  color: function(){
    return {
      r:20,
      g:20,
      b: 20
    };
  },
  startTime:200,
};

var blockFour = {
  scale: function(){
    return{
      x: 4.5,
      y:0.5,
      z:1,
    };
  },
  coords: function(current){
    return{
      x:-1,
      y:outExpo(current - this.startTime, 6, -4, 1000),
      z:1
    };
  },
  color: function(){
    return {
      r:20,
      g:20,
      b: 20
    };
  },
  startTime:200
};

function createKey(x,t){
  return {
    scale: function(){
      return {
        x:0.5,
        y:2,
        z:0.4
      };
    },
    coords: function(current){
      return{
        x:x,
        y:0,
        z:outExpo(current - t, 5, -3.5, 1000)
      };
    },
    color: function(){
      return {
        r:236,
        g:240,
        b:241
      };
    }
  };
};

function createBlackKey(x, t){
  return {
    scale: function(){
      return {
        x:0.25,
        y:1.5,
        z:0.1
      };
    },
    coords: function(current){
      return{
        x:x,
        y:0.9,
        z:outExpo(current - t, 5, -3.5, 1000)
      };
    },
    color: function(){
      return {
        r:20,
        g:20,
        b:20
      };
    },
    startTime: t,
  };
};

function keymap(x,y){
  if(lowerBound(x,y) && leftBound(x,y) && upperBound(x,y) && rightBound(x,y)){
      if (c(x,y)) return {index:10,freq:262};//"C";
      if (cs(x,y)) return {index:15,freq:277};//"C#";
      if (d(x,y)) return {index:9,freq:294};//"D";
      if (ds(x,y)) return {index:14,freq:311};//"D#";
      if (e(x,y)) return {index:8,freq:330};//"E";
      if (f(x,y)) return {index:7,freq:349};//"F";
      if (fs(x,y)) return {index:13,freq:370};//"F#";
      if (g(x,y)) return {index:6,freq:392};//"G";
      if (gs(x,y)) return {index:12,freq:415};//"G#";
      if (a(x,y)) return {index:5,freq:440};//'A';
      if (as(x,y)) return {index:11,freq:466};//'A#';
      return {index:4,freq:494};//'B';
  }

  function upperBound(x,y){
    return y < 0.58*x + 143;
  }
  function c(x,y){
    return y < -0.578*x + 318;
  }
  function cs(x,y){
    return y < -0.5977*x + 330;
  }
  function d(x,y){
    return y < -0.57*x + 351;
  }
  function ds(x,y){
    return y < -0.574*x + 380;
  }
  function e(x,y){
    return y < -0.58*x + 404;
  }
  function f(x,y){
    return y < -0.578*x + 433;
  }
  function fs(x,y){
    return y < -0.57*x + 456;
  }
  function g(x,y){
    return y < -0.568*x + 473;
  }
  function gs(x, y){
    return y < -0.60*x + 509;
  }
  function a(x, y){
    return y < -0.604*x + 530;
  }
  function as(x, y){
    return y < -0.62*x + 552;
  }
  function lowerBound(x,y){
    return y > 0.55*x + 12.5;
  }
  function leftBound(x,y){
    return y > -0.59*x + 293.3;
  }
  function rightBound(x,y){
    return y < -0.58 *x + 556.8;
  }

}

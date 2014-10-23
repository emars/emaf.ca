var builder;
var Tweens = ISOMERBUILDER.Tweens;
var outExpo = Tweens.outExpo;
var linear = Tweens.linear;
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
    console.log(divider.style.backgroundPositionY);


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

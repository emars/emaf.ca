var ISOMERBUILDER = function(){
  var Builder = function(id){
    self = this;
    parseDiv(id);

    //PRIVATE
    function parseDiv(id){
      self.div = document.getElementById(id);
      var width = self.div.offsetWidth;
      var height = self.div.offsetHeight;
      createCanvases(width, height);
    }

    function createCanvases(width, height){
      self.bg = createCanvas(width, height, 0);
      self.fg = createCanvas(width, height, 1);
      self.isobg = new Isomer(self.bg);
      self.isofg = new Isomer(self.fg);
      self.div.appendChild(self.bg);
      self.div.appendChild(self.fg);
    };

    function createCanvas(width, height, index){
      var canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.style['position'] = 'absolute';
      canvas.style['z-index'] = String(index);
      canvas.style['text-align'] = 'left';
      return canvas;
    };
  };

  Builder.prototype = {
    build: function(entities, settings){
      parseEntities(entities);
      var i, x, currentEntity, time = 0, self=this;
      var totalTime = 0;
      var draw = function(){
        requestAnimationFrame(draw);
        var now = +new Date(),
          dt = now - (time || now);
        time = now;
        totalTime += dt;
        //console.log(self.totalTime);
        clearCanvas();
        render(entities, totalTime);
      }

      draw();

      //PRIVATE
      function parseEntities(entities){
        var currentEntity;
        var defaultColor = function(){ return {r:100,g:100,b:100}; };
        var defaultScale = function(){ return {x:0.25,y:0.25,z:0.25}; };
        var defaultRotate = function(){ return {x:0,y:0,z:0}; };
        for(var i = 0, x = entities.length; i < x; i++){
          currentEntity = entities[i];
          currentEntity.color = currentEntity.color || defaultColor;
          currentEntity.scale = currentEntity.scale || defaultScale;
          currentEntity.rotate = currentEntity.rotate || defaultRotate;
        }
      }

      function clearCanvas(){
        self.fg.width = self.fg.width;
      }

      function render(entities, time){
        var shape = Isomer.Shape.Prism(Isomer.Point.ORIGIN);
        var currentEntity;
        for(var i = 0, x = entities.length; i < x; i++){
          currentEntity = entities[i];
          build(currentEntity, time, shape);
        }
      }

      function build(entity, t, shape){
        if (t < entity.startTime || t > entity.endTime) return;
        var c = entity.coords(t);
        var cl = entity.color(t);
        var s = entity.scale(t);
        var r = entity.rotate(t);
        self.isofg.add(
          shape
            .scale(Isomer.Point.ORIGIN,s.x,s.y,s.z)
            .translate(c.x,c.y,c.z)
        , new Isomer.Color(cl.r, cl.g,cl.b));
      }
    }
  };

  var Entity = function(settings){
    this.color = settings.color;
    this.coords = settings.coords;
    this.shape = settings.shape;
    this.scale = settings.scale;
    this.rotate = settings.rotate;
    this.startTime = settings.startTime;
    this.endTime = settings.endTime;
    this.stopTime = settings.stopTime;
  };

  Entity.prototype = {
    outExpo: function (t, b, c, d) {
      return (t>=d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    },
    linear: function(t, b, c, d){
      return (t>=d) ? b+c : c * t/d + b;
    }
  };

  var Tweens = {
    outExpo: function (t, b, c, d) {
      return (t>=d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    },
    linear: function(t, b, c, d){
      return (t>=d) ? b+c : c * t/d + b;
    }
  };

  return {
    Entity: Entity,
    Builder: Builder,
    Tweens: Tweens
  };
}();

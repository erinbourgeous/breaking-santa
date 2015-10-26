$(document).ready(function(){


  	$.ajax({url:'api/getOutstandingGivers', async:false, dataType: 'json', success:function(jsonGivers){
  		var outstandingGivers = '';
  		$.each(jsonGivers.outstanding, function(index, person){
    		outstandingGivers += "<li id=\"" + person.id + "\">" + person.name + "</li>";          	
		});	
		$("#giversList").append(outstandingGivers);
  	}});
  	
  	/*$.getJSON('api/getOutstandingGivers', function(jsonGivers) {
  		var outstandingGivers = '';
  		$.each(jsonGivers.outstanding, function(index, person){
    		outstandingGivers += "<li id=\"" + person.id + "\">" + person.name + "</li>";          	
		});	
		$("#giversList").append(outstandingGivers);	
    });*/
    
    $.ajax({url:'api/getOutstandingReceivers', async:false, dataType: 'json', success:function(jsonReceivers){
  		var outstandingReceivers = '';
  		$.each(jsonReceivers.outstanding, function(index, person){
    		outstandingReceivers += "<li id=\"" + person.id + "\">" + person.name + "</li>";         	
		});	
		$("#receiversList").append(outstandingReceivers);
  	}});
    
    /*$.getJSON('api/getOutstandingReceivers', function(jsonReceivers) {
  		var outstandingReceivers = '';
  		$.each(jsonReceivers.outstanding, function(index, person){
    		outstandingReceivers += "<li id=\"" + person.id + "\">" + person.name + "</li>";         	
		});	
		$("#receiversList").append(outstandingReceivers);	
    });*/
    
    $("#formSubmitButton").click(function(){
    	var giver_name = $('#giversList .selected').text();
    	var confirmMessage = giver_name + ", ";
    	if (receiver_id == 0 ) {
    		confirmMessage += "you have chosen to have your recipient be randomly selected, do you wish to proceed?";	
    	} else {
    		confirmMessage += "you have selected " + $('#receiversList .selected').text() + ", do you wish to proceed?";
    	}
    	
    	if (confirm(confirmMessage) == true) {
        	$.post("api/submitSelection", { 'giver_id': giver_id, 'receiver_id': receiver_id } , function(data) {
 				$("#selectionArea").html("<p>You have selected <b>" + data.receiver_name + "<b/></p>");
 				$("#abomination").html("<iframe style=\"display: block; margin: 0 auto;\" width=\"640\" height=\"360\"" +
                        "src=\"https://www.youtube.com/embed/ptnHxxI4qO8\"" +
                        "frameborder=\"0\" allowfullscreen></iframe>");
		
    			//alert("You have selected " + data.receiver_name);
    	});
    		} else {}   	
	});
	
	var giver_id, receiver_id;

	//Radio Buttons
	$(function(){
	
		$('#giversList li').click(function(){
			giver_id = this.id;
			$('#giverID').val(this.id);
			$('#giversList li').removeClass('selected');
      		$(this).addClass('selected');
		});
		
		$('#receiversList li').click(function(){
			receiver_id = this.id;
			$('#receiverID').val(this.id);
			$('#receiversList li').removeClass('selected');
      		$(this).addClass('selected');
		});
 
 
      	$('#selectionArea ul li').mouseover(function(){
      		$(this).addClass('over');
      	});
 
      	$('#selectionArea ul li').mouseout(function(){
      		$(this).removeClass('over');
    	});
 
  	}); //end function
		
});


//Smoke Effect

function ParticleEmitter() {
    this.m_x;
    this.m_y;
    this.m_dieRate;
    this.m_image;
    this.m_speed = 0.04;
    this.m_alpha = 1.0;

    this.m_listParticle = [];

    // ParticleEmitter().initSmoke function
    // xScale = number between 0 and 1. 0 = on left side 1 = on top
    // yScale = number between 0 and 1. 0 = on top 1 = on bottom
    // particles = number of particles
    // image = smoke graphic for each particle
    this.initSmoke = function(xScale, yScale, particles, image) {
        // the effect is positioned relative to the width and height of the
        // canvas
        this.m_x = CANVAS_WIDTH * xScale;
        this.m_y = CANVAS_HEIGHT * yScale;
        this.m_image = image;
        this.m_dieRate = 0.95;
        // start with smoke already in place
        for ( var n = 0; n < particles; n++) {
            this.m_listParticle.push(new Particle());
            this.m_listParticle[n].initSmoke(this, n * 50000 * this.m_speed);
        }
    }

    this.update = function(timeElapsed) {
        for ( var n = 0; n < this.m_listParticle.length; n++) {
            this.m_listParticle[n].update(timeElapsed);
        }
    }

    this.render = function(context) {
        for ( var n = 0; n < this.m_listParticle.length; n++) {
            this.m_listParticle[n].render(context);
        }
    }
};
function Particle() {
    this.m_x;
    this.m_y;
    this.m_age;
    this.m_xVector;
    this.m_yVector;
    this.m_scale;
    this.m_alpha;
    this.m_canRegen;
    this.m_timeDie;
    this.m_emitter;

    this.initSmoke = function(emitter, age) {
        this.m_age = age;
        this.m_emitter = emitter;
        this.m_canRegen = true;
        this.startRand();
    }

    this.isAlive = function() {
        return this.m_age < this.m_timeDie;
    }

    this.startRand = function() {
        // smoke rises and spreads
        this.m_xVector = Math.random() * 0.5 - 0.25;
        this.m_yVector = -1.5 - Math.random();
        this.m_timeDie = 20000 + Math.floor(Math.random() * 12000);

        var invDist = 1.0 / Math.sqrt(this.m_xVector * this.m_xVector
                + this.m_yVector * this.m_yVector);
        // normalise speed
        this.m_xVector = this.m_xVector * invDist * this.m_emitter.m_speed;
        this.m_yVector = this.m_yVector * invDist * this.m_emitter.m_speed;
        // starting position within a 20 pixel area
        this.m_x = (this.m_emitter.m_x + Math.floor(Math.random() * 20) - 10);
        this.m_y = (this.m_emitter.m_y + Math.floor(Math.random() * 20) - 10);
        // the initSmokeial age may be > 0. This is so there is already a smoke trail
        // in
        // place at the start
        this.m_x += (this.m_xVector + windVelocity) * this.m_age;
        this.m_y += this.m_yVector * this.m_age;
        this.m_scale = 0.01;
        this.m_alpha = 0.0;
    }

    this.update = function(timeElapsed) {
        this.m_age += timeElapsed;
        if (!this.isAlive()) {
            // smoke eventually dies
            if (Math.random() > this.m_emitter.m_dieRate) {
                this.m_canRegen = false;
            }
            if (!this.m_canRegen) {
                return;
            }
            // regenerate
            this.m_age = 0;
            this.startRand();
            return;
        }
        // At start the particle fades in and expands rapidly (like in real
        // life)
        var fadeIn = this.m_timeDie * 0.05;
        var startScale;
        var maxStartScale = 0.3;
        if (this.m_age < fadeIn) {
            this.m_alpha = this.m_age / fadeIn;
            startScale = this.m_alpha * maxStartScale;
            // y increases quicker because particle is expanding quicker
            this.m_y += this.m_yVector * 2.0 * timeElapsed;
        } else {
            this.m_alpha = 1.0 - (this.m_age - fadeIn)
                    / (this.m_timeDie - fadeIn);
            startScale = maxStartScale;
            this.m_y += this.m_yVector * timeElapsed;
        }
        // the x direction is influenced by wind velocity
        this.m_x += (this.m_xVector + windVelocity) * timeElapsed;
        this.m_alpha *= this.m_emitter.m_alpha;
        this.m_scale = 0.001 + startScale + this.m_age / 4000.0;
    }

    this.render = function(ctx) {
        if (!this.isAlive())
            return;
        ctx.globalAlpha = this.m_alpha;
        var height = this.m_emitter.m_image.height * this.m_scale;
        var width = this.m_emitter.m_image.width * this.m_scale;
        // round it to a integer to prevent subpixel positioning
        var x = Math.round(this.m_x - width / 2);
        var y = Math.round(this.m_y + height / 2);
        ctx.drawImage(this.m_emitter.m_image, x, y, width, height);
        if (x < dirtyLeft) {
            dirtyLeft = x;
        }
        if (x + width > dirtyRight) {
            dirtyRight = x + width;
        }
        if (y < dirtyTop) {
            dirtyTop = y;
        }
        if (y + height > dirtyBottom) {
            dirtyBottom = y + height;
        }
    }
};
 
var lastRender = new Date().getTime();
var context;
var smoke_1 = new ParticleEmitter();
var smoke_2 = new ParticleEmitter();
var smoke_3 = new ParticleEmitter();


var CANVAS_WIDTH = 960;
var CANVAS_HEIGHT = 640;
// only redraw minimimum rectangle
var dirtyLeft = 0;
var dirtyTop = 0;
var dirtyRight = CANVAS_WIDTH;
var dirtyBottom = CANVAS_HEIGHT;
var windVelocity = 0.01;
var count = 0;
 
function initSmoke()
{
  var canvas = document.getElementById('smokeCanvas');
  if (canvas.getContext)
  {
    context = canvas.getContext('2d');
  }
  else
  {
    return;
  }
  var imgBack = document.getElementById('background');
  // make canvas same size as background image
  CANVAS_WIDTH = imgBack.width;
  CANVAS_HEIGHT = imgBack.height;
  canvas.width = imgBack.width;
  canvas.height = imgBack.height;
  // get absolute position of background image
  var xImage = imgBack.offsetLeft;
  var yImage = imgBack.offsetTop;
  var elem = imgBack.offsetParent;
  while (elem)
  {
    xImage += elem.offsetLeft;
    yImage += elem.offsetTop;
    elem = elem.offsetParent;
  }
  // position canvas on top of background
  canvas.style.position = 'absolute';
  canvas.style.left = xImage + "px";
  canvas.style.top = yImage + "px";
  var img_smoke_1 = new Image(),
        img_smoke_2 = new Image(),
        img_smoke_3 = new Image();
        
    var smokeSrc = 'src/images/WhiteSmoke.png';
        
  	img_smoke_1.src = smokeSrc;
    img_smoke_2.src = smokeSrc;
    img_smoke_3.src = smokeSrc;

    smoke_1.m_alpha = 0.2;
    smoke_3.m_speed = 0.001;
    smoke_1.initSmoke(.3, .55, 90, img_smoke_1);

    smoke_2.m_alpha = 0.3;
    smoke_2.initSmoke(.4, .55, 90, img_smoke_2);

    smoke_3.m_alpha = 0.1;
    smoke_3.m_speed = 0.02;
    smoke_3.initSmoke(.5, .55, 90, img_smoke_3);

    requestAnimFrame(render);
}
 
// shim layer with setTimeout fallback
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function( callback ){
                window.setTimeout(callback, 17);
              };
    })();
 
   
function render() {
    // time in milliseconds
    var timeElapsed = new Date().getTime() - lastRender;
    lastRender = new Date().getTime();
    context.clearRect(dirtyLeft, dirtyTop, dirtyRight - dirtyLeft, dirtyBottom - dirtyTop);
    dirtyLeft = 1000;
    dirtyTop = 1000;
    dirtyRight = 0;
    dirtyBottom = 0;

    smoke_1.update(timeElapsed);
    smoke_1.render(context);

    smoke_2.update(timeElapsed);
    smoke_2.render(context);

    smoke_3.update(timeElapsed);
    smoke_3.render(context);

    windVelocity += (Math.random() - 0.5) * 0.002;
    if (windVelocity > 0.015) {
        windVelocity = 0.015;
    }
    if (windVelocity < 0.0) {
        windVelocity = 0.0;
    }
  
    requestAnimFrame(render);
}

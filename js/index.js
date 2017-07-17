var cx = 125,
    cy = 125,
    r = 125;
var animating = false;
$(document).ready((function(){

  cx = $('.mySvg').height() / 2;
  cy = cx;
  r = cx; 
  
  $('#points').on('input',function(){
    var totalPoints = $(this).val();
    $(this).next().html(totalPoints);
    draw($('.mySvg'),getPoints(totalPoints),$('#multiplier').val());
  });

  $('#multiplier').on('input',function(){
    multiplier = $(this).val();
    $(this).next().html(multiplier);
    draw($('.mySvg'),getPoints($('#points').val()),$(this).val());
  });
  
  draw($('.mySvg'),getPoints(200),2);

  $('.animateButton').click(function(){
    if(!animating){
      animating = true;
      animate();
      console.log('animating');
    }else{
      animating = false;
    }
  });

}));

function getPoint(point) {
  var elem = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    elem.setAttribute('r','2');
    elem.setAttribute('cx',point.x);
    elem.setAttribute('cy',point.y);
    elem.setAttribute('fill','orangered');
  return elem; 
}

function getLine(point1,point2) {
  var elem = document.createElementNS("http://www.w3.org/2000/svg", "line");
  elem.setAttribute('stroke','orangered');
  elem.setAttribute('x1',point1.x);
  elem.setAttribute('x2',point2.x);
  elem.setAttribute('y1',point1.y);
  elem.setAttribute('y2',point2.y);
  return elem;
  
}

function sin(index,sections) {
  return Math.sin((index*2*Math.PI)/sections);
}

function cos(index,sections) {
  return Math.cos((index*2*Math.PI)/sections);
}

 function getPoints(totalPoints){
   var points = [];
    for(var i=0; i < totalPoints; i++){
      var x = cx - r * cos(i,totalPoints),
          y = cy - r * sin(i,totalPoints);
      points.push({x:x,y:y});
    }
   return points;
  }

function draw(svg, points, multiplier) {
  svg.html("");
  function ind(i) {
    return i % points.length;
  } 

  for(var i = 0; i < points.length; i++){
    svg.append(getPoint(points[i]));
  }
  
  for(var j = 0 ; j < 200; j++) {
    svg.append(getLine(points[ind(j)],points[ind(Math.floor(j*multiplier))]));
  }
}

function animate() {
  var multiplier = document.getElementById("multiplier");
  if (parseFloat(multiplier.value) < 50 && animating) {
    multiplier.value = parseFloat(multiplier.value) + 1*document.getElementById('speed').value;
    $('#multiplier').trigger('input');
    window.requestAnimationFrame(animate);
  }
}
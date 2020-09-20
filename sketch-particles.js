// Perlin noise vector representation in 3D.
// With particles added over that follow the direction of the flow field.

var inc = 0.1;
var scl = 10;
var cols, rows;
// The 3rd variable will be time
var zoff = 0;

// Variable to keep track of the frame rate.
var fr;

// Array to keep partciles.
var particles = [];
// Array to keep track of the flow field vectors.
var flowfield;

function setup() {
    cnv = createCanvas(500,500);
    cols = floor(width / scl);
    rows = floor(height / scl);
    // Paragraph element
    fr = createP('');

    // As we have a rows*cols number of arrows, the array has to be that same size.
    flowfield = new Array(rows * cols);
    
    var orangeArray = [
        '#BF670B',
        '#7F4507',
        '#FF8A0E',
        '#402304',
        '#F29F05',
        '#A68112',
        '#D95323',
        '#D94032',
        '#A63F03',
        '#8C1C03',
        '#590202',
        '#595332',
        '#D98E04'
    ]
        
    var count = 0;
    for (var i = 0; i < 200; i++) {
        count += 1;
        if (count >= orangeArray.length-1){
            count = 0;
        }
        let pcolor = orangeArray[count]
        particles[i] = new Particle(pcolor);
    }
    background(0);
}

function draw() {
    
    var yoff = 0;
    for(var y = 0; y < rows; y++ ) {
        var xoff =0;
        for (var x = 0; x < cols; x++ ) {
            var index = x + y * cols;
            var angle = noise(xoff, yoff,zoff) * TWO_PI * 4;
            v = p5.Vector.fromAngle(angle);
            // Magnitude of the force field
            v.setMag(2);
            cnv.mouseOver(changeMag);
            // Save each vector in the flowfield array
            flowfield[index] = v;
            xoff += inc;

            // Uncomment next lines if we want the graphical 
            // representation of the vectors.
            // stroke(0,50);
            // strokeWeight(1);
            // push(); // Start new drawing state
            // translate(x * scl, y * scl);
            // rotate(v.heading());
            // line(0, 0, scl ,0);
            // pop(); // Restore to original state
            
        }
        yoff += inc;

        // We can comment the next line if we don't want the
        // force field to change over time.
        zoff += 0.0003;
    }
    
    for (var i = 0; i < particles.length; i++) {
        particles[i].follow(flowfield);
        particles[i].update();
        particles[i].edges();  
        particles[i].show();  
    }
    
    fr.html(floor(frameRate()));

    // Draw lion face
    // noStroke();
    // fill('rgba(0,0,0, 0.1)')
    // beginShape();
    // vertex(148,180);
    // vertex(160,144);
    // vertex(180,122);
    // vertex(200,117);
    // vertex(217,115);
    // vertex(241,122);
    // vertex(265,113);
    // vertex(291,114);
    // vertex(309,120);
    // vertex(334,156);
    // vertex(341,198);
    // vertex(341,225);
    // vertex(333,251);
    // vertex(320,268);
    // vertex(300,287);
    // vertex(302,299);
    // vertex(300,312);
    // vertex(291,327);
    // vertex(291,337);
    // vertex(286,350);
    // vertex(272,358);
    // vertex(252,364);
    // 

    // vertex(242,304);
    // vertex(265,284);
    // vertex(265,275);
    // vertex(241,275);
    // vertex(148,180);
    // endShape();

    // beginShape();
    // vertex(252,364);
    // vertex(224,362);
    // vertex(198,347);
    // vertex(196,327);
    // vertex(187,307);
    // vertex(183,285);
    // vertex(166,267);
    // vertex(150,241);
    // vertex(146,209);
    // vertex(148,180);
    // vertex(241,275);
    // vertex(235,275);
    // vertex(219,275);
    // vertex(217,284);
    // vertex(242,305);
    // vertex(252,364);

    // endShape();

    // Black background outside mane
    // beginShape();
    // vertex(233,13);
    // vertex(233,0);
    // vertex(500,0);
    // vertex(500,500);
    // vertex(283,498);
    // vertex(297,490);
    // vertex(338,460);
    // vertex(378,428);
    // vertex(410,402);
    // vertex(446,356);
    // vertex(458,300);
    // vertex(458,228);
    // vertex(454,158);
    // vertex(433,106);
    // vertex(382,31);
    // vertex(336,17);
    // vertex(270,11);
    // vertex(233,13);
    // endShape();

    // beginShape();
    // vertex(233,13);
    // vertex(233,0);
    // vertex(0,0);
    // vertex(0,0);
    // vertex(0,500);
    // vertex(223,500);
    // vertex(192,476);
    // vertex(140,440);
    // vertex(89,396);
    // vertex(44,335);
    // vertex(36,248);
    // vertex(33,153);
    // vertex(42,97);
    // vertex(91,42);
    // vertex(175,16);
    // vertex(233,13);
    // vertex(233,0);
    // endShape();

 

    //Lion 2
    // Left face
    var leftFaceX = [250,207,167,163,193,202,217,250,250,246,226,226,250,250];
    var leftFaceY = [122,112,150,208,254,314,346,355,292,292,267,261,261,122];
    var rightFaceX = [];
    var rightFaceY = leftFaceY;
    fill('rgba(0,0,0, 0.1)');
    noStroke();
    beginShape();
    for(var i = 0; i < leftFaceX.length; i ++) {
        vertex(leftFaceX[i],leftFaceY[i]);
        var value = 500 - leftFaceX[i];
        append(rightFaceX,value);
    }
    endShape();

    // Right face
    beginShape();
    for (var i = 0; i < rightFaceX.length; i ++) {
        vertex(rightFaceX[i],rightFaceY[i]);
    }
    endShape();
    
    // Left mane
    var leftManeX = [250,250,0,0,250,250,205,135,53,81,62,100,71,145,250];
    var leftManeY = [46,0,0,500,500,404,439,381,393,281,231,161,100,31,46];
    var rightManeX = [];
    var rightManeY = leftManeY;

    beginShape();
    for(var i = 0; i < leftManeX.length; i ++) {
        vertex(leftManeX[i],leftManeY[i]);
        var value = 500 - leftManeX[i];
        append(rightManeX,value);
    }
    endShape();

    // Right mane
    beginShape();
    for (var i = 0; i < rightManeX.length; i ++) {
        vertex(rightManeX[i],rightManeY[i]);
    }
    endShape();
    
}

function changeMag() {
    // Find index in the grid corresponding to that mouse position
    v = p5.Vector.fromAngle(PI);
    var x = floor(mouseX / scl);
    var y = floor(mouseY / scl);
    // Formula to take the 2d index into the 1d array
    var index = x + y * cols;
    // let v = flowfield[index];
    v.setMag(50);
    // flowfield[index] = v;
}
      

// Particles structure function
class Particle {

    constructor(pcolor){
        this.pos = createVector(random(width),random(height));
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
        this.maxspeed = 2;
        this.pcolor = pcolor;

        this.initPos = this.pos.copy();
        this.prevPos = this.pos.copy();
        this.maxHeight = height;
        // this.computeMaxHeight();
    }        

    computeMaxHeight() {
        if (this.initPos.x < width/3 || this.initPos.x > 2 * width/3) {
            this.maxHeight = height;
        }
        else{
            if (this.initPos.x < width/3 + width/6) {
                this.maxHeight = width-this.initPos.x - 100;
            }else{
                this.maxHeight = width-this.initPos.x - 100;
            }
            
        }
    }

    update() {
        this.vel.add(this.acc);
        // Limit the max speed.
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        // Reset acceleration to 0.
        this.acc.mult(0);
    }

    // Function so that each particle follows the vector, in the index
    // corresponding to that particle's position.
    follow(vectors) {
        // Base on the particle's position, scale it to the grid, 
        // and find the vector corrresponding to that index.
        var x = floor(this.pos.x / scl);
        var y = floor(this.pos.y / scl);

        // Formula to take the 2d index into the 1d array
        var index = x + y * cols;
        var force = vectors[index];
        this.applyForce(force);
        // console.log(force);

    }

    // Function so that the particle receives a force
    applyForce(force) {
        this.acc.add(force);
    }
    
    show() { 
        let c = color(this.pcolor);
        let alpha = 50;
        c.setAlpha(alpha);
        strokeWeight(1);
        stroke(c);
        // strokeWeight(1);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        this.updatePrevious();
        
    }

    updatePrevious() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }

    edges() {
    // Delimit mountain edges. Particles position is delimited by:
    // X position: within 2deltas+1 of their initial x position.
    // Y position:  within the height of the canvas and their maxHeight.
        // var delta = random(5,10);
        var delta = 50;
        if (this.pos.x > this.initPos.x + delta) {
            if (this.pos.x - delta > 0) {
                this.pos.x = this.initPos.x - delta;
            }else{
                this.pos.x = 0;
            }
            this.updatePrevious();
        }
        if (this.pos.x < this.initPos.x - delta) {
            if (this.pos.x + delta < width) {
                this.pos.x = this.initPos.x + delta;
            }else{
                this.pos.x = width;
            }
            this.updatePrevious();
        }

        if (this.pos.y < height - this.maxHeight){
            this.pos.y = height;
            this.updatePrevious();
        }
        if (this.pos.y > height) {
            this.pos.y = height - this.maxHeight;
            this.updatePrevious();
        }

    }

}
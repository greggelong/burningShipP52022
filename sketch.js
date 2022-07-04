let sz;
let backButton;
let myslider;
let mypara;
let mycheckbox;
let maxx = 3;
let minx = -3;
let maxy = 3;
let miny = -3;
let zoom = 0.1;


function setup() {
  createCanvas(400, 400);
  colorMode(HSB,64);
  noStroke();
  mypara = createP(`real part min ${minx} imaginary part min  ${miny}`)
  myslider = createSlider(1, 5, 2);
  myslider.changed(showmandel);
  backButton = createButton("Back to start");
  backButton.mousePressed(resetMand);
  mycheckbox = createCheckbox("b&w", false)
  mycheckbox.changed(showmandel);
  print(mycheckbox.value())

  showmandel();
}

 

function mouseClicked() {
  if (mouseY <= height) { // so the slider works.the slider is off the 
    // canvas so only update to mouse position
    // when clicked on the cavas
  let x = map(mouseX, 0, width, minx, maxx);  // set the x on complex plane
  let y = map(mouseY, 0, height, miny, maxy); // s
  // center and zoom those coordinates
  maxx = x+zoom;
  minx = x-zoom;
  maxy = y+zoom;
  miny = y-zoom;

  zoom*=0.5;
  if (zoom<0.00001) {
    zoom=1;
    maxx =MN;
    minx=-MN;
    maxy=MN;
    miny=-MN;
  }
  
  mypara.html(`real part min ${minx} imaginary part min  ${miny}`)
  showmandel();

    showmandel();
  }

}

function resetMand(){
  // the min and max x y coords for ship
  maxx = 3;
  minx = -3;
  maxy = 3;
  miny = -3;
  zoom = 0.1;
  showmandel();
}



function keyPressed() {
  /*maxx = 1;
  minx = -2;
  maxy = 1.5;
  miny = -1.5;*/

  let x = map(mouseX, 0, width, minx, maxx);  // set the x on complex plane
  let y = map(mouseY, 0, height, miny, maxy); // s
  // center and zoom those coordinates
  maxx = x+zoom;
  minx = x-zoom;
  maxy = y+zoom;
  miny = y-zoom;

  zoom*=0.5;
  if (zoom<0.00001) {
    zoom=1;
    maxx =MN;
    minx=-MN;
    maxy=MN;
    miny=-MN;
  }
  
  mypara.html(`real part min ${minx} imaginary part min  ${miny}`)
  showmandel();


}

function showmandel() {
  background(0);
  sz = myslider.value();
  for (let x = 0; x < width; x += sz) {
    for (let y = 0; y < height; y += sz) {

      let a = map(x, 0, width, minx, maxx); //real part
      //let a = map(x, 0, width, -0.25,0.25); //real part
      let b = map(y, 0, height, miny, maxy); // imaginary part n.b. height for y is min 
      // let b = map(y, 0, height,-1,-0.5); // imaginary part
       
      let ca =a;
      let cb =b;
      // iterate 100 times to see if unbounded
      //println(a,b);
      let iter =0;
      while (iter < 100) {
        // http://www.paulbourke.net/fractals/burnship/
        // x^2 -y^2 -c
        // 2 abs(x*y)-c
        let aa = (a*a)-(b*b);
        let bb = -2.0 *abs(a*b);  // negative to flip this

        a = aa -ca;//+map(mouseX,0,width,-2,2);// ca;
        b = bb -cb;// +map(mouseY,0,height,-2,2);// cb;

        if (abs(a+b)>16) {
          // set the break out point at orbit greater than 16
          // mandel brot only need 2 but looks better with higher numbers
          // not sure about this one must at least be greater than 3
          break;
        }
        iter++;
      }
      if (iter == 100) {
        fill(0); // in the set

      } else {
        if (mycheckbox.checked()){
          fill(50-iter);

        }else{
        fill(iter % 64, 100, 100); // modulo that color number
        }

      }
      rect(x, y,sz+1,sz+1)


    }

  }

}
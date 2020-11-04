let xPos = 1280 /2;
let yPos = 720 /2;
let xSpeed = 0;
let ySpeed = 0;
let xAcc = 0;
let yAcc = 0;
let force = 0.98;
let r = 60;
let data1, data2, data0;
let ring;
let starttime;


let portName = '/dev/tty.usbmodem1412301';
let option = { baud: 115200 };

function setup() {
  
  serial = new p5.SerialPort();
  serial.clear();

  ring = new targetRing();

  let xPos = width / 2;
  let yPos = height / 2;
  serial.on('list', printList);
  serial.on('connected', serverConnected);
  serial.on('open', portOpen);
  serial.on('data', serialEvent);
  serial.on('error', serialError);
  serial.on('close', portClose);

  serial.list(); // list the serial ports
  serial.open(portName, option);

  createCanvas(1280, 720);

}

function draw() {
  background(0);
  ring.show();



  
  update();

  
  ring.overlab(xPos,yPos,r)
  //console.log(yAcc, ySpeed);

  
  bounceDetect();
  stroke(0);
  strokeWeight(2);
  fill(255);
  ellipse(xPos, yPos, r);
  time = int(millis() / 1000);
  strokeWeight(1);
  textSize(32);
  //text(time, 20,60);
}



class targetRing {
  constructor(_x = random(60,1280-60), _y = random(60,720-60), _r=random(80,120)) {
    this.x = _x ;
    this.y = _y ;
    this.r = _r ;
  }

  show() {
    push();
    stroke("pink");
    strokeWeight(4);
    noFill();
    ellipse(this.x, this.y, this.r);
    pop();
  }

  overlab(xBall, yBall, rBall) {
    let distance = dist(this.x, this.y, xBall, yBall);
    if (distance < (this.r - rBall) / 2) {
      console.log("hit");
      stroke(0,255,0);
      strokeWeight(8);
      noFill();
      rect(0, 0, width, height);
      return true;
    } else {
      return false;
    }
  }
}



function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    //console.log(i + portList[i]);
  }
}


function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
  serial.write('x');
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}

function serialEvent() {
  var inString = serial.readStringUntil('\r\n');

  if (inString.length > 0) {
    if (inString !== 'hello') {
      var sensors = split(inString, ',');
      if (sensors.length > 2) {
        data0 = Number(sensors[0]);
        data1 = Number(sensors[1]);
        data2 = Number(sensors[2]);
        //console.log(sensors);
      }
      accListen();
  
    }
    serial.write('x'); //When added this line, the serial inlet of p5 server would be stucked
  }


}
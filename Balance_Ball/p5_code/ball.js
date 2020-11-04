function accListen() {
    xAcc = map(data1, -10, 10, -1, 1);
    yAcc = map(data0, -10, 10, -1, 1);
}


function update() {
    // console.log("sensor data: ", data0, data1);
    constrain(xAcc, -1, 1);
    constrain(yAcc, -1, 1);
    // console.log("Acc data: ", xAcc, yAcc);
    xSpeed += xAcc;
    ySpeed += yAcc;
    xSpeed *= force;
    ySpeed *= force;
    constrain(xSpeed, -3, 3);
    constrain(ySpeed, -3, 3);
    
    if (abs(xSpeed) < 0.009) {
        {
            xSpeed = 0;
        }
    }
    if (abs(ySpeed) < 0.009) {
        ySpeed = 0;
    }
    
    xPos += xSpeed;
    yPos += ySpeed;
    constrain(xPos, r / 2, width - r / 2);
    constrain(yPos, r / 2, height - r / 2);

    // console.log("Pos data: ", xPos, yPos);
}


function bounceDetect() {
    if (xPos >= width - r / 2 || xPos <= r / 2) {
        xSpeed = -xSpeed;
        xSpeed *= 0.9;
    }
    if (yPos >= height - r / 2 || yPos <= r / 2) {
        ySpeed = -ySpeed;
        ySpeed *= 0.9;
    }
}


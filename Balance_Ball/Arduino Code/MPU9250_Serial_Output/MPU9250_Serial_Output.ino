#include "MPU9250.h"
MPU9250 mpu;


// initialize a Madgwick filter:
//Madgwick filter;
// sensor's sample rate is fixed at 104 Hz:

void setup() {
  Serial.begin(115200);

  Wire.begin();

  delay(2000);
  mpu.setup();
  delay(5000);

  // calibrate anytime you want to
  mpu.calibrateAccelGyro();
  mpu.calibrateMag();

  while (Serial.available() <= 0) {
    Serial.println("hello");
    delay(300);
  }
}

void loop() {
  static uint32_t prev_ms = millis();
  if ((millis() - prev_ms) > 16)
  {
    mpu.update();
    if (Serial.available() > 0) {
      int inByte = Serial.read();
      mpu.printACcl();
    }
    prev_ms = millis();
  }
}

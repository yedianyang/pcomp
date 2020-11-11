void setup() {
  Serial.begin(9600);


  while (Serial.available() <= 0) {
    Serial.println("hello");
    delay(300);
  }
}

void loop() {
  if (Serial.available() > 0) {
    int inByte = Serial.read();

    int inValue1 = map(analogRead(A1),250,805,0,512);
    int inValue2 = map(analogRead(A2),250,805,0,512);
    int inValue3 = digitalRead(2);
    Serial.print(inValue1);
    Serial.print(",");
    Serial.print(inValue2);
    Serial.print(",");
    Serial.println(inValue3);
  }
}

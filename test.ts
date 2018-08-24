// tests go here; this will not be compiled when this package is used as a library

//Control motor A forward and set speed
MotorDriver.MotorRun(Motor.A, Dir.forward, 0)

//Stop motor
MotorDriver.MotorStop(Motor.A)

//Turn the steering gear S0 to the starting position
MotorDriver.ServosTurnZero(Servo.S0)

//Turn the steering gear S0 to the maximum position
MotorDriver.ServosTurnFull(Servo.S0)

//Stop Servo
MotorDriver.ServoStop(Servo.S0)

//Servo Turn Angle
MotorDriver.ServoTurnAngle(Servo.S1, 180)

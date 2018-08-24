// tests go here; this will not be compiled when this package is used as a library

//Control motor A forward and set speed
MotorDriver.MotorRun(Motor.A, Dir.forward, 0)

//Stop motor
MotorDriver.MotorStop(Motor.A)

//Turn the steering gear S0 to the starting position
MotorDriver.ServosTurnZero(Servo.S0)

//Turn the steering gear S0 to the maximum position
MotorDriver.ServosTurnFull(Servo.S0)

//Steering gear S0 turns positive and set speed
MotorDriver.ServoTurn(Servo.S0, Dir.forward, 0)

//Stop Servo
MotorDriver.ServoStop(Servo.S0)


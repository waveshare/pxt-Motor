enum Motor {
    //% block="A"
    A = 0x1,
    //% block="B"
    B = 0x2,
}

enum Servo {
    //% block="S0"
    S0 = 0x1,
    //% block="S1"
    S1 = 0x2,
    //% block="S2"
    S2 = 0x3,
}

enum Dir {
    //% block="Forward"
    forward = 0x1,
    //% block="Backward"
    backward = 0x2,
}

let PWMA = AnalogPin.P8;
let AIN1 = DigitalPin.P13;
let AIN2 = DigitalPin.P12;
let PWMB = AnalogPin.P16;
let BIN1 = DigitalPin.P14;
let BIN2 = DigitalPin.P15;
let S0_PIN = AnalogPin.P0;
let S1_PIN = AnalogPin.P1;
let S2_PIN = AnalogPin.P2;

//% weight=20 color=#3333FF icon="\uf1b9"
namespace MotorDriver {
    /**
	 * Motor Run
	 * @param speed [0-16] speed of Motor; eg: 10, 0, 16
	*/
    //% blockId=MotorDriver_MotorRun block="Motor %m|index %index|speed %speed"
    //% weight=100
    //% speed.min=0 speed.max=16
    export function MotorRun(m: Motor, index: Dir, speed: number): void {
        speed = speed * 64 - 1; // map 0 to 1023

        if (m == Motor.A) {
            pins.analogWritePin(PWMA, speed)
            if (index == Dir.forward) {
                pins.digitalWritePin(AIN1, 0)
                pins.digitalWritePin(AIN2, 1)
            } else {
                pins.digitalWritePin(AIN1, 1)
                pins.digitalWritePin(AIN2, 0)
            }
        } else {
            pins.analogWritePin(PWMB, speed)
            if (index == Dir.forward) {
                pins.digitalWritePin(BIN1, 0)
                pins.digitalWritePin(BIN2, 1)
            } else {
                pins.digitalWritePin(BIN1, 1)
                pins.digitalWritePin(BIN2, 0)
            }
        }
    }

    //% blockId=MotorStop
    //% block="Motor %Motor| Stop"
    //% weight=90
    export function MotorStop(m: Motor): void {
        if (m == Motor.A)
            pins.analogWritePin(PWMA, 0)
        else
            pins.analogWritePin(PWMB, 0)
    }

    //% blockId=ServosTurnZero
    //% block="Servos %s| Turn Zero"
    //% weight=80
    export function ServosTurnZero(s: Servo): void {
        if (s == Servo.S0)
            pins.servoWritePin(S0_PIN, 0)
        else if (s == Servo.S1)
            pins.servoWritePin(S1_PIN, 0)
        else
            pins.servoWritePin(S2_PIN, 0)
    }

    //% blockId=ServosTurnFull
    //% block="Servos %s| Turn Full"
    //% weight=79
    export function ServosTurnFull(s: Servo): void {
        if (s == Servo.S0)
            pins.servoWritePin(S0_PIN, 180)
        else if (s == Servo.S1)
            pins.servoWritePin(S1_PIN, 180)
        else
            pins.servoWritePin(S2_PIN, 180)
    }


    //% blockId=ServoStop
    //% block="Servos %s| Stop"
    //% weight=69 
    export function ServoStop(s: Servo): void {
        if (s == Servo.S0)
            pins.servoSetPulse(S0_PIN, 0)
        else if (s == Servo.S1)
            pins.servoSetPulse(S1_PIN, 0)
        else
            pins.servoSetPulse(S2_PIN, 0)
    }

    /**
	 * Servo TurnAngle
	 * @param angle [0-180] speed of Motor; eg: 180, 0, 180
	*/
    //% blockId=ServoTurnAngle
    //% block="Servos %s| Turn Angle %angle"
    //% weight=60 
    //% angle.min=0 angle.max=180
    export function ServoTurnAngle(s: Servo, angle: number): void {
        let temp = 0
        temp = angle * 10 + 500 //0.5ms - 2.5ms
        if (s == Servo.S0)
            pins.servoSetPulse(S0_PIN, temp)
        else if (s == Servo.S1)
            pins.servoSetPulse(S1_PIN, temp)
        else
            pins.servoSetPulse(S2_PIN, temp)
    }

}

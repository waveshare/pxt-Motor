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

enum DIR {
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

//% weight=20 color=#3333FF icon="\uf11b"
namespace MotorDriver {
    //% blockId=MotorRun
    //% block="Motor|%M|Dir %Dir|speed %speed|run"
    //% weight=100
    //% speed.min=0 speed.max=16
    export function MotorRun(M: Motor, Dir: DIR, speed: number): void {
        speed = speed * 64 - 1; // map 0 to 1023

        if (M == Motor.A) {
            pins.analogWritePin(PWMA, speed)
            if (Dir == DIR.forward) {
                pins.digitalWritePin(AIN1, 0)
                pins.digitalWritePin(AIN2, 1)
            } else {
                pins.digitalWritePin(AIN1, 1)
                pins.digitalWritePin(AIN2, 0)
            }
        } else {
            pins.analogWritePin(PWMB, speed)
            if (Dir == DIR.forward) {
                pins.digitalWritePin(BIN1, 0)
                pins.digitalWritePin(BIN2, 1)
            } else {
                pins.digitalWritePin(BIN1, 1)
                pins.digitalWritePin(BIN2, 0)
            }
        }
    }

    //% blockId=MotorStop
    //% block="Motor |%Motor| Stop"
    //% weight=90
    export function MotorStop(M: Motor): void {
        if (M == Motor.A)
            pins.analogWritePin(PWMA, 0)
        else
            pins.analogWritePin(PWMB, 0)
    }

    //% blockId=ServosTurnZero
    //% block="Servos %S Turn Zero"
    //% weight=80
    export function ServosTurnZero(S: Servo): void {
        if (S == Servo.S0)
            pins.servoSetPulse(S0_PIN, 0)
        else if (S == Servo.S1)
            pins.servoSetPulse(S1_PIN, 0)
        else
            pins.servoSetPulse(S2_PIN, 0)
    }
    
    //% blockId=ServosTurnFull
    //% block="Servos %S Turn Full"
    //% weight=79
    export function ServosTurnFull(S: Servo): void {
        if (S == Servo.S0)
            pins.servoSetPulse(S0_PIN, 180)
        else if (S == Servo.S1)
            pins.servoSetPulse(S1_PIN, 180)
        else
            pins.servoSetPulse(S2_PIN, 180)
    }

    //% blockId=ServoTurn
    //% block="Servos |%S|Dir %Dir|speed %speed|run"
    //% weight=70 
    //% speed.min=0 speed.max=100
    export function ServoTurn(S: Servo, Dir: DIR, speed: number): void {
        let item = 90
        if(Dir == DIR.forward)
            item = (speed * 90) / 100 + 90
        else
            item = 90 - (speed * 90) / 100
        if (S == Servo.S0)
            pins.servoWritePin(S0_PIN, item)
        else if (S == Servo.S1)
            pins.servoWritePin(S1_PIN, item)
        else
            pins.servoWritePin(S2_PIN, item)
    }

}

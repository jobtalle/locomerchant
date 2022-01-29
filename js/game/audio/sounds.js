import {SFX} from "./sfx.js";
import {Loop} from "./loop.js";

export class Sounds {
    static TRAIN_STOP = new SFX(["audio/Train_Stop.wav"]);
    static GRAB = new SFX([
        "audio/Object_Grab-001.wav",
        "audio/Object_Grab-002.wav",
        "audio/Object_Grab-003.wav",
        "audio/Object_Grab-004.wav",
        "audio/Object_Grab-005.wav"
    ]);
    static BURN = new SFX([
        "audio/Object_Burn-001.wav",
        "audio/Object_Burn-002.wav",
        "audio/Object_Burn-003.wav",
        "audio/Object_Burn-004.wav",
        "audio/Object_Burn-005.wav"
    ]);
    static WHEELS_ACCELERATE = new Loop("audio/Wheels_Forward_LP.mp3");
    static WHEELS_BRAKE = new Loop("audio/Wheels_Break_LP.mp3");
}
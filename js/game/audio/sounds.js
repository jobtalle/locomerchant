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
    static TRACK_TRANSITION = new SFX([
        "audio/Wheels_TrackTransition-001.wav",
        "audio/Wheels_TrackTransition-002.wav",
        "audio/Wheels_TrackTransition-003.wav",
        "audio/Wheels_TrackTransition-004.wav",
        "audio/Wheels_TrackTransition-005.wav",
        "audio/Wheels_TrackTransition-006.wav"
    ]);
    static ENGINE_PUFF = new SFX([
        "audio/Smoke_Puff-001.wav",
        "audio/Smoke_Puff-002.wav",
        "audio/Smoke_Puff-003.wav",
        "audio/Smoke_Puff-004.wav",
        "audio/Smoke_Puff-005.wav",
        "audio/Smoke_Puff-005.wav"
    ]);
    static BUY = new SFX([
        "audio/Buy-001.wav",
        "audio/Buy-002.wav",
        "audio/Buy-003.wav",
        "audio/Buy-004.wav",
        "audio/Buy-005.wav"
    ]);
    static SELL = new SFX(["audio/Sell.wav"]);
    static LEVER_GRAB = new SFX(["audio/Lever_Grab.wav"]);
    static LEVER_RELEASE = new SFX(["audio/Lever_Release.wav"]);
    static AMB_FOREST = new Loop("audio/Biome_Forest_LP.mp3");
    static AMB_VILLAGE = new Loop("audio/Biome_Village_LP.mp3");
}
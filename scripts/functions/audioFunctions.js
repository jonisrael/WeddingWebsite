import { debug } from "console";
import { audio, audioList } from "../fileImports";
import {
  game,
  win,
  announcer,
  randInt,
  cpu,
  music,
  objectOfAudios,
  loadedAudios,
} from "../global";

export function playAnnouncer(arr, lastPicked, arrType, volume = 0.2) {
  if (win.muteAnnouncer.checked) return;

  let selection = randInt(arr.length);
  // console.log("selection", selection, "lastPicked", lastPicked);
  while (selection === lastPicked) {
    // console.log("need to reselect");
    selection = randInt(arr.length);
  }
  // console.log(arr.length);
  // console.log(selection, lastPicked);
  playAudio(arr[selection], volume, true);
  switch (arrType) {
    case "opening":
      announcer.openingIndexLastPicked = selection;
      break;
    case "smallChain":
      announcer.smallChainIndexLastPicked = selection;
      break;
    case "mediumChain":
      announcer.mediumChainIndexLastPicked = selection;
      break;
    case "largeChain":
      announcer.largeChainIndexLastPicked = selection;
      break;
    case "timeTransition":
      announcer.timeTransitionIndexLastPicked = selection;
      break;
    case "hurryUp":
      announcer.hurryUpIndexLastPicked = selection;
      break;
    case "panic":
      announcer.panicIndexLastPicked = selection;
      break;
    case "overtime":
      announcer.overtimeIndexLastPicked = selection;
      break;
    case "endgame":
      announcer.endgameIndexLastPicked = selection;
      break;
    default:
      console.log("Announcer Playback failed");
  }
}

export function playAudio(file, volume = 0.2, announcerBypass = false) {
  // if sfx is muted but announcer is not, play sound anyway since announcer is not muted
  if (win.muteSFX.checked && !announcerBypass) return;
  let Sound = objectOfAudios[file];
  try {
    Sound.volume = volume;
    Sound.currentTime = 0;
    if (Sound.readyState > 0) Sound.play();
    else
      console.log(
        Sound.src,
        "was not loaded in time, skipping sound byte. State:",
        Sound.readyState,
        "index location",
        audioList.indexOf(Sound.src)
      );
  } catch (error) {
    console.log(`Audio play failed. File: ${file}`);
  }
}

export function playChainSFX(chain) {
  if (win.muteSFX.checked) return;
  let Sound = objectOfAudios[audio[`chain${chain}`]];
  if (chain == 1) {
    return;
  }
  if (chain < 9) {
    Sound = objectOfAudios[audio[`chain${chain}`]];
  } else {
    Sound = objectOfAudios[audio[`chain9`]];
  }
  Sound.volume = 0.05;
  try {
    if (Sound.readyState > 0) {
      Sound.play();
    } else if (objectOfAudios.chain2.readyState > 1) {
      audio.chain2.play();
    } else {
      console.log("failed to play any chain sound effect");
    }
  } catch (e) {
    console.error("chain sfx playback failed", e, e.stack);
  }
}

export function playMusic(file, volume = 1, currentTime = 0) {
  if (win.muteMusic.checked) return;
  game.Music.src = file;
  if (debug.enabled) console.log("Music track:", game.Music.src);
  game.Music.volume = volume;
  game.Music.currentTime = currentTime;
  game.Music.play();
  // if (game.Music.onended) {
  //   console.log(game.Music.src, "has ended");
  //   playMusic(music[randInt(music.length)]);
  // }
  // game.Music.loop = loop;
}

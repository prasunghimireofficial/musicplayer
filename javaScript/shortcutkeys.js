document.addEventListener(
  "keydown",
  (event) => {
    const keyName = event.key;
    const keyValue = event.keyCode;
    // console.log("Key Name = " + `${keyName}`)
    // console.log("Key Value = " + `${keyValue}`)

    //Music Control Short-Cuts Settings
    if (keyName === "MediaTrackPrevious" || keyValue == "37") {
      prevTrack();
    }

    if (keyName === "MediaPlayPause" || keyValue == "32" || keyValue == "80") {
      playpauseTrack();
    }

    if (keyName === "MediaTrackNext" || keyValue == "39") {
      nextTrack();
    }

    if (keyValue == "81") {
      randomTrack();
    }
    if (keyValue == "82") {
      repeatTrack();
    }

    //  Volume Short-Cuts settings

    //For Volume Increasing
    if (keyValue == "38" || keyValue == "107") {
      let updatedVolume = current_track.volume + 0.05;
      updatedVolume = Math.trunc(updatedVolume * 100);
      updatedVolume = updatedVolume / 100;

      if (updatedVolume >= 1) {
        current_track.volume = 1;
      } else {
        current_track.volume = updatedVolume;
      }

      volume_slider.value = current_track.volume * 100;
      console.log("Current volume = " + current_track.volume);
      setVolume();
    }

    //For Volume decreasing
    if (keyValue == "40" || keyValue == "109") {
      let updatedVolume = current_track.volume - 0.05 + 0.001;
      updatedVolume = Math.trunc(updatedVolume * 100);
      updatedVolume = updatedVolume / 100;

      if (updatedVolume <= 0) {
        current_track.volume = 0;
      } else {
        current_track.volume = updatedVolume;
      }

      volume_slider.value = current_track.volume * 100;
      console.log("Current volume = " + current_track.volume);
      setVolume();
    }

    //For volume Muting and Unmuting
    if (keyValue == "77") {
      let volume = current_track.volume;
      let list = speakerIcon.classList[3];
      if (volume > 0) {
        current_track.volume = 0;
        volume_slider.value = current_track.volume * 0;
        console.log("Audio is muted");
        if (list === "fa-volume-down") {
          speakerIcon.classList.remove("fa-volume-down");
          speakerIcon.classList.add("fa-volume-xmark");
        } else {
          speakerIcon.classList.remove("fa-volume-up");
          speakerIcon.classList.add("fa-volume-xmark");
        }
      } else {
        if (volume == 0) {
          current_track.volume = 0.5;
          volume_slider.value = current_track.volume * 100;
          console.log("Audio is Unmuted");
          if (list === "fa-volume-xmark") {
            speakerIcon.classList.remove("fa-volume-xmark");
            speakerIcon.classList.add("fa-volume-down");
          }
        }
      }
    }
    volumeUpdate();
  },
  false
);

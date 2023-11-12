let stream = null,
  audio = null,
  mixedStream = null,
  chunks = [],
  recorder = null,
  startButton = null,
  stopButton = null,
  downloadButton = null,
  recordedVideo = null;

async function setupStream() {
  try {
    stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });

    audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100,
      },
    });
  } catch (err) {
    console.error(err);
  }
}

async function startRecording() {
  await setupStream();

  if (stream && audio) {
    mixedStream = new MediaStream([
      ...stream.getTracks(),
      ...audio.getTracks(),
    ]);
    recorder = new MediaRecorder(mixedStream);
    recorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/mp4" });
      chunks = [];

      downloadButton.href = URL.createObjectURL(blob);
      downloadButton.download = "video.mp4";
      stream.getTracks().forEach((track) => track.stop());
      audio.getTracks().forEach((track) => track.stop());
    };
    recorder.start(1000);

    startButton.classList.add("hidden");
    stopButton.classList.remove("hidden");
  } else {
    console.warn("No stream available.");
  }
}

function stopRecording() {
  recorder.stop();
  startButton.classList.remove("hidden");
  stopButton.classList.add("hidden");
  downloadButton.classList.remove("hidden");
}

window.addEventListener("load", () => {
  startButton = document.getElementById("record-btn");
  stopButton = document.getElementById("stop-btn");
  downloadButton = document.getElementById("download-btn");
  recordedVideo = document.getElementById("recorded-video");

  startButton.addEventListener("click", startRecording);
  stopButton.addEventListener("click", stopRecording);
});

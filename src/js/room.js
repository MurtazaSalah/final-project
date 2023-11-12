let displayFrame = document.getElementById("stream__box");
let videoFrames = document.getElementsByClassName("video__container");
let userIdInDisplayFrame = null;


let expandVideoFrame = (e) => {
  let child = displayFrame.children[0];
  if (child) {
    document.getElementById("streams__container").appendChild(child);
  }

  displayFrame.classList.remove("hidden");
  displayFrame.appendChild(e.currentTarget);
  userIdInDisplayFrame = e.currentTarget.id;
};

for (let i = 0; videoFrames.length > i; i++) {
  videoFrames[i].addEventListener("click", expandVideoFrame);
}
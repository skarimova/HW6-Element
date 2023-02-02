const videoElement = document.getElementById('video');
const canvas = document.getElementById('canvas');
const blurBtn = document.getElementById('blur-btn');
const unblurBtn = document.getElementById('unblur-btn');
const ctx = canvas.getContext('2d');

blurBtn.addEventListener('click', e => {
  blurBtn.hidden = true;
  unblurBtn.hidden = false;

  videoElement.hidden = true;
  canvas.hidden = false;

  loadBodyPix();
});

unblurBtn.addEventListener('click', e => {
  blurBtn.hidden = false;
  unblurBtn.hidden = true;

  videoElement.hidden = false;
  canvas.hidden = true;
});

videoElement.onplaying = () => {
  canvas.height = videoElement.videoHeight;
  canvas.width = videoElement.videoWidth;
};

function startVideoStream() {
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(stream => {
      videoElement.srcObject = stream;
      videoElement.play();
    })
}

function loadBodyPix() {
  options = {
    multiplier: 0.75,
    stride: 32,
    quantBytes: 4
  }
  bodyPix.load(options)
    .then(net => perform(net))
    .catch(err => console.log(err))
}

async function perform(net) {
  while (blurBtn.hidden) {
    const segmentation = await net.segmentPerson(video);

    const backgroundBlurAmount = 26;
    const edgeBlurAmount = 2;
    const flipHorizontal = false;

    bodyPix.drawBokehEffect(
      canvas, videoElement, segmentation, backgroundBlurAmount,
      edgeBlurAmount, flipHorizontal);
  }
}

startVideoStream();
const constraints = {
  // 'video': true,
  'audio': {'echoCancellation': true},
}

// stream object
const stream = null
let mediaRecorder = null
let chunks = []

const videoElement = document.getElementById('localVideo'); //view
const savedMediaPlayer = document.getElementById('savedMedia');
const turnOnAudioBtn = document.querySelector('button#turn-on-audio');
const startRecordBtn = document.querySelector('button#startRecord')
const stopRecordBtn = document.querySelector('button#stopRecord')



async function init () {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    console.log(stream)
    // videoElement.srcObject = stream;
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = ev => {
      console.log('ondataavailable -----', chunks)
      chunks.push(ev.data);
    }
    mediaRecorder.onstop = (ev)=>{
      let blob = new Blob(chunks, { 'type' : 'audio/webm;' });
      let mediaURL = window.URL.createObjectURL(blob);
      savedMediaPlayer.src = mediaURL;
      console.log('blob ------', blob)
    }
    console.log("run init")
  } catch(error) {
    console.error('Error accessing media devices.', error);
  }
} 


function getConnectedDevices() {
  navigator.mediaDevices.enumerateDevices()
    .then(devices => {
      console.log("Connected device --------", devices)
      return devices
    })
    .catch(err => {
      console.log("error in connecting with devices ----- ", err)
    })
}

function getUpdatedDeviceList() {
  // add listener for device changed
  navigator.mediaDevices.addEventListener('devicechange', event => {
    console.log("Device Change ------- ")
    getConnectedDevices()
  })
}

// async function playVideoFromCamera() {
//   try {
//       let stream = await getMediaStream();
//       const videoElement = document.querySelector('video#localVideo');
//       videoElement.srcObject = stream;
//   } catch(error) {
//       console.error('Error opening video camera.', error);
//   }
// }



// turnOnAudioBtn.addEventListener("click", (ev) => {
//   playVideoFromCamera()
// })

startRecordBtn.addEventListener('click', ev => {
  mediaRecorder.start();
  console.log("recorder start --------", mediaRecorder.state);
})

stopRecordBtn.addEventListener('click', ev => {
  mediaRecorder.stop();
  console.log("recorder stop --------", mediaRecorder.state);
})

init()

console.log('abc')

// getMediaStream()
// getConnectedDevices()
// getUpdatedDeviceList()
// playVideoFromCamera()


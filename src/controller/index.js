export class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view 

    this.mediaDevices = navigator.mediaDevices
    this.mediaRecorder = null

    this.initStream()

    // this.getConnectedDevices()
    // this.getUpdatedDevicesOnDevicesChange()

  }

  getUserMedia(constraints) {
    navigator.mediaDevices.getUserMedia(constraints)
  }

  initStream = async () => {
    try {
      this.model.stream = await navigator.mediaDevices.getUserMedia(this.model.constraints)
      console.log('this.model.stream -------', this.model.stream)
      this.mediaRecorder = new MediaRecorder(this.model.stream);
      console.log('init mediaRecorder ------', this.mediaRecorder)

      this.mediaRecorder.ondataavailable = ev => {
        this.model.chunks.push(ev.data);
        console.log('ondataavailable -------', this.model.chunks)
      }
      this.mediaRecorder.onstop = (ev)=>{
        let blob = new Blob(this.model.chunks, { 'type' : 'audio/webm;' });
        let mediaURL = window.URL.createObjectURL(blob);
        this.view.savedMedia.src = mediaURL;
        console.log('onstop ------', 'blob --', blob, 'mediaURL ----', mediaURL)
      }
      this.view.addRecordBtnHandler(this.mediaRecorder.start(), this.mediaRecorder.state)
      this.view.addStopRecordBtnHandler(this.mediaRecorder.stop(), this.model.mediaRecorder.state)
    } catch(error) {
      console.log('Error accessing media devices.', error);
    }
  }

  // getConnectedDevices = async () => {
  //   try {
  //     this.model.connectedDevices = await navigator.mediaDevices.enumerateDevices()
  //   } catch(err) {
  //     console.log("error in connecting with devices ----- ", err)
  //   }
  // }

  // getUpdatedDevicesOnDevicesChange = () => {
  //   navigator.mediaDevices.addEventListener('devicechange', event => {
  //     // console.log("Device Change ------- ")
  //     this.getConnectedDevices()
  //   })
  // }

  // initMediaRecorder = stream => {
  //   console.log('abc')
  //   this.mediaRecorder = new MediaRecorder(stream)
  //   console.log("--------------------", this.mediaRecorder)
  //   this.mediaRecorder.ondataavailable = ev => {
  //     this.model.chunks.push(ev.data);
  //   }
  //   this.view.addRecordBtnHandler(this.mediaRecorder.start(), this.model.chunks)
  //   this.view.addStopRecordBtnHandler(this.mediaRecorder.stop(), this.model.chunks)
  //   this.mediaRecorder.onstop = ev =>{
  //     let that = this
  //     let blob = new Blob(that.model.chunks, { 'type' : 'audio/webm;' });
  //     let mediaURL = window.URL.createObjectURL(blob);
  //     this.view.savedMedia.src = mediaURL;
  //   }
  //   // // console.log('after addListener -------', this.mediaRecorder)
  //   // this.view.addRecordBtnHandler(this.mediaRecorder.start(), this.model.chunks)
  //   // this.view.addStopRecordBtnHandler(this.mediaRecorder.stop(), this.model.chunks)
  // }

  // init = async () => {
  //   await this.initStream()
  //   await this.initMediaRecorder(this.model.stream)
  //   console.log(this.mediaRecorder)
  // }
}  
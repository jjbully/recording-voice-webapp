export class View {
  constructor() {
    this.localMedia = document.getElementById('localMedia'); //view
    this.savedMedia = document.getElementById('savedMedia');
    this.turnOnAudioBtn = document.querySelector('button#turn-on-audio');
    this.startRecordBtn = document.querySelector('button#startRecord')
    this.stopRecordBtn = document.querySelector('button#stopRecord')
    // // add Event 
    // this.startRecordBtn.addEventListener('click', ev => {
    //   mediaRecorder.start();
    //   console.log("recorder start --------", mediaRecorder.state);
    // })

    // this.stopRecordBtn.addEventListener('click', ev => {
    //   mediaRecorder.stop();
    //   console.log("recorder stop --------", mediaRecorder.state);
    // })
    // console.log('localV')
  }

  addRecordBtnHandler = (handler, state, chunk) => {
    this.startRecordBtn.addEventListener('click', ev => {
      handler
      console.log("recorder start ----------", state)
      console.log("recorder start chunk ------", chunk)

    })
  }

  addStopRecordBtnHandler = (handler, state, chunk) => {
    this.stopRecordBtn.addEventListener('click', ev => {
      handler
      console.log("recorder stop ----------", state)
      console.log("recorder stop chunk ------", chunk)
    })
  }

  // addHandlerOnClickButton = (handler) => {
  //   element.addEventListener('click', ev => {
  //     handler
  //   })
  // }
}
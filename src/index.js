import { Model } from './model/index.js'
import { View } from './view/index.js'
import { Controller } from './controller/index.js'

const app = new Controller(new Model(), new View())

// const init = async() => {
//   await app.initStream()
//   await app.initMediaRecorder(app.model.stream)
// } 

// init()
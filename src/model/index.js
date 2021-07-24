export class Model {
  constructor() {
    this.constraints = {
      'video': true,
      // 'audio': {'echoCancellation': true},
      'audio': false
    }
    this.stream = null
    this.chunks = []
    this.connectedDevices = []
    this.savedMediaType = 'video/mp4;'
    // this.savedMediaType = 'video/mp4;'
  }
}
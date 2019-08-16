'use strict'

module.exports = class DriveState {
  constructor(driveState) {
    this.gpsDate = driveState.gps_as_of
    this.heading = driveState.heading
    this.latitude = driveState.latitude
    this.longitude = driveState.longitude
    this.nativeType = driveState.native_type
    this.power = driveState.power
    this.shiftState = driveState.shift_state
    this.speed = driveState.speed
    this.timestamp = driveState.timestamp
  }
}

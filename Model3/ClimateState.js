'use strict'

module.exports = class ClimateState {
  constructor(climateState) {
    this.timestamp = climateState.timestamp
    this.insideTemp = climateState.inside_temp
    this.outsideTemp = climateState.outside_temp
    this.isClimateOn = climateState.is_climate_on
    this.climateKeeperMode = climateState.climate_keeper_mode
    this.seatHeaterLeft = climateState.seat_heater_left
    this.seatHeaterRight = climateState.seat_heater_right
    this.driverTempSetting = climateState.driver_temp_setting
    this.passengerTempSetting = climateState.passenger_temp_setting
    this.fanStatus = climateState.fan_status
    this.driverTempSetting = climateState.driver_temp_setting
  }
}

'use strict'

module.exports = class ChargeState {
  constructor(chargeState) {
    this.timestamp = chargeState.timestamp
    this.isCharging = chargeState.charging_state
    this.batteryRange = chargeState.battery_range
    this.batteryLevel = chargeState.battery_level
    this.timeToFullCharge = chargeState.time_to_full_charge
    this.isChargeDoorOpen = chargeState.charge_port_door_open
    this.hasPowerToHeat = chargeState.not_enough_power_to_heat
    this.isBatteryHeaterOn = chargeState.battery_heater_on
  }
}

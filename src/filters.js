'use strict'

export function parseInt (val) {
	return parseInt(val)
}

export function windDirection (val) {
	let direction = ''
	if (val < 45) direction = 'North'
	else if (val > 45 && val < 90 ) direction = 'NorthEast'
	else if (val > 90 && val < 135) direction = 'East'
	else if (val > 135 && val < 180) direction = 'SouthEast'
	else if (val > 180 && val < 225) direction = 'South'
	else if (val > 225 && val < 270) direction = 'SouthWest'
	else if (val > 270 && val < 315) direction = 'West'
	else direction = 'NorthWest'
	return direction
}

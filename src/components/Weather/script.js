	export default {
		// set name of this component
		name: 'weather',

		data () {
			return {
				gotWeather: false,
				weather: {
					today: {
						time: 0,
						nearestStormDistance: 0,
						nearestStormBearing: 0,
						precipIntensity: 0,
						precipProbability: 0,
						temperature: 0,
						apparentTemperature: 0,
						dewPoint: 0,
						humidity: 0,
						windSpeed: 0,
						windBearing: 0,
						visibility: 0,
						cloudCover: 0,
						pressure: 0,
						ozone: 0
					},
					daily : {
						days: [],
						lows: [],
						highs: [],
						icons: [],
						summaries: []
					}
				},
				chart: {
					hours: [],
					temps: [],
					datasets: [],
					numberOfDataPoints: 24
				},
				units: {
					// speed, temp, pressure, distance
					us: ['mph', 'F', 'mbar', 'm'],
					ca: ['kph', 'C', 'hPa', 'km'],
					isCAUnits: true,
					unitsUsed: [],
					tempLabel : ''
				}
			}
		}, // end of data ()
		filters: {
			windDirection (val) {
				let direction = ''
				if (val < 45) direction = 'North'
				else if (val > 45 && val < 90) direction = 'NorthEast'
				else if (val > 90 && val < 135) direction = 'East'
				else if (val > 135 && val < 180) direction = 'SouthEast'
				else if (val > 180 && val < 225) direction = 'South'
				else if (val > 225 && val < 270) direction = 'SouthWest'
				else if (val > 270 && val < 315) direction = 'West'
				else direction = 'NorthWest'
				return direction
			}
		},
		methods: {
			createChart (isUnitChange) {

				// remove old canvas, create new one, append to DOM - erases any old chart data
				$('#myChart').remove()
				var newCanvas = $('<canvas/>',{'class': 'col-xs-12', 'id': 'myChart'})
				$('.chart').append(newCanvas)
				var ctx = $('#myChart')

				var myChart = new Chart(ctx, {
		    		type: 'line',
		    		data: {
						labels: this.chart.hours,
						datasets: [{
							label: this.units.tempLabel,
							data: this.chart.temps,
							backgroundColor: 'rgba(255, 206, 86, 0.1)',
							borderColor: 'rgba(255, 206, 86, 1)',
							borderWidth: 1
						}]
					},
					options: {
						scales : {
							xAxes : [{
								gridLines : {
									display : false
								}
							}],
							yAxes : [{
								gridLines : {
									display : false
								}
							}]
						}
					}
				})
			}
		},
		events: {
			// get geolocation info from google
			locationEvent (data) {
				this.gotWeather = true
				this.weather.city = data.data.results[1].formatted_address
			},
			// get weather data from forecast
			forecastEvent (data, isUnitChange) {

				// set table for CA or US units
				if(data.data.flags.units == 'ca'){
					this.units.unitsUsed = this.units.ca
					this.units.tempLabel = 'Temperature \u00b0C'
				} else {
					this.units.unitsUsed = this.units.us
					this.units.tempLabel = 'Temperature \u00b0F'
				}

				this.gotWeather = true
				this.weather.today.time = data.data.currently.time,
				this.weather.today.nearestStormDistance = data.data.currently.nearestStormDistance,
				this.weather.today.nearestStormBearing = data.data.currently.nearestStormBearing,
				this.weather.today.precipIntensity = data.data.currently.precipIntensity,
				this.weather.today.precipProbability = data.data.currently.precipProbability,
				this.weather.today.temperature = data.data.currently.temperature,
				this.weather.today.apparentTemperature = data.data.currently.apparentTemperature,
				this.weather.today.dewPoint = data.data.currently.dewPoint,
				this.weather.today.humidity = data.data.currently.humidity,
				this.weather.today.windSpeed = data.data.currently.windSpeed,
				this.weather.today.windBearing = data.data.currently.windBearing,
				this.weather.today.visibility = data.data.currently.visibility,
				this.weather.today.cloudCover = data.data.currently.cloudCover,
				this.weather.today.pressure = data.data.currently.pressure,
				this.weather.today.ozone = data.data.currently.ozone

				// reset arrays
				this.weather.daily.days.length = 0
				this.weather.daily.days.length = 0
				this.weather.daily.lows.length = 0
				this.weather.daily.highs.length = 0
				this.weather.daily.icons.length = 0
				this.weather.daily.summaries.length = 0

				this.chart.hours.length = 0
				this.chart.temps.length = 0
				let numberOfPoints = 0

				// set hourly data
				data.data.hourly.data.forEach( (theHour, index) => {
					// convert to unix time and get current hour - set to AM or PM
					let time = new Date(theHour.time * 1000).getHours()
					if (time > 12) 
						time = (time - 12)  + "pm"
					else if (time == 0) 
						time = "12am"
					else 
						time = time + "am"

					// only get a certain amount of hours (24 default)
					if (numberOfPoints < this.chart.numberOfDataPoints) {
						this.chart.hours.push(time)
						this.chart.temps.push(parseInt(theHour.temperature))
						numberOfPoints++
					}
				})

				this.createChart(isUnitChange)

				// get daily data
				data.data.daily.data.forEach((theDay, index) => {
					if (index < 6 && index > 0) {
						this.weather.daily.days.push(theDay.time * 1000)
						this.weather.daily.lows.push(theDay.temperatureMin)
						this.weather.daily.highs.push(theDay.temperatureMax)
						this.weather.daily.icons.push(theDay.icon)
						this.weather.daily.summaries.push(theDay.summary)
					}
				})
			} // end of forecastEvent method
		}, // end of events
		created () {
			this.$dispatch('getCoordinatesEvent')
		}
	}
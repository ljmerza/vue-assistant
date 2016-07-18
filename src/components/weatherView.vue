<template>
	<!--template can only have one root element or will become fragment instance and not be passed prop variables-->
	<div class='weatherPanel'>
		<div class="panel panel-default">
			<div class="panel-body text-center">
				<!--use moment.js to set time format with moment filter-->
				<h1>{{ someDay | moment "dddd" }}</h1>
				<h3>{{ someDate | moment "MMMM Do" }}</h3>
			</div>
		</div>
		<div class="panel panel-default">
			<div class="panel-header">
				<div class="text-center" >
					<!--show city if data collected else show button to manually get coordinates-->
					<h2 v-show=weather.city> {{ weather.city }}</h2>
					<div v-show=!weather.city>
						<h6>To get weather data, allow location</h6>
						<button class="btn btn-default-btn-lg" @click='getCoordinatesFromParent()'>Here</button>
					</div>
				</div>
			</div>
			<div class="panel-body">
				<div class="container-fluid">
					<div class="row">
						<div class="col-xs-12 col-md-7">
							<h1 v-show=weather.temp>{{ weather.temp | parseInt }}&deg;</h1>
						</div>
						<div class="col-xs-12 col-md-5">
							<div class="weather-img" v-bind:class='weather.weatherImgClass'></div>
						</div>
					</div>
					<div class="row">
						<div class="col-xs-12">
							<h4 v-show=weather.description>{{ weather.description }}</h4>
							<h4 v-show=weather.temp_min>{{ weather.temp_min | parseInt }}&deg; / {{ weather.temp_max | parseInt }}&deg;</h4>
						</div>
					</div>
				</div>
			</div>
			<div class="panel-footer">
				<div class="row">
					<div class="col-xs-6">
						<span>humidity:&nbsp;</span><h4 v-show=weather.humidity>{{ weather.humidity | parseInt}}</h4><span>%</span>
					</div>
					<div class="col-xs-6">
						<span>wind:&nbsp;</span><h4 v-show=weather.wind>{{ weather.wind | parseInt}}</h4><span>{{ units.unitsUsed[0] }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
	export default {
		// set name of this component
		name: 'weatherView',

		// initialize all variables
		// use return so new variables for each component instance
		data () {
			return {
				weather: {
					city: '',
					temp: 0,
					temp_min: 0,
					temp_max: 0,
					humidity: 0,
					description: '',
					wind: 0,
					weatherImgClass: ''
				},
				coordinates: {
					lat: 0,
					long: 0
				},
				units: {
					// speed, temp, pressure, distance
					us: ['mph', 'F', 'mbar', 'm'],
					ca: ['kph', 'C', 'hPa', 'km'],
					isCAUnits: true,
					unitsUsed: []
				}
			}
		},
		events: {
			locationEvent (data) {
				this.weather.city = data.data.results[1].formatted_address
			},
			forecastEvent (data) {
				// set table for CA or US units
				if (data.data.flags.units === 'ca') {
					this.units.unitsUsed = this.units.ca
					this.units.tempLabel = 'Temperature \u00b0C'
				} else {
					this.units.unitsUsed = this.units.us
					this.units.tempLabel = 'Temperature \u00b0F'
				}

				this.weather.temp = data.data.currently.temperature
				this.weather.temp_min = data.data.daily.data[0].temperatureMax
				this.weather.temp_max = data.data.daily.data[0].temperatureMin
				this.weather.humidity = data.data.currently.humidity * 100
				this.weather.description = data.data.currently.summary
				this.weather.wind = data.data.currently.windSpeed
				this.weather.weatherImgClass = data.data.currently.icon
			},
			getWeatherEvent (coord) {
				this.coordinates.lat = coord.lat
				this.coordinates.long = coord.long
				this.getWeather()
			}
		}
	}
</script>

<style src='./weatherView/style.sass' lang='sass?indentedSyntax'></style>
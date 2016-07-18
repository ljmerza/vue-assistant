import weatherView from '../weatherView.vue'

  export default {
    components: { 'weatherView': weatherView },
    data () {
      return {
        coordinates: {
          lat: 0,
          long: 0
        },
        units: 'us',
        isUS: true
      }
    },
    methods: {
      getCoordinates () {
        navigator.geolocation.getCurrentPosition((position) => {
          this.coordinates.lat = position.coords.latitude
          this.coordinates.long = position.coords.longitude
          this.getForecast()
          this.getLocationInfo()
        })
      },
      getLocationInfo () {
        // get geo location data from google
        this.$http.post('api/googleGeo', {
          lat: this.coordinates.lat,
          long: this.coordinates.long
        })
        .then((data) => {
          this.$broadcast('locationEvent', data)
        })
      },
      getForecast (isUnitChange) {
        // get weather data from forecast.io
        this.$http.post('/api/forecast', {
          lat: this.coordinates.lat,
          long: this.coordinates.long,
          units: this.units
        })
        .then((data) => {
          this.$broadcast('forecastEvent', data, isUnitChange)
        })
      },
      changeUnits () {
        this.isUS = !this.isUS
        if (this.isUS) this.units = 'us'
        else this.units = 'ca'
        this.getForecast(true)
      }
    },
    // when component created get coordinates
    created () {
      this.getCoordinates()
    },
    events: {
      getCoordinatesEvent () {
        this.getCoordinates()
      },
      changeWeatherUnitsEvent (unit) {
        this.coordinates.units = unit
      }
    }
  }
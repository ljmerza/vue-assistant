'use strict'

let http = require('http')
let express  = require('express')
let request = require('request')
let bodyParser = require('body-parser')


let app = express()
const port = process.env.PORT || 3000

app.set('trust proxy', true)
app.set('x-powered-by', false)
app.set('view cache', true)


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/redditRSS', function (req, res, next) {
	request.get('https://www.reddit.com/r/' + req.body.rssReddits + '/.rss').pipe(res)
})
app.post('/forecast', function (req, res, next) {
	let url = `https://api.forecast.io/forecast/5c24bad8bd02811fc9b44dc8db10b2dc/${req.body.lat},${req.body.long}/?units=${req.body.units}&exclude=[minutely]`
	request.get(url).pipe(res)
})
app.post('/googleGeo', function (req, res, next) {
	request.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.body.lat},${req.body.long}&key=AIzaSyAO8FuIFN6yDLZ-R7IN4OLhqhwGzoDSEaA`).pipe(res)
})





// create error handle if main
if(require.main === module) {
	app.use('*', function (err, req, res, next) {
		console.log(err)
	})
}
// create server object
let server = http.createServer(app)
// booting up server function
let boot = function() {
	server.listen(port, function() {
		console.log('Express server listening on port', port)
	})
}
// shutdown server function
let shutdown = function() {
	server.close()
}

// if main module then start server else pass to exports
if(require.main === module) {
	boot()
} else {
	console.log('Running vue assistant app as module')
	module.exports = {
		boot: boot,
		shutdown: shutdown,
		port: port,
		server: server,
		app: app
	}
}




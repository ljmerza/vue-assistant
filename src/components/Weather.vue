<template>
<div class='weather'>
	<div class="panel panel-default">
    	<div class="panel-header">
    	</div>
    	<div class="panel-body">
    		<div class="container-fluid">
					<div class="row top-row">
						<div class="col-xs-12 col-md-8 chart">
							<canvas id="myChart" class="col-xs-12"></canvas>
						</div>
						<div class="col-xs-12 col-md-4">	
							<table>	
								<tr>
									<td>Temperature:</td>
									<td>{{ weather.today.temperature | parseInt }}&#176;{{ units.unitsUsed[1] }}</td>
								</tr>
								<tr>
									<td>Apparent Temperature:</td>
									<td>{{ weather.today.apparentTemperature | parseInt }}&#176;{{ units.unitsUsed[1] }}</td>
								</tr>
								<tr>
									<td>Humidity:</td>
									<td>{{ weather.today.humidity * 100 }}%</td>
								</tr>
								<tr>
									<td>Wind Speed:</td>
									<td>{{ weather.today.windSpeed | parseInt }}{{ units.unitsUsed[0] }}</td>
								</tr>
								<tr>
									<td>Wind bearing::</td>
									<td>{{ weather.today.windBearing | windDirection }}</td>
								</tr>
								<tr>
									<td>Visibility:</td>
									<td>{{ weather.today.visibility }}{{ units.unitsUsed[3] }}</td>
								</tr>
								<tr>
									<td>Pressure:</td>
									<td>{{ weather.today.pressure | parseInt }}{{ units.unitsUsed[2] }}</td>
								</tr>
								<tr>
									<td>Cloud Cover:</td>
									<td>{{ weather.today.cloudCover * 100 | parseInt }}%</td>
								</tr>
							</table>
						</div>
					</div>

    			<div class="row">
    				<div class="col-md-1"></div>
    				<div class="flex-container">
    					<div class="weather-day" v-for="date in weather.daily.days" track-by="$index">
	    					<h2 class='text-center'>{{ date | moment "dddd" }}</h2>
	    					<div class="weather-img" v-bind:class='weather.daily.icons[$index]'></div>
	    					
	    					<h4 class='text-center'>{{ weather.daily.lows[$index] | parseInt }}&#176; / {{ weather.daily.highs[$index] | parseInt }}&#176;</h4>
	    					<h6 class='text-center'>{{ weather.daily.summaries[$index] }}</h6>	
    					</div>
    				</div>
    				
    			</div>
    		</div>
    	</div>
    </div>
</div>
  
</template>

<script src='./weather/script.js'></script>
<style src='./weather/style.sass' lang='sass?indentedStyle'></style>
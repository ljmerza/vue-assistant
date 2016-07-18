<template>
  <div class="main-app">

    <!--navbar-->
    <nav class="navbar navbar-default">
      <div class="container">
        <ul class="nav navbar-nav">
          <li><a v-link="'/rss'">News</a></li>
          <li><a v-link="'/weather'">Weather</a></li>          
        </ul>
      </div>
      <div class="unit-change">
        <input type="checkbox" class="toggle-switch switch-gender" @click='changeUnits()'></input>
      </div>
    </nav>
    
    <!--container for time tracker-->
    <div class="container-fluid">
      <div class="row">
        <!--total time panel-->
        <div class="col-xs-12 col-md-3">
          <weather-view :coordinates:coordinates></weather-view>
        </div><!--total time panel-->

        <!--router element-->
        <div class="col-xs-12 col-md-9 little-padd rss-view">
          <router-view></router-view>
        </div><!--router element-->
      </div>
    </div><!--container for time tracker-->
  </div>

</template>

<script src='./components/App/script.js'></script>
<style src='./components/app/style.sass' lang='sass?indentedStyle'></style>





"use strict";angular.module("homeydashV3App",["ngAnimate","ngResource","ngSanitize","ngMaterial","ui.router"]).config(["$mdThemingProvider",function(a){a.theme("default").primaryPalette("orange").accentPalette("orange")}]).run(["$rootScope","alldevices","$timeout",function(a,b,c){var d=function(){b().then(function(b){a.devicelist=b.data.result}),c(d,2e3)};c(d,2e3)}]).run(["$rootScope","$state",function(a,b){a.$on("$stateChangeStart",function(a,c,d){c.redirectTo&&(a.preventDefault(),b.go(c.redirectTo,d,{location:"replace"}))})}]).config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("/"),a.state("setup",{url:"/setup",templateUrl:"views/setup.html",redirectTo:"setup.general"}).state("setup.general",{url:"/general",templateUrl:"views/setup-general.html",data:{selectedTab:0}}).state("setup.pages",{url:"/pages",templateUrl:"views/setup-pages.html",data:{selectedTab:1}}).state("setup.widgets",{url:"/widgets",templateUrl:"views/setup-widgets.html",data:{selectedTab:2}}).state("setup.plugins",{url:"/plugins",templateUrl:"views/setup-plugins.html",data:{selectedTab:3}}).state("main",{url:"/",templateUrl:"views/main.html"}).state("main.page",{url:"page/:pagename",templateUrl:"views/device-page.html"})}]),angular.element(document).ready(function(){var a=angular.injector(["ng"]),b=a.get("$http");b.get("config.json").then(function(a){var b=a.data;b.httpconfig={headers:{Authorization:"Bearer "+a.data.bearertoken,"Content-Type":"application/json"}},angular.module("homeydashV3App").constant("CONFIG",b),angular.module("homeydashV3App").run(["$rootScope","CONFIG",function(a,b){a.CONFIG=b}]),console.log(b),angular.bootstrap(document,["homeydashV3App"])})}),angular.module("homeydashV3App").controller("MainCtrl",["$scope","$stateParams","device","$rootScope",function(a,b,c,d){a.sidebarWidth="flex-20",a.params=b,a.click=function(a,b){b?c.onoff(a,!1).then(function(){d.devicelist[a].state.onoff=!1}):c.onoff(a,!0).then(function(){d.devicelist[a].state.onoff=!0})}}]),angular.module("homeydashV3App").controller("SetupCtrl",["$scope",function(a){a.$on("$stateChangeSuccess",function(b,c){a.currentTab=c.data.selectedTab})}]),angular.module("homeydashV3App").factory("alldevices",["CONFIG","$http",function(a,b){var c={};return c=function(){return b.get("//"+a.homeyip+"/api/manager/devices/device/",a.httpconfig)}}]),angular.module("homeydashV3App").factory("device",["CONFIG","$http",function(a,b){var c={};return c.onoff=function(c,d){return b.put("//"+a.homeyip+"/api/manager/devices/device/"+c+"/state",{onoff:d},a.httpconfig)},c.dim=function(c,d){return b.put("//"+a.homeyip+"/api/manager/devices/device/"+c+"/state",{dim:d},a.httpconfig)},c}]),angular.module("homeydashV3App").run(["$templateCache",function(a){a.put("views/device-page.html",'<div layout-padding flex="100" flex-xs="100" flex-xs="100" style="position:relative"> <h2 style="display:inline;color:white;text-transform:uppercase;font-weight:300">{{params.pagename}}</h2> <!-- <md-icon style="color:white;position:absolute;top:0px;right:10px;">settings</md-icon> --> </div> <widget ng-repeat="widget in CONFIG.pages[params.pagename].widgets" ng-include="\'views/\' + widget.capability + \'.html\'" flex="25" flex-xs="100" flex-xs="100"> </widget>'),a.put("views/hdlight.html",'<md-card> <md-card-content layout="row" layout-wrap style="padding:0;margin:0"> <md-list flex="100" style="padding:0;margin:0"> <md-list-item class="md-2-line" style="padding:0;margin:0"> <img ng-if="data.cb1 == true || data.slider > 0" ng-src="../images/icons/light_on.a7fbcd5d.png" class="md-avatar" alt="icon"> <img ng-if="data.cb1 == false || data.slider == 0" ng-src="../images/icons/light_off.2a03f53e.png" class="md-avatar" alt="icon"> <div class="md-list-item-text" layout="column" style="margin-botton:0px"> <h3>Staande lamp</h3> <h4>Woonkamer</h4> </div> </md-list-item> </md-list> <div flex="100" layout-align="center start" style="min-height:48px;height:48px;max-height:48px;margin:0px 20px 0px 20px"> <md-switch ng-show="type == \'switch\'" style="max-width:80px;margin:0 auto" ng-model="data.cb1" aria-label="Switch 1"> <span ng-if="data.cb1">On</span> <span ng-if="!data.cb1">Off</span> </md-switch> <md-slider ng-show="type == \'slider\'" style="margin:0 auto" ng-model="data.slider" flex min="0" max="100" aria-label="dim"> </md-slider> </div> </md-card-content> </md-card>'),a.put("views/main.html",'<div class="sidebar md-whiteframe-5dp" ng-class="{\'sidebar-width\':sidebarWidth}"> <center><img src="images/logo.350fc2f6.png" style="padding:5px"></center> <md-list flex> <md-list-item class="md-1-line" ng-click="null" ng-repeat="(key,value) in CONFIG.pages" ui-sref="main.page({pagename: \'{{key}}\'})"> <div class="md-list-item-text" layout="column"> {{key}} </div> <md-divider ng-if="!$last"></md-divider> </md-list-item> </md-list> </div> <md-content flex layout="row" layout-padding layout-wrap layout-align="start start" md-scroll-y style="background-color:rgba(255, 255, 255, 0)" ui-view> <div layout-padding flex="100" flex-xs="100" flex-xs="100" style="position:relative"> <h2 style="color:white;text-transform:uppercase;font-weight:300"><md-icon style="color:white">keyboard_arrow_left</md-icon> Open a page in the sidebar on the left </h2> <!-- <md-icon style="color:white;position:absolute;top:0px;right:10px;">settings</md-icon> --> </div> </md-content>'),a.put("views/onoff.html",'<md-card> <md-card-content layout="row" layout-wrap style="padding:0;margin:0"> <md-list flex="100" style="padding:0;margin:0"> <md-list-item class="md-2-line" style="padding:0;margin:0"> <img ng-if="devicelist[widget.deviceid].state.onoff" ng-src="images/icons/light_on.a7fbcd5d.png" class="md-avatar" alt="icon"> <img ng-if="!devicelist[widget.deviceid].state.onoff" ng-src="images/icons/light_off.2a03f53e.png" class="md-avatar" alt="icon"> <div class="md-list-item-text" layout="column" style="margin-botton:0px"> <h3>{{devicelist[widget.deviceid].name}}</h3> <h4>{{devicelist[widget.deviceid].zone.name}}</h4> </div> </md-list-item> </md-list> <div flex="100" layout-align="center start" style="min-height:48px;height:48px;max-height:48px;margin:0px 20px 0px 20px"> <md-switch ng-click="click(widget.deviceid, devicelist[widget.deviceid].state.onoff)" style="max-width:80px;margin:0 auto" ng-model="devicelist[widget.deviceid].state.onoff" aria-label="Switch 1"> <span ng-if="devicelist[widget.deviceid].state.onoff">On</span> <span ng-if="!devicelist[widget.deviceid].state.onoff">Off</span> </md-switch> </div> </md-card-content> </md-card>'),a.put("views/setup-general.html","<p>This is the setup-general view.</p>"),a.put("views/setup-pages.html",'<md-list class="md-dense" flex="30"> <md-list-item> <md-button style="width:100%" class="md-raised">add new page</md-button> </md-list-item> <!-- {{(CONFIG.pages | filter : {pagename: \'Woonkamer\'})[0].widgets }} --> <md-list-item class="md-2-line" ng-repeat="page in CONFIG.pages" ng-click="null"> <div class="md-list-item-text"> <h3>{{page.pagename}}</h3> <p>{{page.widgets.length}} widgets</p> </div> <md-button class="md-secondary md-icon-button md-warn" ng-click="null"> <md-icon>delete</md-icon> </md-button> <md-divider ng-if="!$last"></md-divider> </md-list-item> </md-list> <md-content flex="70" layout="row" layout-wrap> <div flex="25" ng-repeat="widget in (CONFIG.pages | filter : {pagename: \'Keuken\'})[0].widgets"> {{widget.widgetname}} </div> </md-content>'),a.put("views/setup-plugins.html","<p>This is the setup-plugins view.</p>"),a.put("views/setup-widgets.html","<p>This is the setup-widgets view.</p>"),a.put("views/setup.html",'<div style="width:100%;height:100%" layout="row" layout-wrap layout-align="center center" ng-controller="SetupCtrl"> <md-card flex="70" style="height:70%"> <md-tabs md-stretch-tabs="always" style="background-color:rgba(82, 82, 82, 0.1)" md-selected="currentTab"> <md-tab ui-sref="setup.general" label="General"></md-tab> <md-tab ui-sref="setup.pages" label="Pages"></md-tab> <md-tab ui-sref="setup.widgets" label="Widgets"></md-tab> <md-tab ui-sref="setup.plugins" label="Plugins"></md-tab> </md-tabs> <md-card-content style="overflow: scroll" ui-view layout="row" layout-wrap layout-align="start start"> </md-card-content> <md-card-footer style="text-align:right"> <md-button class="md-raised md-primary"> Save </md-button> </md-card-footer> </md-card> </div>'),a.put("views/temperature.html",'<md-card> <md-card-content layout="row" layout-wrap style="padding:0;margin:0"> <md-list flex="100" style="padding:0;margin:0"> <md-list-item class="md-2-line" style="padding:0;margin:0"> <img ng-src="../images/icons/temperature.a0375e2c.png" class="md-avatar" alt="icon"> <div class="md-list-item-text" layout="column" style="margin-botton:0px"> <h3>Thermostaat</h3> <h4>Woonkamer</h4> </div> </md-list-item> </md-list> <div flex="100" layout-align="center start" style="min-height:48px;height:48px;max-height:48px;margin:0px 20px 0px 20px"> <h3 style="font-weight:200;margin:0 auto;text-align:center">20.8 °C</h3> </div> </md-card-content> </md-card>')}]);
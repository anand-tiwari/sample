MyApp.factory('ViewService', function ($http, $state, $log,$q) {

	function renderFusionCharts(totalQuestion, rightChoice){
		FusionCharts.ready(function () {
		    var revenueChart = new FusionCharts({
		        type: 'doughnut3d',
		        renderAt: 'chartContainer',
		        width: '450',
		        height: '400',
		        dataFormat: 'json',
		        dataSource: {
		            "chart": {
		                "caption": "Percentage correctanswer",
		                "subcaption":"TotalQuestion = "+(totalQuestion+1)+"\n RIGHT = "+rightChoice,
		                "numberPrefix": "$",
		                "paletteColors": "#0075c2,#1aaf5d,#f2c500,#f45b00,#8e0000",
		                "bgColor": "#ffffff",
		                "showBorder": "0",
		                "use3DLighting": "0",
		                "showShadow": "0",
		                "enableSmartLabels": "0",
		                "startingAngle": "310",
		                "showLabels": "0",
		                "showPercentValues": "1",
		                "showLegend": "1",
		                "legendShadow": "0",
		                "legendBorderAlpha": "0",                                
		                "decimals": "0",
		                "captionFontSize": "14",
		                "subcaptionFontSize": "14",
		                "subcaptionFontBold": "0",
		                "toolTipColor": "#ffffff",
		                "toolTipBorderThickness": "0",
		                "toolTipBgColor": "#000000",
		                "toolTipBgAlpha": "80",
		                "toolTipBorderRadius": "2",
		                "toolTipPadding": "5",
		            },
		            "data": [
		                {
		                    "label": "Wrong",
		                    "value": totalQuestion-rightChoice
		                }, 
		                {
		                    "label": "Correct",
		                    "value": rightChoice
		                }
		            ]
		        }
		    }).render();
  		});
	};
	function getData(){
		var defer = $q.defer();
		$.ajax({
            type: 'GET',
            url:  "data.json",
            cache: 'false',
            dataType: 'json',
            success: function(res){
                defer.resolve({data:res});
            }
        });
	};

	return{
        renderFusionCharts:renderFusionCharts,
        getData:getData
    };
});
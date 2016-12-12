MyApp
    .controller('homeController', ['$scope','$http','$state','$stateParams', function($scope, $http, $state, $stateParams) {

        $.ajax({
            type: 'GET',
            url:  "public/components/MyApp/controllers/data.json",
            cache: 'false',
            dataType: 'json',
            success: function(res){
              $scope.Questions = res.data;
              $scope.totalPage = $scope.Questions.length-1;
              $scope.ques = $scope.Questions[$scope.currentpage];
            }
        });

    // simple signup and logout        
    $scope.username="anand";
    $scope.openSidebar= false;
    $scope.open='';

    $scope.home = true;
    $scope.signupForm = function() {
      $state.go('question');
      $scope.home = false;
    };

    $scope.logout = function(){
      $state.go('home');
      $scope.home = true;
    };

    $scope.currentpage = 0;
    $scope.completed = false;
    $scope.numberOfCorrectAnswer = 0 ;

    $scope.answer = function(ans){
        if($scope.Questions[$scope.currentpage]["correctanswer"]==ans){
          $scope.Questions[$scope.currentpage]["useranswer"] = true;
          $scope.numberOfCorrectAnswer++;
        }else{
          $scope.Questions[$scope.currentpage]["useranswer"] = false;
        }
        console.log($scope.Questions);
    };

    $scope.next = function(){
        $scope.currentpage++;
        $scope.ques = $scope.Questions[$scope.currentpage];
        $(document).ready(function(){
            $('.ripple-effect-wrap').remove();
        });
    };

    $scope.prev = function(){
        $scope.currentpage--;
        $scope.ques = $scope.Questions[$scope.currentpage];
        $(document).ready(function(){
            $('.ripple-effect-wrap').remove();
        });
    };

    $scope.finish = function(){
        $scope.completed=true;
        $(document).ready(function(){
            $('.ripple-effect-wrap').remove();
        });
        console.log($scope.Questions);
        // $scope.newArray = $scope.Questions;
    };
// $scope.chartRenderId = Math.random()
FusionCharts.ready(function () {
    var revenueChart = new FusionCharts({
        type: 'doughnut3d',
        renderAt: 'chartRenderId',
        width: '450',
        height: '400',
        dataFormat: 'json',
        dataSource: {
            "chart": {
                "caption": "Percentage correctanswer",
                "subcaption":"TotalQuestion = "+($scope.totalPage+1)+"\n RIGHT = "+$scope.numberOfCorrectAnswer,
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
                    "value": $scope.totalPage-$scope.numberOfCorrectAnswer
                }, 
                {
                    "label": "Correct",
                    "value": $scope.numberOfCorrectAnswer
                }
            ]
        }
    }).render();
  });

}]).directive('simpleNavbar', function () {
   return {
     restrict: 'E',
     replace:true,
     templateUrl: 'public/components/MyApp/templates/navbar.html',
     controller: 'homeController'
   };
});
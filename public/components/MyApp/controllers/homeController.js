MyApp
    .controller('homeController', ['$scope','$http','$state','$stateParams', function($scope, $http, $state, $stateParams) {

      $scope.Questions = [
    {
      "name": "What is the province that starts with the letter O?",
      "optionOne": "Ontario",
      "optionTwo": "New Brunswick",
      "optionThree": "Manitoba",
      "optionFour": "Quebec",
      "correctanswer":"Ontario",
      "useranswer":false
    },
    {
      "name": "What province begins with the letter Q?",
      "optionOne": "Ontario",
      "optionTwo": "New Brunswick",
      "optionThree": "Quebec",
      "optionFour": "Manitoba",
      "correctanswer":"Quebec",
      "useranswer":false
    },
    {
      "name": "Which of these provinces start with 'New'?",
      "optionOne": "Ontario",
      "optionTwo": "New Brunswick",
      "optionThree": "Quebec",
      "optionFour": "Manitoba",
      "correctanswer":"New Brunswick",
      "useranswer":false
    },
    {
      "name": "Which of these begin with the word 'Man'?",
     "optionOne": "Ontario",
      "optionTwo": "New Brunswick",
      "optionThree": "Quebec",
      "optionFour": "Manitoba",
      "correctanswer":"Manitoba",
      "useranswer":false
    },
    {
      "name": "Which of these begin with the word 'Nova'?",
       "optionOne": "Ontario",
      "optionTwo": "New Brunswick",
      "optionThree": "Nova Scotia",
      "optionFour": "Manitoba",
      "correctanswer":"Nova Scotia",
      "useranswer":false
    }
  ];
      
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
    $scope.totalPage = $scope.Questions.length-1;
    $scope.ques = $scope.Questions[$scope.currentpage];
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
    };

    $scope.finish = function(){
        $scope.completed=true;
    };

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


$(document).ready(function(){
  $('.ripple-effect').on('click', function(e){
      $('.ripple-effect-wrap').fadeOut();
      addColor($(this),e);
  });
  function addColor(current,e){
      var the_dom = current;
      var the_dom_limit = the_dom;
      var the_dom_offset = the_dom_limit.offset();    
      var click_x = e.pageX;
      var click_y = e.pageY;
      var the_dom_width = the_dom_limit.outerWidth();
      var the_dom_height = the_dom_limit.outerHeight();
      var ripple_effect_wrap = $('<span class="ripple-effect-wrap"></span>');
      ripple_effect_wrap.css({
        'width'     : the_dom_width,
        'height'    : the_dom_height,
        'position'    : 'absolute',
        'top'     : the_dom_offset.top,
        'left'      : the_dom_offset.left,
        'z-index'     : 100,
        'overflow'    : 'hidden',
        'background-clip' : 'padding-box'
      });
      ripple_effect_wrap.appendTo('body');

      var click_x_ripple = click_x - the_dom_offset.left;
      var click_y_ripple = click_y - the_dom_offset.top;
      var circular_width = 100;

      var ripple = $('<span class="ripple"></span>');
      ripple.css({
        'width'       : circular_width,
        'height'      : circular_width,
        'background'      : 'rgba(0,0,0,0.3)',
        'position'      : 'absolute',
        'top'       : click_y_ripple - ( circular_width / 2 ),
        'left'        : click_x_ripple - ( circular_width / 2 ),
        'content'     : '',
        'background-clip'     : 'padding-box',
        '-webkit-border-radius'       : '50%',
        'border-radius'               : '50%',
        '-webkit-animation-name'  : 'ripple-animation',
        'animation-name'                : 'ripple-animation',
        '-webkit-animation-duration'    : '6s',
        'animation-duration'            : '6s',
        '-webkit-animation-fill-mode'   : 'both',
        'animation-fill-mode'           : 'both'        
      });
      $('.ripple-effect-wrap:last').append( ripple);
    }; 
});

}]).directive('simpleNavbar', function () {
   return {
     restrict: 'E',
     replace:true,
     templateUrl: 'public/components/MyApp/templates/navbar.html',
     controller: 'homeController'
   };
});


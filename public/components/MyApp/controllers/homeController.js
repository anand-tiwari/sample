MyApp
    .controller('homeController', ['$scope','$http','$state','$stateParams','ViewService', function($scope, $http, $state, $stateParams, ViewService) {
    $scope.start = function(){
        $.ajax({
            type: 'GET',
            url:  "data.json",
            cache: 'false',
            dataType: 'json',
            success: function(res){
                $scope.Questions = res;
                $scope.totalPage = $scope.Questions.length-1;
                $scope.ques = $scope.Questions[$scope.currentpage];
            }
        });
        $scope.correctanswerCount = 0 ;
        $scope.home = true;
        $scope.username;
        $scope.openSidebar= false;
        $scope.open='';
        $scope.currentpage = 0;
        $scope.completed = false;
        $scope.disableButton = true;
    };
    // simple signup and logout    
    $scope.signupForm = function() {
      $state.go('question');
      $scope.home = false;
    };

    $scope.logout = function(){
      $state.go('home');
      $scope.home = true;
    };
    $scope.answer = function(ans){
        $scope.Questions[$scope.currentpage]["useranswer"] = ans;
        if($scope.Questions[$scope.currentpage]["correctanswer"]==ans){
            $scope.Questions[$scope.currentpage]["count"] = 1;
        }else{
            $scope.Questions[$scope.currentpage]["count"] = 0;
        }
        $scope.disableButton = false;
    };

    $scope.next = function(){
        $scope.currentpage++;
        $scope.ques = $scope.Questions[$scope.currentpage];
        $(document).ready(function(){
            $('.ripple-effect-wrap').remove();
        });
       $scope.disableButton = true;  
    };

    $scope.prev = function(){
        $scope.currentpage--;
        $scope.ques = $scope.Questions[$scope.currentpage];
        $(document).ready(function(){
            $('.ripple-effect-wrap').remove();
        });
    };

    $scope.whatClassIsIt = function(correctanswer, option, useranswer){
        if(correctanswer==option)
            return 'correct';
        else if(useranswer==option)
            return 'wrong';
    }

    $scope.finish = function(){
        $scope.completed=true;
        $(document).ready(function(){
            $('.ripple-effect-wrap').remove();
        });
        angular.forEach($scope.Questions, function(value,key){
            if(value.count==1){
                $scope.correctanswerCount++;
            }
        });    
    };

    $scope.showResult = function(){
        $state.go('result');
        setTimeout(function(){
          ViewService.renderFusionCharts({'right':$scope.correctanswerCount, 'total':parseInt($scope.totalPage)+1});
        },1000);
    };
}]).directive('simpleNavbar', function () {
   return {
     restrict: 'E',
     replace:true,
     templateUrl: 'public/components/MyApp/templates/navbar.html'
   };
});
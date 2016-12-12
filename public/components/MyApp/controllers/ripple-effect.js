MyApp.directive('rippleEffect', function($timeout) {
    return {
        restrict: 'C',
        link: function(scope, element, attrs) {
            element.on('click', function(e) {
              $('.ripple-effect-wrap').fadeOut();
              var the_dom = $(this);
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
                '-webkit-animation-duration'    : '2s',
                'animation-duration'            : '2s',
                '-webkit-animation-fill-mode'   : 'both',
                'animation-fill-mode'           : 'both'        
              });
              $('.ripple-effect-wrap:last').append(ripple);
            })
          }
        }
    });


MyApp.directive('ripple', function($timeout) {
    return {
        restrict: 'C',
        link: function(scope, element, attrs) {
            element.on('click', function(event) {
                event.preventDefault();

                var $div = angular.element('<div></div>'),
                    btnOffset = $(this).offset(),
                    xPos = event.pageX - btnOffset.left,
                    yPos = event.pageY - btnOffset.top;

                $div.addClass('ripple-effect');
                var $ripple = angular.element(".ripple-effect");

                $ripple.css("height", $(this).height());
                $ripple.css("width", $(this).height());
                $div.css({
                        top: yPos - ($ripple.height() / 2),
                        left: xPos - ($ripple.width() / 2),
                        background: $(this).data("ripple-color")
                    })
                    .appendTo($(this));

                $timeout(function() {
                    $div.remove();
                }, 2000);
            });
        }
    }

});
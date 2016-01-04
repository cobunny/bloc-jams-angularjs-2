(function () {
    function qmSellingPoints() {

        var linkFunction = function (scope, element, attributes) {
            var points = $('.point');

            var animatePoints = function (points) {
                angular.element(points).css({
                    opacity: 1,
                    transform: 'scaleX(1) translateY(0)'
                });
            };


            if ($(window).height() > 950) {
                angular.forEach(points, function (point) {
                    animatePoints(point);
                });
            }

            var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;

            $(window).scroll(function (event) {
                if ($(window).scrollTop() >= scrollDistance) {
                    angular.forEach(points, function (point) {
                        animatePoints(point);
                    });
                }
            });
        };

        return {
            restrict: 'A',
            link: linkFunction
        };
    }
    
    angular.module('blocJams')
        .directive('qmSellingPoints', qmSellingPoints);
})();
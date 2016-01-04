 (function () {
     function LandingCtrl($scope) {
         $scope.tagLine = "Turn the music up!";
         $scope.points = [
             {
                 icon: 'ion-music-note',
                 title: 'Choose your music',
                 description: 'The world is full of music; why should you have to listen to music that someone else chose?'
        },
             {
                 icon: 'ion-radio-waves',
                 title: 'Unlimited, streaming, ad-free',
                 description: 'No arbitrary limits. No distractions.'
        },
             {
                 icon: 'ion-iphone',
                 title: 'Mobile enabled',
                 description: 'Listen to your music on the go. This streaming service is available on all mobile platforms.'
        }];

     }

     angular
         .module('blocJams')
         .controller('LandingCtrl', ['$scope', LandingCtrl]);
 })();
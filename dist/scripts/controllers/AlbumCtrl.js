(function () {
    function AlbumCtrl($scope, Fixtures) {
        $scope.albumData = Fixtures.getAlbum();
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['$scope', 'Fixtures', AlbumCtrl]);
})();
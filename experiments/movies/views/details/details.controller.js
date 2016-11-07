(function () {
    angular
        .module("MovieApp")
        .controller("MovieDetailsController", MovieDetailsController);

    function MovieDetailsController($routeParams, MovieService) {
        var vm = this;
        vm.searchMovieByTitle = searchMovieByTitle;

        function searchMovieByTitle() {
            var imdbID = $routeParams.imdbID;

            function init(){
                MovieService
                    .searchMovieByTitle(imdbID)
                    .success(function (response) {
                        vm.movie = response;
                    });
            }
            init();
        }
    }
})();
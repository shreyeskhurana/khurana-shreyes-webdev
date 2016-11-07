(function () {
    angular
        .module("MovieApp")
        .controller("MovieSearchController", MovieSearchController);

    function MovieSearchController(MovieService, $routeParams, $location) {
        var vm = this;
        vm.searchMovieByTitle = searchMovieByTitle;
        var title = $routeParams.title;

        function init() {
            if(title) {
                $location.path("/search"+title);
                searchMovieByTitle(title);
            }
        }
        init();

        function searchMovieByTitle(title) {
            MovieService
                .searchMovieByTitle(title)
                .success(function (result) {
                    vm.movies = result.Search;
                })
                .error(function () {
                })
        }
    }
})();
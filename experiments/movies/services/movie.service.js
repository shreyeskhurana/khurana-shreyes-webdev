(function () {
    angular
        .module("MovieApp", [])
        .factory("MovieService", MovieService);

    function MovieService($http) {
        var api = {
            searchMovieByTitle: searchMovieByTitle,
            searchMovieByImdbID: searchMovieByImdbID
        }

        function searchMovieByTitle(title) {
            var url = "http://omdbapi.com/?s=" + title;
            return $http.get(url);
        }

        function searchMovieByImdbID(imdbID) {
            var url = "http://omdbapi.com/?i=" + imdbID;
            return $http.get(url);
        }
    }
})();
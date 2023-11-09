class FavoriteRestaurantSearchPresenter {
    constructor({ favoriteRestaurant }) {
        this._listenToSearchRequestByUser();
        this._favoriteRestaurant = favoriteRestaurant;
    }

    _listenToSearchRequestByUser() {
        this._queryElement = document.getElementById('query');
        this._queryElement.addEventListener('change', (event) => {
            this._searchMovies(event.target.value);
        });
    }

    async _searchMovies(latestQuery) {
        this._latestQuery = latestQuery.trim();

        const foundRestaurant = await this._favoriteRestaurant.searchResto(this.latestQuery);
        this._showFoundRestaurant(foundRestaurant);
    }

    _showFoundRestaurant(restos) {
        console.log(restos);
        const html = restos.reduce(
            (carry, resto) => carry.concat(`
              <li class="movie">
                <span class="movie__title">${resto.title || '-'}</span>
              </li>
            `),
            '',
        );

        document.querySelector('.movies').innerHTML = html;

        document
            .getElementById('movie-search-container')
            .dispatchEvent(new Event('movies:searched:updated'));
    }

    get latestQuery() {
        return this._latestQuery;
    }
}

export default FavoriteRestaurantSearchPresenter;
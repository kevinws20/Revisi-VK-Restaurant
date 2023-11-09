import { spyOn } from 'jest-mock';
import FavoriteRestaurantSearchPresenter from "../src/scripts/views/pages/liked-restaurant/favorite-restaurant-search-presenter";
import FavoriteRestoIdb from '../src/scripts/data/favorite-resto-idb';

describe('Searching restaurant', () => {
    let presenter;
    let favoriteRestaurant;

    const searchResto = (query) => {
        const queryElement = document.getElementById('query');
        queryElement.value = query;
        queryElement.dispatchEvent(new Event('change'));
    };

    const setMovieSearchContainer = () => {
        document.body.innerHTML = `
          <div id="movie-search-container">
            <input id="query" type="text">
            <div class="movie-result-container">
              <ul class="movies">
              </ul>
            </div>
          </div>
        `;
    };

    const constructPresenter = () => {
        favoriteRestaurant = {
            getAllResto: jest.fn(),
            searchResto: jest.fn(),
          };
          presenter = new FavoriteRestaurantSearchPresenter({
            favoriteRestaurant,
          });
    };

    beforeEach(() => {
        setMovieSearchContainer();
        constructPresenter();
    });

    describe('When query is not empty', () => {
        it('should be able to capture the query typed by the user', () => {
            FavoriteRestoIdb.searchResto.mockImplementation(() => []);

            searchResto('resto a');
            expect(presenter.latestQuery).toEqual('resto a');
        });

        it('should ask the model to search for liked restaurant', () => {
            FavoriteRestoIdb.searchResto.mockImplementation(() => []);

            searchResto('resto a');
            expect(FavoriteRestoIdb.searchResto).toHaveBeenCalledWith('resto a');
        });

        it('should show the found restaurant', () => {
            presenter._showFoundRestaurant([{ id: 1 }]);
            expect(document.querySelectorAll('.movie').length).toEqual(1);

            presenter._showFoundRestaurant([
                {
                    id: 1,
                    title: 'Satu',
                },
                {
                    id: 2,
                    title: 'Dua',
                },
            ]);
            expect(document.querySelectorAll('.movie').length).toEqual(2);
        });

        it('should show the title of the found restaurant', () => {
            presenter._showFoundRestaurant([
                {
                    id: 1,
                    title: 'Satu',
                },
            ]);
            expect(document.querySelectorAll('.movie__title').item(0).textContent).toEqual('Satu');

            presenter._showFoundRestaurant([
                {
                    id: 1,
                    title: 'Satu',
                },
                {
                    id: 2,
                    title: 'Dua',
                },
            ]);
            const restoTitles = document.querySelectorAll('.movie__title');
            expect(restoTitles.item(0).textContent).toEqual('Satu');
            expect(restoTitles.item(1).textContent).toEqual('Dua');
        });

        it('should show - for found restaurant without title', () => {
            presenter._showFoundRestaurant([{ id: 1 }]);
            expect(document.querySelectorAll('.movie__title').item(0).textContent).toEqual('-');
        });

        it('should show the restaurant found by Favorite Restaurant', (done) => {
            document
                .getElementById('movie-search-container')
                .addEventListener('movies:searched:updated', () => {
                    expect(document.querySelectorAll('.movie').length).toEqual(3);
                    done();
                });
            FavoriteRestoIdb.searchResto.mockImplementation((query) => {
                if (query === 'resto a') {
                    return [
                        { id: 111, title: 'resto abc' },
                        { id: 222, title: 'ada juga resto abcde' },
                        { id: 333, title: 'ini juga boleh resto a' },
                    ];
                }
                return [];
            });
            searchResto('resto a');
        });

        it('should show the name of the restaurant found by Favorite Restaurant', (done) => {
            document
                .getElementById('movie-search-container')
                .addEventListener('movies:searched:updated', () => {
                    const restaurantTitles = document.querySelectorAll('.movie__title');
                    expect(restaurantTitles.item(0).textContent).toEqual('resto abc');
                    expect(restaurantTitles.item(1).textContent).toEqual('ada juga resto abcde');
                    expect(restaurantTitles.item(2).textContent).toEqual('ini juga boleh resto a');
                    done();
                });

            FavoriteRestoIdb.searchResto.mockImplementation((query) => {
                if (query === 'resto a') {
                    return [
                        { id: 111, title: 'resto abc' },
                        { id: 222, title: 'ada juga resto abcde' },
                        { id: 333, title: 'ini juga boleh resto a' },
                    ];
                }
                return [];
            });

            searchResto('resto a');
        });
    });


    describe('When query is empty', () => {
        it('should capture the query as empty', () => {
            searchResto(' ');
            expect(presenter.latestQuery.length).toEqual(0);
            searchResto('    ');
            expect(presenter.latestQuery.length).toEqual(0);
            searchResto('');
            expect(presenter.latestQuery.length).toEqual(0);
            searchResto('\t');
            expect(presenter.latestQuery.length).toEqual(0);
        });
    });
});
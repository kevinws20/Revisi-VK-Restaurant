import LikeButtonInitiator from "../src/scripts/utils/like-button-presenter";
import FavoriteRestoIdb from "../src/scripts/data/favorite-resto-idb";
import * as TestFactories from './helpers/testFactories';
// import 'fake-indexeddb/auto';
global.structuredClone = (val) =>
    JSON.parse(JSON.stringify(val));

describe('Liking A Movie', () => {
    const addLikeButtonContainer = () => {
        document.body.innerHTML = '<div id="likeButtonContainer"></div>';
    };

    beforeEach(() => {
        addLikeButtonContainer();
    });

    it('should show the like button when the movie has not been liked before', async () => {
        const data = {
            restaurant: {
                id: 1, // ID restaurant
            },
        };
    
        await TestFactories.createLikeButtonPresenterWithRestaurant(data);
    
        expect(document.querySelector('[aria-label="like this restaurant"]')).toBeTruthy();
    });

    it('should not show the unlike button when the restaurant has not been liked before', async () => {
        const data = {
            restaurant: {
                id: 1,
            },
        };

        await TestFactories.createLikeButtonPresenterWithRestaurant(data);

        expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeFalsy();
    });

    it('should be able to like the movie', async () => {
        const data = {
            restaurant: {
                id: 1,
            },
        };

        await TestFactories.createLikeButtonPresenterWithRestaurant(data);

        document.querySelector('#likeButton').dispatchEvent(new Event('click'));

        // Memastikan film berhasil disukai
        const restaurant = await FavoriteRestoIdb.getResto(1);
        expect(restaurant).toEqual({ id: 1 });

        await FavoriteRestoIdb.deleteResto(1);
    });

    it('should not add a restaurant again when its already liked', async () => {
        const data = {
            restaurant: {
                id: 1,
            },
        };

        await TestFactories.createLikeButtonPresenterWithRestaurant(data);

        // Tambahkan film dengan ID 1 ke daftar film yang disukai
        await FavoriteRestoIdb.putResto({ id: 1 });
        // Simulasikan pengguna menekan tombol suka film
        document.querySelector('#likeButton').dispatchEvent(new Event('click'));

        // Tidak ada film yang ganda
        expect(await FavoriteRestoIdb.getAllResto()).toEqual([{ id: 1 }]);
        await FavoriteRestoIdb.deleteResto(1);
    });

    it('should not add a movie when it has no id', async () => {
        const data = {
            restaurant: {
            },
        };

        await TestFactories.createLikeButtonPresenterWithRestaurant(data);

        document.querySelector('#likeButton').dispatchEvent(new Event('click'));
        expect(await FavoriteRestoIdb.getAllResto()).toEqual([]);
    });

});
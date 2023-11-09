import LikeButtonInitiator from "../src/scripts/utils/like-button-presenter";
import FavoriteRestoIdb from "../src/scripts/data/favorite-resto-idb";
import * as TestFactories from './helpers/testFactories';

global.structuredClone = (val) =>
    JSON.parse(JSON.stringify(val));
describe('Unliking A Movie', () => {
    const addLikeButtonContainer = () => {
        document.body.innerHTML = '<div id="likeButtonContainer"></div>';
    };

    beforeEach(async () => {
        addLikeButtonContainer();
        await FavoriteRestoIdb.putResto({ id: 1 });
    });

    afterEach(async () => {
        await FavoriteRestoIdb.deleteResto(1);
    });

    it('should display unlike widget when the restaurant has been liked', async () => {
        const data = {
            restaurant: {
                id: 1,
            },
        };

        await TestFactories.createLikeButtonPresenterWithRestaurant(data);

        expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeTruthy();
    });

    it('should not display like widget when the restaurant has been liked', async () => {
        const data = {
            restaurant: {
                id: 1,
            },
        };

        await TestFactories.createLikeButtonPresenterWithRestaurant(data);

        expect(document.querySelector('[aria-label="like this restaurant"]')).toBeFalsy();
    });

    it('should be able to remove liked restaurant from the list', async () => {
        const data = {
            restaurant: {
                id: 1,
            },
        };

        await TestFactories.createLikeButtonPresenterWithRestaurant(data);

        document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));
        expect(await FavoriteRestoIdb.getAllResto()).toEqual([]);
    });

    it('should not throw error when user click unlike widget if the unliked restaurant is not in the list', async () => {
        const data = {
            restaurant: {
                id: 1,
            },
        };

       await TestFactories.createLikeButtonPresenterWithRestaurant(data);
        // Hapus dulu restaurant dari daftar resto yang disukai
        await FavoriteRestoIdb.deleteResto(1);
        // Kemudian, simulasikan pengguna menekan widget batal menyukai film
        document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));
        expect(await FavoriteRestoIdb.getAllResto()).toEqual([]);
    });
});
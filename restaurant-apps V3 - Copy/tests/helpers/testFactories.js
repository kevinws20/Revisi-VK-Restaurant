import LikeButtonInitiator from "../../src/scripts/utils/like-button-presenter";
import FavoriteRestoIdb from "../../src/scripts/data/favorite-resto-idb";

const createLikeButtonPresenterWithRestaurant = async (data) => {
    await LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        favoriteRestaurant: FavoriteRestoIdb,
        data,
    });
};
export { createLikeButtonPresenterWithRestaurant };
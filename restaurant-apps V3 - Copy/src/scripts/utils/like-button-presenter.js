import { createLikeRestaurantButtonTemplate, createUnlikeRestaurantButtonTemplate } from '../views/templates/template-creator';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, favoriteRestaurant, data }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = data.restaurant;
    this._favoriteRestaurant = favoriteRestaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    const restaurant = await this._favoriteRestaurant.getResto(id);

    if (restaurant) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeRestaurantButtonTemplate();

    const likeButton = document.querySelector('#likeButton');

    likeButton.addEventListener('click', async () => {
      await this._favoriteRestaurant.putResto(this._restaurant);
      this._renderButton();
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createUnlikeRestaurantButtonTemplate();

    const likeButton = document.querySelector('#likeButton');

    likeButton.addEventListener('click', async () => {
      await this._favoriteRestaurant.deleteResto(this._restaurant.id);
      this._renderButton();
    });
  },
};

export default LikeButtonInitiator;
 
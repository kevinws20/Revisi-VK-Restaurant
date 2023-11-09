import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurant-source';
import restoDetail from '../templates/resto-detail';
import { createLikeRestaurantButtonTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-presenter';
import PostReview from '../../utils/post-review';
import FavoriteRestoIdb from '../../data/favorite-resto-idb';

const Detail = {
  async render() {
    return `
        <div class="container">
            <div id="main-container">
                <h2 class="headline-title">Resto Details</h2>

                <section id="detail-resto"></section>

                <h3 class="give-review">Give Your Review</h3>

                <div class="form-review">
                  <form autocomplete="on">
                    <div class="mb-3">
                      <label for="name-input" class="form-label">Name</label>
                      <input type="text" class="form-control" id="name-input" minlength="3" placeholder="Your Name" required>
                    </div>

                    <div class="mb-3">
                      <label for="review-input" class="form-label">Review</label>
                      <input type="text" class="form-control" id="review-input" minlength="3" placeholder="Your Review" required>
                    </div>

                    <button id="submit-review" type="submit" class="submit-btn">Submit Review</button>
                  </form>
                </div>

                <div id="likeButtonContainer"></div>

            </div>
        </div>
      `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
    const detailContainer = document.querySelector('#detail-resto');

    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const data = await RestaurantSource.getRestaurantDetail(url.id);

    console.info(data);
    detailContainer.innerHTML += restoDetail(data.restaurant);

    const likeButtonContainer = document.querySelector('#likeButtonContainer');
    likeButtonContainer.innerHTML = createLikeRestaurantButtonTemplate();

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurant: FavoriteRestoIdb,
      data,
    });

    const btnSubmitReview = document.querySelector('#submit-review');
    const nameInput = document.querySelector('#name-input');
    const reviewInput = document.querySelector('#review-input');

    btnSubmitReview.addEventListener('click', async (e) => {
      e.preventDefault();

      await PostReview(url, nameInput.value, reviewInput.value);

      nameInput.value = '';
      reviewInput.value = '';
    });
  },
};

export default Detail;

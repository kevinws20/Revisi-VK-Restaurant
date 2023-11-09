import RestaurantSource from '../../data/restaurant-source';
import restoCard from '../templates/resto-card';

const Home = {
  async render() {
    return `
        <section class="content">
      <div class="headline-content">
        <h1 tabindex="0" class="headline-title">Our Restaurant</h1>
        <div class="post" id="post"></div>
      </div>
    </section>
    <section class="Menu">
      <div class="headline-menu">
        <h1 tabindex="0" class="menu-title">Our Best Menu For You</h1>
        <div class="post-menu"></div>
      </div>
    </section>
      `;
  },

  async afterRender() {
    const post = document.querySelector('#post');
    // Fungsi ini akan dipanggil setelah render()
    const data = await RestaurantSource.getRestaurantList();

    data.restaurants.forEach((restaurant) => {
      post.innerHTML += restoCard(restaurant);
    });

    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      // eslint-disable-next-line no-shadow
      .then((data) => {
        const meal = data.meals[0];

        const postMenuElement = document.querySelector('.post-menu');

        const mealNameElement = document.createElement('h2');
        mealNameElement.textContent = meal.strMeal;
        mealNameElement.classList.add('meal-name');
        mealNameElement.setAttribute('tabindex', '0');

        const mealImageElement = document.createElement('img');
        mealImageElement.src = meal.strMealThumb;
        mealImageElement.alt = meal.strMeal;
        mealImageElement.classList.add('meal-image');
        mealImageElement.setAttribute('tabindex', '0');
        postMenuElement.innerHTML = '';
        postMenuElement.appendChild(mealNameElement);
        postMenuElement.appendChild(mealImageElement);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  },
};

export default Home;

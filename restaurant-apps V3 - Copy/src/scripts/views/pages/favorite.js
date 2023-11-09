import FavoriteRestoIdb from '../../data/favorite-resto-idb';
import restoCard from '../templates/resto-card';

const Favorite = {
  async render() {
    return `
      <div class="container">
        <h2 class="headline-title">Favorited Resto</h2>

        <section class="post-fav" id="fav-resto"></section>
      </div>
      `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
    const data = await FavoriteRestoIdb.getAllResto();

    const favRestoContainer = document.querySelector('#fav-resto');

    if (data.length === 0) {
      favRestoContainer.innerHTML = `
        Empty favorite Resto. Put one, by clicking heart button in the detail page.
      `;
    }

    data.forEach((resto) => {
      favRestoContainer.innerHTML += restoCard(resto);
    });
  },
};

export default Favorite;

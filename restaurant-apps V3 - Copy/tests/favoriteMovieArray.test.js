import { itActsAsFavoriteRestaurantModel } from './contracts/favoriteRestaurantContract'; 
let favoriteRestaurant = [];
 
const FavoriteRestaurantArray = {
  getResto(id) {
    if (!id) {
      return;
    }
 
    return favoriteRestaurant.find((resto) => resto.id == id);
  },
 
  getAllResto() {
    return favoriteRestaurant;
  },
 
  putResto(resto) {
    // eslint-disable-next-line no-prototype-builtins
    if (!resto.hasOwnProperty('id')) {
      return;
    }
 
    // pastikan id ini belum ada dalam daftar favoriteMovies
    if (this.getResto(resto.id)) {
      return;
    }
 
    favoriteRestaurant.push(resto);
  },
 
  deleteResto(id) {
    // cara boros menghapus film dengan meng-copy film yang ada
    // kecuali film dengan id == id
    favoriteRestaurant = favoriteRestaurant.filter((resto) => resto.id != id);
  },
};
 
describe('Favorite Restaurant Array Contract Test Implementation', () => {
  afterEach(() => {
    favoriteRestaurant = [];
  });
 
  itActsAsFavoriteRestaurantModel(FavoriteRestaurantArray);
});
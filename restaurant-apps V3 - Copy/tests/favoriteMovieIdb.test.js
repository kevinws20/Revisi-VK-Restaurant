import { itActsAsFavoriteRestaurantModel } from "./contracts/favoriteRestaurantContract";
import FavoriteRestoIdb from "../src/scripts/data/favorite-resto-idb";

global.structuredClone = (val) =>
    JSON.parse(JSON.stringify(val));

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
    afterEach(async () => {
      (await FavoriteRestoIdb.getAllResto()).forEach(async (resto) => {
        await FavoriteRestoIdb.deleteResto(resto.id);
      });
    });
   
    itActsAsFavoriteRestaurantModel(FavoriteRestoIdb);
  });
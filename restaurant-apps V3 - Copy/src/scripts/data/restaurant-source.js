import CONFIG from '../globals/config';
import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantSource {
  static async getRestaurantList() {
    const response = await fetch(API_ENDPOINT.LIST);
    return response.json();
  }

  static async getRestaurantDetail(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    return response.json();
  }

  static async postRestaurantReview(data) {
    const response = await fetch(API_ENDPOINT.POST_REVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': CONFIG.KEY,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  // eslint-disable-next-line no-dupe-class-members
  static async postRestaurantReview(data) {
    try {
      const response = await fetch(API_ENDPOINT.POST_REVIEW, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Gagal mengirim review.');
      }

      return response.json();
    } catch (error) {
      throw new Error(`Terjadi kesalahan: ${error.message}`);
    }
  }
}

export default RestaurantSource;

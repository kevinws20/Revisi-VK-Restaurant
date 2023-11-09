import CONFIG from '../../globals/config';

const restoCard = (resto) => `

<div class="movie-item">
<a href="#/resto/${resto.id}" class="card-a-tag">
    <div class="movie-item__header">
    <img tabindex="0" class="movie-item__header__poster" alt="${resto.name}" src="${
  CONFIG.BASE_IMAGE_URL + resto.pictureId
}" crossorigin="anonymous"/>
      <div class="movie-item__header__rating">
        <p>⭐️<span class="movie-item__header__rating__score">${resto.rating}</span></p>
      </div>
    </div>
    <div class="movie-item__content">
      <h3><a class="card-h3" href="#/resto/${resto.id}">${resto.name} - ${resto.city}</a></h3>
      <p>${resto.description}</p>
    </div>
  </div>
  `;

export default restoCard;

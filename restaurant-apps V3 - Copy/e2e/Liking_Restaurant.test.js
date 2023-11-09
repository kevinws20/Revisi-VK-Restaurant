Feature('Liking Restaurant');

Before(({ I }) => {
    I.amOnPage('/#/like');
});
Scenario('showing empty liked movies', ({ I }) => {
    I.seeElement('#query');
    I.see('Tidak ada film untuk ditampilkan', '.movie-item__not__found');
});

Scenario('test something', ({ I }) => {

});

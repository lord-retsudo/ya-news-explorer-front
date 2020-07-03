import User from './user/user';

export default class Menu {

  /*
  constructor(user) {
    this.user = user;
  }
  */

  /*
    static showDesktopMenuNotLogged () {
      document.getElementById('desktopMenuNotLogged').style.display="flex";
    }

    static hideDesktopMenuNotLogged () {
      document.getElementById('desktopMenuNotLogged').style.display="none";
    }

    static showDesktopMenuLogged () {
      document.getElementById('desktopMenuLogged').style.display="flex";
    }

    static hideDesktopMenuNotLogged () {
      document.getElementById('desktopMenuLogged').style.display="none";
    }
*/
    static logout() {
      this.switchToNotLoggedMenu();
      User.logout();
    }

    switchToLoggedMenu (username) {
      document.getElementById('desktopMenuNotLogged').style.display = "none";
      document.getElementById('desktopMenuLogged').style.display = "flex";
      document.getElementById('desktopUserName').textContent = username;

      document.getElementById('logoutButton').addEventListener('click', Menu.logout.bind(this));
    }

    switchToNotLoggedMenu () {
      document.getElementById('desktopMenuLogged').style.display = "none";
      document.getElementById('desktopUserName').textContent = '';
      document.getElementById('desktopMenuNotLogged').style.display = "flex";

      document.getElementById('logoutButton').removeEventListener('click', Menu.logout.bind(this));
    }

    disableNewsSearchButton () {
      document.getElementById('newsSearchButton').disabled = true;
    }

    enableNewsSearchButton () {
      document.getElementById('newsSearchButton').disabled = false;
    }

    showSearchResultSection () {
      document.getElementById('searchResult').style.display = "block";
    }

    showLoadingSection () {
      document.getElementById('loading').style.display = "flex";
    }

    showNoResultSection () {
      document.getElementById('noresult').style.display = "flex";
    }

    hideSearchResultSection () {
      document.getElementById('searchResult').style.display = "none";
    }

    hideLoadingSection () {
      document.getElementById('loading').style.display = "none";
    }

    hideNoResultSection () {
      document.getElementById('noresult').style.display = "none";
    }

    showMoreButton () {
      document.getElementById('moreButton').style.display = "flex";
    }

    hideMoreButton () {
      document.getElementById('moreButton').style.display = "none";
    }

/*
    like (event) {
        event.target.classList.toggle('place-card__like-icon_liked');
    }

    remove (event, cardlist) {
        cardlist.removeChild(event.target.closest('.place-card'));
    }

    create (name, link) {

      const placeCard = document.createElement('div');
      const placeCardImage = document.createElement('div');
      const placeCardDeleteIcon = document.createElement('button');
      const placeCardDescription = document.createElement('div');
      const placeCardName = document.createElement('h3');
      const placeCardLikeIcon = document.createElement('button');

      placeCard.classList.add('place-card');
      placeCardImage.classList.add('place-card__image');
      placeCardImage.style.backgroundImage = `url('${link}')`;
      placeCardDeleteIcon.classList.add('place-card__delete-icon');
      placeCardDescription.classList.add('place-card__description');
      placeCardName.classList.add('place-card__name');
      placeCardName.textContent = name;
      placeCardLikeIcon.classList.add('place-card__like-icon');

      placeCard.appendChild(placeCardImage);
      placeCardImage.appendChild(placeCardDeleteIcon);
      placeCard.appendChild(placeCardDescription);
      placeCardDescription.appendChild(placeCardName);
      placeCardDescription.appendChild(placeCardLikeIcon);

      return  placeCard;
    }
*/
  }

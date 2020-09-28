import User from './user/user';
import Page from './util/page';

export default class Menu {
  static logoutMain() {
    this.switchToNotLoggedMenu();
    this.switchToMobileNotLoggedMenu();
    document.getElementById('mobileMenuNotLogged').style.display = 'none';
    desktopMenuLogged.style.backgroundColor = 'transparent';
    User.logout();
  }

  static logoutArticles() {
    Page.redirect('index.html');
    User.logout();
  }

  removeCards(cardsContainer) {
    while(cardsContainer.firstChild){
      cardsContainer.removeChild(cardsContainer.firstChild);
    }
  }

  switchToLoggedMenu(username) {
    document.getElementById('desktopMenuNotLogged').style.display = 'none';
    document.getElementById('desktopMenuLogged').style.display = 'flex';
    document.getElementById('desktopUserName').textContent = username;

    document.getElementById('logoutButton').addEventListener('click', Menu.logoutMain.bind(this));
  }

  switchToNotLoggedMenu () {
    document.getElementById('desktopMenuLogged').style.display = 'none';
    document.getElementById('desktopUserName').textContent = '';
    document.getElementById('desktopMenuNotLogged').style.display = 'flex';

    document.getElementById('logoutButton').removeEventListener('click', Menu.logoutMain.bind(this));
  }

  switchToMobileLoggedMenu(username) {
    // console.log(username);
    document.getElementById('mobileMenuNotLogged').style.display = 'none';
    document.getElementById('mobileMenuLogged').style.display = 'flex';
    document.getElementById('mobileUserName').textContent = username;
    
    document.getElementById('logoutButtonMobile').addEventListener('click', Menu.logoutMain.bind(this));
  }

  switchToMobileNotLoggedMenu () {
    document.getElementById('mobileMenuLogged').style.display = 'none';
    document.getElementById('mobileUserName').textContent = '';
    document.getElementById('mobileMenuNotLogged').style.display = 'flex';

    document.getElementById('logoutButtonMobile').removeEventListener('click', Menu.logoutMain.bind(this));
  }

  setUserName(username) {
    document.getElementById('desktopUserName').textContent = username;
    document.getElementById('logoutButton').addEventListener('click', Menu.logoutArticles.bind(this));
  }

  disableNewsSearchButton() {
    document.getElementById('newsSearchButton').disabled = true;
  }

  enableNewsSearchButton() {
    document.getElementById('newsSearchButton').disabled = false;
  }

  showSearchResultSection() {
    document.getElementById('searchResult').style.display = "block";
  }

  showLoadingSection() {
    document.getElementById('loading').style.display = "flex";
  }

  showNoResultSection() {
    document.getElementById('noresult').style.display = "flex";
  }

  hideSearchResultSection() {
    document.getElementById('searchResult').style.display = "none";
  }

  hideLoadingSection() {
    document.getElementById('loading').style.display = "none";
  }

  hideNoResultSection() {
    document.getElementById('noresult').style.display = "none";
  }

  showMoreButton() {
    document.getElementById('moreButton').style.display = "flex";
  }

  hideMoreButton() {
    document.getElementById('moreButton').style.display = "none";
  }

}

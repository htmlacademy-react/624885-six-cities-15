const SortOptions = {
  POPULAR: 'Popular',
  PRICE_ASCENDING: 'Price: low to high',
  PRICE_DESCENDING: 'Price: high to low',
  TOP_RATED: 'Top rated first'
};

const CitiesListItems = {
  PARIS: 'Paris',
  COLOGNE: 'Cologne',
  BRUSSELS: 'Brussels',
  AMSTERDAM: 'Amsterdam',
  HAMBURG: 'Hamburg',
  DUSSELDORF: 'Dusseldorf'
};

const enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  OfferId = '/offer/:id'
}

const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NOAUTH'
}

const enum Pages {
  Main = 'cities',
  Favorites = 'favorites'
}

export {AppRoute, AuthorizationStatus, CitiesListItems, Pages,SortOptions};
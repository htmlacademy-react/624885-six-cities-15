import { Helmet } from 'react-helmet-async';

import CardsSection from '../../components/cards-section/cards-section';
import CitiesList from '../../components/cities-list/cities-list';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import { CitiesListItems } from '../../const';
import { useAppSelector } from '../../hooks/useAppSelector';

export default function MainPage(): JSX.Element {
  const currentCity = useAppSelector((state) => state.currentCity);
  const offers = useAppSelector((state) => state.offers)
    .filter((offer) => offer.city.name === currentCity.name);
  const placesCount = offers.length;
  const activeOffer = useAppSelector((state) => state.activeOffer);
  const citiesNamesList = Object.values(CitiesListItems);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 Cities</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList items={citiesNamesList} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <CardsSection
              placesCount={placesCount}
              offers={offers}
              currentCity={currentCity.name}
            />
            <div className="cities__right-section">
              <Map
                city={currentCity}
                offers={offers}
                selectedOffer={activeOffer}
                page='cities'
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

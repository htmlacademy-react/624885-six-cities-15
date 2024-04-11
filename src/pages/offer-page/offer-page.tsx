import cn from 'classnames';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import CardsList from '../../components/cards-list/cards-list';
import FavoriteButton from '../../components/favorite-button/favorite-button';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import ReviewForm from '../../components/review-form/review-form';
import ReviewsItems from '../../components/reviews-items/reviews-items';
import Stars from '../../components/stars/stars';
import { AuthorizationStatus, OfferPageCounts, Pages } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { fetchNearbyOffers, fetchOfferByIdAction, fetchReviews } from '../../store/api-actions';
import { getCurrentOffer, getNearbyOffers, getOfferDataLoadingStatus } from '../../store/offer/offer-selectors';
import { getReviews } from '../../store/reviews/reviews-selectors';
import { getAuthorizationStatus } from '../../store/user/user-selectors';
import LoadingPage from '../loading-page/loading-page';
import NotFoundPage from '../not-found-page/not-found-page';
import { formatBedroomsString, formatMaxAdultsString } from './utils';

export default function OfferPage(): JSX.Element {
  const isAuthorized = useAppSelector(getAuthorizationStatus) === AuthorizationStatus.Auth;
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() =>{
    if(id) {
      dispatch(fetchOfferByIdAction(id));
      dispatch(fetchNearbyOffers(id));
      dispatch(fetchReviews(id));
    }
  }, [id, dispatch]);

  const currentOffer = useAppSelector(getCurrentOffer);
  const nearbyOffers = useAppSelector(getNearbyOffers)
    .slice(OfferPageCounts.Start, OfferPageCounts.Nearby);
  const reviews = useAppSelector(getReviews);
  const isOffersDataLoading = useAppSelector(getOfferDataLoadingStatus);

  if(isOffersDataLoading) {
    return <LoadingPage />;
  }

  if (!currentOffer) {
    return <NotFoundPage />;
  }

  const {
    title,
    type,
    price,
    city,
    isFavorite,
    isPremium,
    rating,
    bedrooms,
    description,
    goods,
    host,
    images,
    maxAdults
  } = currentOffer;
  const nearbyOffersForMap = [...nearbyOffers, currentOffer];

  const imagesSliced = images.slice(OfferPageCounts.Start, OfferPageCounts.Images);
  const reviewsSorted = reviews
    .toSorted((firstItem, secondItem) => dayjs(secondItem.date).diff(firstItem.date))
    .slice(OfferPageCounts.Start, OfferPageCounts.Reviews);
  return (
    <div className="page">
      <Helmet>
        <title>6 Cities : Offer page</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {imagesSliced.map((item) => (
                <div key={item} className="offer__image-wrapper">
                  <img className="offer__image" src={item} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium &&
              <div className="offer__mark">
                <span>Premium</span>
              </div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {title}
                </h1>
                {id && <FavoriteButton page={'offer'} isFavorite={isFavorite} offerId={id} />}
              </div>
              <Stars rating={rating} page='offer' />
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {formatBedroomsString(bedrooms)}
                </li>
                <li className="offer__feature offer__feature--adults">
                  {formatMaxAdultsString(maxAdults)}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((item) => (
                    <li key={item} className="offer__inside-item">
                      {item}
                    </li>
                  )
                  )}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={
                    cn('offer__avatar-wrapper', 'user__avatar-wrapper',
                      {'offer__avatar-wrapper--pro': host.isPro})
                  }
                  >
                    <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {host.name}
                  </span>
                  {host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ul className="reviews__list">
                  {reviews && <ReviewsItems comments={reviewsSorted} />}
                </ul>
                {isAuthorized && <ReviewForm />}
              </section>
            </div>
          </div>
          <Map
            city={city}
            offers={nearbyOffersForMap}
            selectedOffer={currentOffer.id}
            page='offer'
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <CardsList offers={nearbyOffers} page={Pages.Offer} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

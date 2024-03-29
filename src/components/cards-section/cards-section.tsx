import { Pages } from '../../const';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { activeOffer } from '../../store/action';
import { OfferType } from '../../types/offers';
import { sorting } from '../../utils';
import CardsList from '../cards-list/cards-list';
import SortingForm from '../sorting-form/sorting-form';

type CardsSectionProps = {
  placesCount: number;
  offers: Array<OfferType>;
  currentCity: string;
}

export default function CardsSection({ placesCount, offers, currentCity }: CardsSectionProps): JSX.Element {
  const dispatch = useAppDispatch();
  const handleCardHover = (offer: OfferType | null) => {
    dispatch(activeOffer({ offerId: offer?.id }));
  };
  const sortType = useAppSelector((state) => state.sortType);
  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{placesCount} places to stay in {currentCity}</b>
      <SortingForm />
      <div className="cities__places-list places__list tabs__content">
        <CardsList offers={sorting[sortType]([...offers])} page={Pages.Main} handler={handleCardHover} />
      </div>
    </section>
  );
}

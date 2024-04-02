import React, { FormEvent, ReactEventHandler, useState } from 'react';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { postReviewAction } from '../../store/api-actions';
import { getActiveOffer } from '../../store/selectors/offers-selectors';
import { ReviewType } from '../../types/comments';

type ChangeHandler = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>;

export default function ReviewForm(): JSX.Element {
  const [formData, setFormData] = useState({
    rating: '',
    review: ''
  });

  const activeOffer = useAppSelector(getActiveOffer);
  const dispatch = useAppDispatch();

  const handleFieldChange: ChangeHandler = (evt) => {
    const { name, value } = evt.currentTarget;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmitForm = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if(activeOffer) {
      const reviewMessage: ReviewType = {
        id: activeOffer,
        comment: formData.review,
        rating: Number(formData.rating)
      };
      dispatch(postReviewAction(reviewMessage));
    }
  };
  const ratings = [
    { stars: '5', title: 'perfect' },
    { stars: '4', title: 'good' },
    { stars: '3', title: 'not bad' },
    { stars: '2', title: 'badly' },
    { stars: '1', title: 'terribly' },
  ];
  return (
    <form onSubmit={handleSubmitForm} className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratings.map(({ stars, title }) => (
          <React.Fragment key={stars}>
            <input onChange={handleFieldChange}
              className="form__rating-input visually-hidden"
              name="rating"
              value={stars}
              id={`${stars}-stars`}
              type="radio"
            />
            <label
              htmlFor={`${stars}-stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>)
        )}
      </div>
      <textarea
        onChange={handleFieldChange}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={formData.review.length < 50 || formData.rating === ''}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

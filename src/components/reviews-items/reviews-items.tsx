import { CommentType } from '../../types/comments';
import dayjs from 'dayjs';

type ReviewsItemsProps = {
  comments: CommentType[];
}

export default function ReviewsItems({ comments }: ReviewsItemsProps): JSX.Element {
  return (
    <>
      {comments.map((comment) => (
        <li key={comment.id} className="reviews__item">
          <div className="reviews__user user">
            <div className="reviews__avatar-wrapper user__avatar-wrapper">
              <img
                className="reviews__avatar user__avatar"
                src={comment.user.avatarUrl}
                width="54"
                height="54"
                alt="Reviews avatar"
              />
            </div>
            <span className="reviews__user-name">
              {comment.user.name}
            </span>
          </div>
          <div className="reviews__info">
            <div className="reviews__rating rating">
              <div className="reviews__stars rating__stars">
                <span style={{ width: '80%' }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
            </div>
            <p className="reviews__text">
              {comment.comment}
            </p>
            <time className="reviews__time" dateTime={comment.date.toString()}>{dayjs(comment.date).format('MMMM YYYY')}</time>
          </div>
        </li>
      ))}
    </>
  );
}

import { circle, stack, hstack } from '../styled-system/patterns';
import { css } from '../styled-system/css';

const Card = () => {
  return (
    <div className={css({
      border: '3px solid #000000',
      boxShadow: '4px 4px 0px #000000',
      borderRadius: '13px',
      padding: 6,
      maxWidth: "388px",
    })}>
      <div className={stack({ gap: 4 })}>
        <div className={hstack({ gap: 4})}>
          <div className={circle({ size: 12, overflow: 'hidden' })}>
            <img
              src="https:picsum.photos/id/237/200"
              alt="A dog"
              height="120px"
              width="120px"
            />
          </div>
          <div>
            <h2 className={css({ fontWeight: '600' })}>A Dog</h2>
            <p className={css({ textDecoration: 'underline', color: '#7D7D7D' })}>@a_dog</p>
          </div>
        </div>
        <blockquote className={css({ fontSize: '17px' })}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </blockquote>
      </div>
    </div>
  );
};

export default Card;

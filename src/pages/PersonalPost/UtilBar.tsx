import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './UtilBar.module.scss';
import { ReactComponent as LikeIcon } from '../../assets/like.svg';
import { ReactComponent as FacebookIcon } from '../../assets/facebook.svg';
import { ReactComponent as TwitterIcon } from '../../assets/twitter.svg';
import { ReactComponent as ClipIcon } from '../../assets/clip.svg';
import { ReactComponent as ShareIcon } from '../../assets/share.svg';

const cx = classNames.bind(styles);

interface utilProps {
  utilFixed: boolean;
}

function UtilBar({ utilFixed }: utilProps) {
  const [likeClicked, setLikeClicked] = useState(false);
  const [likeScale, setLikeScale] = useState(1.0);
  const [likeTransit, setLikeTransit] = useState(150);

  const onLikeClick = () => {
    setLikeClicked(x => !x);

    if (!likeClicked) {
      setLikeScale(1.25);
      setTimeout(() => {
        setLikeScale(1.0);
        setLikeTransit(100);
      }, 150);
      setTimeout(() => {
        setLikeScale(1.25);
        setLikeTransit(125);
      }, 250);
      setTimeout(() => {
        setLikeScale(1.0);
        setLikeTransit(220);
      }, 375);
    }
  };

  return (
    <div
      className={styles.util_box}
      style={utilFixed ? { position: 'fixed', top: '112px' } : {}}
    >
      <div
        className={cx(likeClicked ? 'like_active' : 'like')}
        onClick={onLikeClick}
        role="presentation"
        style={{
          transform: `scale(${likeScale})`,
          transition: `transform 0.${likeTransit}s ease-in 0s`,
        }}
      >
        <LikeIcon />
      </div>
      <div className={styles.like_count}>0</div>
      <div className={styles.links_container}>
        <div className={styles.positioner}>
          <div className={styles.link_container}>
            <div className={styles.link}>
              <FacebookIcon />
            </div>
          </div>
          <div className={styles.link_container}>
            <div className={styles.link}>
              <TwitterIcon />
            </div>
          </div>
          <div className={styles.link_container}>
            <div className={styles.link}>
              <ClipIcon />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className={styles.link_share}>
          <ShareIcon className={styles.share} />
        </div>
      </div>
    </div>
  );
}

export default UtilBar;

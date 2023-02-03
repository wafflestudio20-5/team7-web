import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment/moment';
// eslint-disable-next-line import/extensions,import/no-unresolved
import classNames from 'classnames/bind';
// eslint-disable-next-line import/extensions,import/no-unresolved
import axios from 'axios';
import Header from '../components/Header';
// eslint-disable-next-line import/extensions,import/no-unresolved
import styles from './PersonalSeriesName.module.scss';
// eslint-disable-next-line import/extensions,import/no-unresolved
import { seriesPost } from '../contexts/types';
import OrderPostComp from '../components/OrderPostComp';

const cx = classNames.bind(styles);

function PersonalSeriesName() {
  const [rotate, setRotate] = useState(false);

  const [seriesDetail, setSeries] = useState({
    id: 1,
    title: 'series',
    photo: 'photo',
    update: '2020-02-20 20:20:20',
    author: 'id',
    postNum: 0,
    postList: [],
  });
  const [sortedList, setList] = useState(
    rotate ? seriesDetail.postList : seriesDetail.postList.reverse()
  );

  const { id, seriesName } = useParams();

  async function getSeries() {
    try {
      const response = await axios.get(
        `/api/v1/velog/${id}/series/${seriesName}`
      );
      setSeries(response.data);
      setList(
        rotate ? response.data.postList : response.data.postList.reverse()
      );
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSeries();
  }, []);

  const changeOrder = () => {
    setRotate(!rotate);
    const reverseList = sortedList.reverse();
    setList(reverseList);
  };

  const timeNow = moment();

  function timeSetting(timeComp: string) {
    const timeSeries = moment(timeComp);
    const [agoFormat, setAgoFormat] = useState('YYYY-MM-DD');
    const timeDiff = timeNow.diff(timeSeries);

    useEffect(() => {
      if (timeDiff < 1000 * 60 * 60)
        setAgoFormat(`${Math.floor(timeDiff / (1000 * 60))}분 전`);
      else if (timeDiff < 1000 * 60 * 60 * 24)
        setAgoFormat(`${Math.floor(timeDiff / (1000 * 60 * 60))}시간 전`);
      else if (timeDiff < 1000 * 60 * 60 * 24 * 7)
        setAgoFormat(`${Math.floor(timeDiff / (1000 * 60 * 60 * 24))}일 전`);
      else setAgoFormat(timeSeries.format('YYYY년 MM월 DD일'));
    }, [rotate]);
    return agoFormat;
  }

  return (
    <div className={cx('page')}>
      <Header />
      <div className={cx('pageBody')}>
        <div>
          <span className={cx('label')}>시리즈</span>
          <h1>{seriesDetail.title}</h1>
          <div className={cx('line')} />
          <section>
            <div className={cx('sortRule')}>
              <button
                className={cx('button')}
                type="button"
                onClick={changeOrder}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  data-testid="arrow"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  className={cx(rotate ? 'rotate' : 'none')}
                >
                  <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
                </svg>
                {!rotate && <span>오름차순</span>}
                {rotate && <span>내림차순</span>}
              </button>
            </div>
            <div className={cx('postList')}>
              {sortedList.map((postInfo: seriesPost) => (
                <OrderPostComp
                  post={postInfo.post}
                  series_order={postInfo.series_order}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default PersonalSeriesName;

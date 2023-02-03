import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
// eslint-disable-next-line import/extensions,import/no-unresolved
import classNames from 'classnames/bind';
// eslint-disable-next-line import/extensions,import/no-unresolved
import axios from 'axios';
// eslint-disable-next-line import/extensions,import/no-unresolved
import styles from './PersonalSeries.module.scss';
// eslint-disable-next-line import/extensions,import/no-unresolved
import { series } from '../contexts/types';
import SeriesComp from '../components/SeriesComp';

const cx = classNames.bind(styles);

function PersonalSeries() {
  const { id } = useParams();

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
    }, []);
    return agoFormat;
  }

  const [seriesList, setSeriesList] = useState([]);
  async function getSeries() {
    try {
      const response = await axios.get(`/api/v1/velog/${id}/series/`);
      setSeriesList(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSeries();
  }, []);

  return (
    <div>
      <div className={cx('seriesList')}>
        {seriesList.map((seriesInfo: series) => (
          <SeriesComp key={seriesInfo.url} seriesInfo={seriesInfo} />
        ))}
      </div>
    </div>
  );
}

export default PersonalSeries;

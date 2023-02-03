import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
import { useLoginValue } from '../contexts/LoginProvider';

const cx = classNames.bind(styles);

function PersonalSeriesName() {
  const { user } = useLoginValue();
  const [rotate, setRotate] = useState(false);
  const [seriesDetail, setSeries] = useState({
    id: 1,
    series_name: 'series',
    photo: 'photo',
    update: '2020-02-20 20:20:20',
    author: 'id',
    postNum: 0,
    postList: [],
  });
  const [sortedList, setList] = useState(
    rotate
      ? seriesDetail.postList.sort((post1: seriesPost, post2: seriesPost) => {
          return post1.series_order - post2.series_order;
        })
      : seriesDetail.postList.sort((post1: seriesPost, post2: seriesPost) => {
          return post2.series_order - post1.series_order;
        })
  );
  function sorting() {
    setList(
      rotate
        ? seriesDetail.postList.sort((post1: seriesPost, post2: seriesPost) => {
            return post1.series_order - post2.series_order;
          })
        : seriesDetail.postList.sort((post1: seriesPost, post2: seriesPost) => {
            return post2.series_order - post1.series_order;
          })
    );
  }

  const { id, seriesName } = useParams();

  async function getSeries() {
    try {
      const response = await axios.get(
        `/api/v1/velog/${id}/series/${seriesName}`
      );
      setSeries(response.data);
      setList(
        !rotate ? response.data.postList : response.data.postList.reverse()
      );
    } catch (error) {
      console.log(error);
    }
  }
  const [newTitle, setTitle] = useState(seriesDetail.series_name);
  useEffect(() => {
    getSeries();
    setTitle(seriesDetail.series_name);
  }, []);

  const changeOrder = () => {
    setRotate(!rotate);
  };
  useEffect(() => {
    sorting();
  }, [rotate]);

  const [onCustom, setCustom] = useState(false);
  const openCustom = () => {
    setRotate(true);
    setCustom(!onCustom);
  };

  async function editSeries() {
    try {
      setCustom(false);
      console.log(newTitle);
      if (newTitle !== seriesDetail.series_name) {
        const response = await axios.patch(
          `/api/v1/velog/${id}/series/${seriesName}`,
          {
            series_name: newTitle,
          }
        );
        setSeries(response.data);
      }
    } catch (e) {
      console.error(e);
    }
  }

  const [onDelete, setDeleteModal] = useState(false);
  const openDeleteModal = () => {
    setDeleteModal(true);
  };
  const closeDelete = () => {
    setDeleteModal(false);
  };

  const navigate = useNavigate();
  async function deleteSeries() {
    try {
      const response = await axios.delete(
        `/api/v1/velog/${id}/series/${seriesName}`
      );
      navigate(`/${id}/series`);
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <div className={cx('page')}>
      <Header />
      <div className={cx('pageBody')}>
        <div>
          <span className={cx('label')}>시리즈</span>
          {!onCustom && <h1>{seriesDetail.series_name}</h1>}
          {onCustom && (
            <input
              className={cx('title')}
              value={newTitle}
              onChange={e => {
                setTitle(e.target.value);
              }}
            />
          )}
          <div className={cx('line')} />
          <section>
            {onCustom && (
              <div className={cx('seriesCustom')}>
                <button
                  type="button"
                  color="teal"
                  className={cx('editButton')}
                  onClick={editSeries}
                >
                  적용
                </button>
              </div>
            )}
            {!onCustom && seriesDetail.author === user?.username && (
              <div className={cx('seriesCustom')}>
                <button type="button" onClick={openCustom}>
                  수정
                </button>
                <button type="button" onClick={openDeleteModal}>
                  삭제
                </button>
              </div>
            )}
            {!onCustom && (
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
                    className={cx(!rotate ? 'rotate' : 'none')}
                  >
                    <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
                  </svg>
                  {rotate && <span>오름차순</span>}
                  {!rotate && <span>내림차순</span>}
                </button>
              </div>
            )}
            <div className={cx('postList')}>
              {sortedList.map((postInfo: seriesPost) => (
                <div>
                  <OrderPostComp
                    post={postInfo.post}
                    series_order={postInfo.series_order}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      {onDelete && (
        <div className={cx('deleteModal')}>
          <div className={cx('modalContainer')}>
            <h3>시리즈 삭제</h3>
            <div className={cx('message')}>
              <div>시리즈를 정말 삭제하시겠습니까?</div>
              <div>시리즈에 속한 포스트들은 삭제되지 않습니다.</div>
            </div>
            <div className={cx('button-area')}>
              <button
                type="button"
                color="transparent"
                className={cx('cancle')}
                onClick={closeDelete}
              >
                취소
              </button>
              <button
                type="button"
                color="teal"
                className={cx('deleteButton')}
                onClick={deleteSeries}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PersonalSeriesName;

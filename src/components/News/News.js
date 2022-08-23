import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchNewsData } from './store/news-actions';

import classes from './News.module.scss'

const News = () => {

  const { news } = useSelector(state => state.news);

  const [selectedNewsId, setSelectedNewsId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchNewsData())
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchNewsData())
  }, [dispatch]);

  const onClickNews = id => {
    setSelectedNewsId(id)
  };

  const newsList = news.map(item =>
    <div onClick={() => onClickNews(item.id)} key={item.id}>
      <h3>{item.name}</h3>
      <p>{item.body}</p>
      <p>{item.email}</p>
    </div>);

  let itemContent;

  if (selectedNewsId) {
    const item = news[selectedNewsId];
    itemContent = <div className={classes.newsContent}>
      <div>
        <h1>{item.name}</h1>
        <p>{item.body}</p>
        <p>{item.email}</p>
      </div>
    </div>
  }

  const welcomeNewsContent = <div className={classes.welcomeContent}>
    <div>
      <h2>Welcome Borgoth</h2>
      <p className={classes.welcomeSubTitle}>Hope you find what you're looking for and that you enjoy</p>
    </div>
    <p className={classes.todayInfo}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
      Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
      type and scrambled it to make a type specimen book.</p>
    <img src="https://slidemodel.com/wp-content/uploads/6580-01-weather-widget-16x9-2.jpg" alt=""/>
  </div>


  return (
    <div className={classes.news}>
      <div className={classes.newsList}>
        {newsList}
      </div>
      {
        selectedNewsId ? itemContent : welcomeNewsContent
      }
    </div>
  )

};

export default News;

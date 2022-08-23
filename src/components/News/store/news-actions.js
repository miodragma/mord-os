import axiosConfig from '../../../axios/axiosConfig';

import { newsActions } from './news-slice';

export const fetchNewsData = () => {
  return async dispatch => {

    const fetchNews = async () => {
      return axiosConfig('/comments')
    }

    try {
      const { data: newsData } = await fetchNews();
      dispatch(newsActions.setNews(newsData));
    } catch (error) {
      console.log(error);
    }
  }
}

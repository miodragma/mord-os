import axiosConfig from '../../../axios/axiosConfig';

import { galleryActions } from './gallery-slice';

export const fetchGalleryData = () => {
  return async dispatch => {

    const fetchGallery = async () => {
      return axiosConfig.get('https://jsonplaceholder.typicode.com/photos')
    }

    try {
      const { data: galleryData } = await fetchGallery();
      dispatch(galleryActions.setGallery(galleryData));
    } catch (error) {
      console.log(error);
    }
  }
}

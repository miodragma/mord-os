import axiosConfig from '../../../axios/axiosConfig';

import { galleryActions } from './gallery-slice';

export const fetchGalleryData = () => {
  return async dispatch => {

    const fetchGallery = async () => {
      return axiosConfig('/photos')
    }

    try {
      const { data: galleryData } = await fetchGallery();
      dispatch(galleryActions.setGallery(galleryData));
    } catch (error) {
      console.log(error);
    }
  }
}

import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

import Backdrop from '../UI/Backdrop/Backdrop';
import Modal from '../UI/Modal/Modal';

import classes from './Gallery.module.scss';

const Gallery = () => {

  const { gallery } = useSelector(state => state.gallery);

  const [selectedThumbnailId, setSelectedThumbnailId] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);

  const [disableLeft, setDisableLeft] = useState(false);
  const [disableRight, setDisableRight] = useState(false);

  const onBackdropDismiss = useCallback(() => {
    setSelectedThumbnailId(null);
    setShowImageModal(false);
    setDisableLeft(false);
    setDisableRight(false);
  }, []);

  const keydownHandler = useCallback(e => {
    if (e.keyCode === 27) {
      onBackdropDismiss();
    }
  }, [onBackdropDismiss])

  useEffect(() => {
    setTimeout(() => setSelectedThumbnailId(2), 5000)
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler)
  }, [keydownHandler])

  const onClickThumbnail = (e, item) => {
    setSelectedThumbnailId(item.id);
    if (e.detail === 2) {
      setShowImageModal(true);
    }
  };

  const galleryThumbnail = gallery.map(item =>
    <div
      key={item.id}
      className={`${classes.thumbnailWrapper} ${selectedThumbnailId === item.id ? classes.selectedThumbnail : ''}`}
      onClick={(e) => onClickThumbnail(e, item)}>
      <img src={item.thumbnailUrl} alt={item.title}/>
      <p>{item.title}</p>
    </div>
  )

  const findImageIndex = gallery.findIndex(item => item.id === selectedThumbnailId);

  const onClickBackward = () => {
    if (findImageIndex > 0) {
      setSelectedThumbnailId(gallery[findImageIndex - 1].id);
      findImageIndex - 1 === 0 && setDisableLeft(true);
      setDisableRight(false);
    }
  }

  const onClickForward = () => {
    const galleryLength = gallery.length - 1;
    if (findImageIndex < gallery.length - 1) {
      setSelectedThumbnailId(gallery[findImageIndex + 1].id);
      findImageIndex + 1 === galleryLength && setDisableRight(true);
      setDisableLeft(false);
    }
  };

  const image = <div className={classes.imageModalWrapper}>
    <AiOutlineLeft
      className={`${disableLeft ? classes.disableIcon : ''}`}
      onClick={onClickBackward}/>
    <img src={gallery[findImageIndex]?.url} alt=""/>
    <AiOutlineRight
      className={`${classes.rightIcon} ${disableRight ? classes.disableIcon : ''}`}
      onClick={onClickForward}/>
  </div>

  return (
    <div className={classes.gallery}>
      {galleryThumbnail}
      {showImageModal && <Backdrop onClickBackdrop={onBackdropDismiss}/>}
      {showImageModal && <Modal>{image}</Modal>}
    </div>
  )

};

export default Gallery;

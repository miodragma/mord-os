import { Fragment, useEffect, useRef, useState } from 'react';
import { BsCameraVideo, BsCameraVideoOff } from 'react-icons/bs'
import { AiOutlineAudio, AiOutlineAudioMuted } from 'react-icons/ai'

import classes from './Camera.module.scss';

const Camera = () => {

  const camRef = useRef();
  const tracks = useRef([]);

  const [isVideo, setIsVideo] = useState(true);
  const [isAudio, setIsAudio] = useState(true);

  const isMounted = useRef(true);

  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          window.localStream = stream;
          camRef.current.srcObject = stream;
          tracks.current = stream.getTracks();
        })
        .catch(error => console.log(error));
    }
    return () => {
      if (!isMounted.current) {
        window.localStream.getVideoTracks()[0].stop();
        window.localStream.getAudioTracks()[0].stop();
        tracks.current.forEach(track => track.stop())
      }
      isMounted.current = false;
    }
  }, []);

  const onClickIsVideoHandler = isVideo => {
    let trackIndex = tracks.current.findIndex(t => t.kind === 'video');
    tracks.current[trackIndex].enabled = isVideo
    setIsVideo(isVideo);
  }

  const onClickIsAudioHandler = isAudio => {
    setIsAudio(isAudio);
  }

  return (
    <Fragment>
      <div className={classes.videoButtonsWrapper}>
        <div className={classes.camera}>
          {
            isVideo ?
              <BsCameraVideo onClick={() => onClickIsVideoHandler(false)}/> :
              <BsCameraVideoOff onClick={() => onClickIsVideoHandler(true)}/>
          }
        </div>
        <div className={classes.audio}>
          {
            isAudio ?
              <AiOutlineAudio onClick={() => onClickIsAudioHandler(false)}/> :
              <AiOutlineAudioMuted onClick={() => onClickIsAudioHandler(true)}/>
          }
        </div>
      </div>
      <video muted={!isAudio} autoPlay ref={camRef}/>
    </Fragment>
  )

};

export default Camera;

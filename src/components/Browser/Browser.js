import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineLeftCircle, AiOutlineRightCircle } from 'react-icons/ai';

import ProgramTaskBar from '../UI/ProgramTaskBar/ProgramTaskBar';

import classes from './Browser.module.scss';

const Browser = () => {

  const [urls, setUrls] = useState([]);
  const [activeUrl, setActiveUrl] = useState('');

  const url = useRef();

  const keydownHandler = useCallback(e => {
    if (e.keyCode === 13) {
      const urlVal = url.current.value;
      let httpUrlValue;
      if (urlVal.includes('http://') || urlVal.includes('https://')) {
        httpUrlValue = urlVal
      } else {
        httpUrlValue = `https://${urlVal}`
      }
      url.current.value = httpUrlValue
      setActiveUrl(httpUrlValue)
      setUrls(prevState => [...prevState, httpUrlValue])
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler)
  }, [keydownHandler])

  const findIndexUrl = urls.findIndex(url => url === activeUrl);

  const onClickBack = () => {
    if (findIndexUrl > 0) {
      setActiveUrl(urls[findIndexUrl - 1])
      url.current.value = urls[findIndexUrl - 1]
    }
  };

  const onClickNext = () => {
    if (findIndexUrl < urls.length - 1) {
      setActiveUrl(urls[findIndexUrl + 1])
      url.current.value = urls[findIndexUrl + 1]
    }
  }

  return (
    <Fragment>
      <ProgramTaskBar>
        <div className={classes.buttons}>
          <AiOutlineLeftCircle className={`${findIndexUrl === 0 || !urls.length ? classes.disableIcon : ''}`}
                               onClick={onClickBack}/>
          <AiOutlineRightCircle
            className={`${findIndexUrl === urls.length - 1 || !urls.length ? classes.disableIcon : ''}`}
            onClick={onClickNext}/>
        </div>
        <input className={classes.browserUrlInput} autoFocus type="text" ref={url}/>
      </ProgramTaskBar>
      <iframe width='100%' height='100%' src={activeUrl} title='Browser'/>
    </Fragment>
  )

};

export default Browser;

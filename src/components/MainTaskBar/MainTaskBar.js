import { Fragment, useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { programsActions } from '../Program/store/programs-slice';
import { mainAppsConfig } from '../../config/apps-config';

import classes from './MainTaskBar.module.scss';

const MainTaskBar = () => {

  const dispatch = useDispatch();

  const { runningPrograms } = useSelector(state => state.programs);
  const [showOpenedProgram, setShowOpenedProgram] = useState(false);
  const openedPrograms = useRef([]);

  const dispatchActions = useCallback((id, value) => {
    dispatch(programsActions.minimizeProgram({ id, value }))
    dispatch(programsActions.setCurrentWindowId(id));
  }, [dispatch]);

  const onClickAppHandler = useCallback(appData => {
    const isProgram = type => runningPrograms?.findIndex(program => program.type === type);

    const isFileExplorerIndex = isProgram('folder');
    const isCameraIndex = isProgram('camera');
    const isGalleryIndex = isProgram('gallery');
    const isNewsIndex = isProgram('news');

    if (appData.type === 'folder' && isFileExplorerIndex !== -1) {
      const id = runningPrograms[isFileExplorerIndex].id
      dispatchActions(id, false);
      return;
    }
    if (appData.type === 'camera' && isCameraIndex !== -1) {
      const id = runningPrograms[isCameraIndex].id
      dispatchActions(id, false);
      return;
    }
    if (appData.type === 'gallery' && isGalleryIndex !== -1) {
      const id = runningPrograms[isGalleryIndex].id
      dispatchActions(id, false);
      return;
    }
    if (appData.type === 'news' && isNewsIndex !== -1) {
      const id = runningPrograms[isNewsIndex].id
      dispatchActions(id, false);
      return;
    }
    const { icon, ...currentAppData } = appData;
    dispatch(programsActions.openProgram({
      ...currentAppData,
      id: Date.now()
    }));
    onLeaveHoverIconHandler();
  }, [dispatch, runningPrograms, dispatchActions]);

  const onEnterHoverIconHandler = app => {
    const newOpenedPrograms = []
    if (app.type === 'browser' || app.type === 'file') {
      runningPrograms.forEach(program => {
        if (program.type === app.type) {
          newOpenedPrograms.push(program)
        }
      })
      if (newOpenedPrograms.length > 0) {
        openedPrograms.current = newOpenedPrograms;
        setShowOpenedProgram(true);
      }
    } else {
      setShowOpenedProgram(false);
    }
  };

  const onLeaveHoverIconHandler = () => {
    setShowOpenedProgram(false);
  };

  const mainApps = mainAppsConfig.map(app => {
    return (<div
        onMouseEnter={() => onEnterHoverIconHandler(app)}
        className={classes.iconWrapper}
        key={app.label}>
        {app.icon(
          app.label,
          `${classes.icon} ${app?.iconClass && classes[app.iconClass]}`,
          () => onClickAppHandler(app)
        )}
      </div>
    )
  })

  const onClickOpenedProgramHandler = useCallback((appConfig, item) => {
    dispatchActions(item.id, false);
    onLeaveHoverIconHandler();
  }, [dispatchActions]);

  const onHoverOpenedProgram = item => {
    dispatchActions(item.id, false);
  };

  const onLeaveOpenedProgram = item => {
    const value = item.hasOwnProperty('isMinimized') && item?.isMinimized
    value && dispatch(programsActions.minimizeProgram({ id: item.id, value }))
  };

  const currentOpenedPrograms = openedPrograms.current.map(item => {
    const appConfig = mainAppsConfig.find(app => app.type === item.type);
    return (<Fragment key={item.id}>
      <div
        onClick={() => onClickOpenedProgramHandler(appConfig, item)}
        onMouseLeave={() => onLeaveOpenedProgram(item)} onMouseEnter={() => onHoverOpenedProgram(item)}>
        {appConfig.icon(
          appConfig.label,
          `${appConfig?.iconClass && classes[appConfig.iconClass]}`
        )}
        <p>{item?.currentLabel ? item.currentLabel : item.label}</p>
      </div>
    </Fragment>)
  })

  return (
    <div className={classes.menuBar}>
      {showOpenedProgram &&
        <div onMouseLeave={onLeaveHoverIconHandler} className={classes.openedPrograms}>{currentOpenedPrograms}</div>}
      {mainApps}
    </div>
  )

};

export default MainTaskBar;

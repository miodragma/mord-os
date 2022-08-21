import { Fragment, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { programsActions } from '../Program/store/programs-slice';
import { mainAppsConfig } from '../../config/apps-config';

import classes from './MainTaskBar.module.scss';

const MainTaskBar = () => {

  const dispatch = useDispatch();

  const { runningPrograms } = useSelector(state => state.programs);

  const onClickAppHandler = useCallback(appData => {
    const isFileExplorer = runningPrograms?.some(program => program.type === 'folder');
    if (appData.type === 'folder' && isFileExplorer) {
      return;
    }
    const { icon, ...currentAppData } = appData;
    dispatch(programsActions.openProgram({
      ...currentAppData,
      id: Date.now()
    }));
  }, [dispatch, runningPrograms]);

  const mainApps = mainAppsConfig.map(app => {
    const id = Math.random().toString().replace('.', '');
    return (<Fragment key={id}>
        {app.icon(
          app.label,
          `${classes.icon} ${app.type === 'browser' ? classes.browserIcon : ''}`,
          () => onClickAppHandler(app)
        )}
      </Fragment>
    )
  })

  return (
    <div className={classes.menuBar}>
      {mainApps}
    </div>
  )

};

export default MainTaskBar;

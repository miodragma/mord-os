import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { closeProgramIcon, mainAppsConfig } from '../../config/apps-config';
import { programsActions } from '../Program/store/programs-slice';

import './ProgramBar.scss';

const ProgramBar = React.memo(props => {

  const { type, id, currentLabel } = props;

  const dispatch = useDispatch()

  const icon = mainAppsConfig.find(app => app.type === type);

  const onClickCloseProgram = useCallback(() => {
    dispatch(programsActions.closeProgram(id))
  }, [dispatch, id]);

  return (
    <div className="programBar">
      <div className={`leftProgramBar ${icon?.iconClass && icon.iconClass}`}>
        <div>
          {icon.icon(icon.label)}
        </div>
        <p className='programBarLabel'>{currentLabel || icon.label}</p>
      </div>
      <div className='rightProgramBar'>
        <div>
          {closeProgramIcon.icon(closeProgramIcon.label, '', onClickCloseProgram)}
        </div>
      </div>
    </div>
  )

});

export default ProgramBar;

import { Fragment, useCallback, useEffect, useRef } from 'react';
import { RiEdit2Fill } from 'react-icons/ri';

import { closeProgramIcon } from '../../config/apps-config';

import ProgramWindowButton from '../UI/ProgramWindowButton/ProgramWindowButton';

import classes from './EditNotepad.module.scss';

const EditNotepad = props => {

  const { onBackdropDismiss, currentValue = 'United', onClickSave } = props;

  const nameValueRef = useRef();

  const keydownHandler = useCallback(e => {
    if (e.keyCode === 13) {
      onClickSave(nameValueRef.current.value);
    }
    if (e.keyCode === 27) {
      onBackdropDismiss();
    }
  }, [onClickSave, onBackdropDismiss])

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler)
  }, [keydownHandler])

  useEffect(() => {
    nameValueRef.current.value = currentValue;
  }, [currentValue])

  const onClickCloseProgramHandler = useCallback(() => {
    onBackdropDismiss();
  }, [onBackdropDismiss]);

  const onClickSaveHandler = useCallback(() => {
    onClickSave(nameValueRef.current.value);
  }, [onClickSave])

  return (
    <Fragment>
      <div className={classes.inputProgramBar}>
        <div className={classes.leftProgramBar}>
          <div>
            <RiEdit2Fill/>
          </div>
          <p>{nameValueRef.current?.value}</p>
        </div>
        <div className={classes.rightProgramBar}>
          <div>
            {closeProgramIcon.icon(closeProgramIcon.label, '', onClickCloseProgramHandler)}
          </div>
        </div>
      </div>
      <div className={classes.inputWrapper}>
        <input autoFocus placeholder='Please enter a valid file name' type="text" ref={nameValueRef}/>
        <ProgramWindowButton classNames={classes.saveInputFileName} label='Save' onClickButton={onClickSaveHandler}/>
      </div>
    </Fragment>
  )

};

export default EditNotepad;

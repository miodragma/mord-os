import { Fragment, useCallback, useEffect, useRef } from 'react';
import { RiEdit2Fill } from 'react-icons/ri';

import { closeProgramIcon } from '../../../config/apps-config';

import ProgramWindowButton from '../ProgramWindowButton/ProgramWindowButton';

import classes from './FieldNameModal.module.scss';

const FieldNameModal = props => {

  const { onBackdropDismiss, currentValue = 'United', onClickSave, activeFolder, groups = [] } = props;

  const nameValueRef = useRef();
  const groupValueRef = useRef();

  const keydownHandler = useCallback(e => {
    if (e.keyCode === 13) {
      onClickSave({ name: nameValueRef.current.value, groupId: groupValueRef.current?.value || null });
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
    onClickSave({ name: nameValueRef.current.value, groupId: groupValueRef.current?.value });
  }, [onClickSave]);

  const groupsOptions = groups.map(group => <option key={group.createdAt} value={group.id}>{group.name}</option>)

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
        <div className={classes.inputAndGroups}>
          <div>
            <label>Name</label>
            <input autoFocus placeholder='Please enter a valid file name' type="text" ref={nameValueRef}/>
          </div>
          {
            groups.length &&
            <div>
              <label>Group</label>
              <select ref={groupValueRef} defaultValue={activeFolder} placeholder='Groups'>
                <option value={null}>My Files</option>
                {groupsOptions}
              </select>

            </div>
          }
        </div>
        <ProgramWindowButton classNames={classes.saveInputFileName} label='Save' onClickButton={onClickSaveHandler}/>
      </div>
    </Fragment>
  )

};

export default FieldNameModal;

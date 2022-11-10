import React, { Fragment, useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProgramWindowButton from '../UI/ProgramWindowButton/ProgramWindowButton';
import ProgramTaskBar from '../UI/ProgramTaskBar/ProgramTaskBar';
import Backdrop from '../UI/Backdrop/Backdrop';
import Modal from '../UI/Modal/Modal';

import { createOrUpdateFile } from '../Program/store/programs-actions';

import { notepadButtons } from '../../config/program-task.config';

import classes from './Notepad.module.scss';
import FieldNameModal from '../UI/FieldNameModal/FieldNameModal';

const Notepad = props => {

  const { programId, fileId } = props;

  const dispatch = useDispatch();

  const { files, groups, activeFolder } = useSelector(state => state.programs);

  const [isNameInput, setIsNameInput] = useState(false);

  const notepadValRef = useRef();

  const onSaveFile = useCallback((fileData) => {
    const notepadFile = {
      id: fileId,
      programId,
      currentLabel: fileData.currentLabel,
      value: notepadValRef.current.value,
      userId: fileData.userId,
      groupId: fileData.groupId
    }
    dispatch(createOrUpdateFile(notepadFile));
  }, [dispatch, fileId, programId])

  const onClickSaveHandler = useCallback(() => {
    const isFile = files.find(file => file.id === fileId);
    if (isFile) {
      onSaveFile(isFile)
    } else {
      setIsNameInput(true);
    }

  }, [fileId, files, onSaveFile]);

  const onBackdropDismiss = useCallback(() => {
    setIsNameInput(false);
  }, []);

  const onClickSaveEditHandler = useCallback(data => {
    const fileData = {
      programId,
      currentLabel: data.name || 'United',
      value: notepadValRef.current.value,
      groupId: data.groupId !== 'My Files' ? data.groupId : null
    };
    onSaveFile(fileData)
    onBackdropDismiss();
  }, [onBackdropDismiss, onSaveFile, programId]);

  const notepadTaskBarButtons = notepadButtons.map((button, index) => <ProgramWindowButton
    key={button.label + index}
    classNames={classes.programWindowButton}
    label={button.label}
    disabled={button.disabled}
    onClickButton={onClickSaveHandler}/>)

  const currentValue = files.find(file => file.id === fileId)?.value;
  return (
    <Fragment>
      <div className={classes.notepad}>
        <ProgramTaskBar>
          {notepadTaskBarButtons}
        </ProgramTaskBar>
        <textarea autoFocus={true} defaultValue={currentValue} ref={notepadValRef}/>
      </div>
      {isNameInput && <Backdrop onClickBackdrop={onBackdropDismiss}/>}
      {isNameInput && <Modal>{
        <FieldNameModal
          groups={groups}
          onBackdropDismiss={onBackdropDismiss}
          onClickSave={onClickSaveEditHandler}
          activeFolder={activeFolder === 'myFiles' ? null : activeFolder}
        />}</Modal>}
    </Fragment>
  )

};

export default Notepad;

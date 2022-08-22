import React, { Fragment, useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProgramWindowButton from '../UI/ProgramWindowButton/ProgramWindowButton';
import ProgramTaskBar from '../UI/ProgramTaskBar/ProgramTaskBar';
import Backdrop from '../UI/Backdrop/Backdrop';
import Modal from '../UI/Modal/Modal';
import EditNotepad from '../EditNotepad/EditNotepad';

import { programsActions } from '../Program/store/programs-slice';

import { notepadButtons } from '../../config/program-task.config';

import classes from './Notepad.module.scss';

const Notepad = props => {

  const { programId, fileId } = props;

  const dispatch = useDispatch();

  const { files } = useSelector(state => state.programs);

  const [isNameInput, setIsNameInput] = useState(false);

  const notepadValRef = useRef();

  const onSaveFile = useCallback((fileData, isEdit = false) => {
    const notepadFile = {
      id: fileData.id,
      programId,
      currentLabel: fileData.currentLabel,
      value: notepadValRef.current.value,
      dateModified: JSON.stringify(new Date())
    }
    !isEdit && dispatch(programsActions.saveFile(notepadFile));
    isEdit && dispatch(programsActions.updateFile(notepadFile));
  }, [dispatch, programId])

  const onClickSaveHandler = useCallback(() => {
    const isFile = files.find(file => file.id === fileId);
    if (isFile) {
      onSaveFile(isFile, true)
    } else {
      setIsNameInput(true);
    }

  }, [fileId, files, onSaveFile]);

  const onBackdropDismiss = useCallback(() => {
    setIsNameInput(false);
  }, []);

  const onClickSaveEditHandler = useCallback(name => {
    const fileData = {
      id: Date.now(),
      programId,
      currentLabel: name || 'United',
      value: notepadValRef.current.value
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
        <EditNotepad
          onBackdropDismiss={onBackdropDismiss}
          onClickSave={onClickSaveEditHandler}
        />}</Modal>}
    </Fragment>
  )

};

export default Notepad;

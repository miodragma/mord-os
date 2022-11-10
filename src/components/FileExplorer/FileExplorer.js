import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProgramWindowButton from '../UI/ProgramWindowButton/ProgramWindowButton';
import ProgramTaskBar from '../UI/ProgramTaskBar/ProgramTaskBar';
import SideFolders from './SideFolders/SideFolders';
import FilesList from './FilesList/FilesList';
import Backdrop from '../UI/Backdrop/Backdrop';
import Modal from '../UI/Modal/Modal';
import FieldNameModal from '../UI/FieldNameModal/FieldNameModal';

import { fileExplorerButtons } from '../../config/program-task.config';

import { createGroup, deleteFile, deleteGroup } from '../Program/store/programs-actions';

import classes from './FileExplorer.module.scss';

const FileExplorer = () => {

  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [createFolder, setCreateFolder] = useState(false);

  const onClickButtonHandler = useCallback(type => {
    if (type === 'delete') {
      if (selectedFile?.id) {
        dispatch(deleteFile(selectedFile.id));
        setSelectedFile(null);
        return;
      }
      dispatch(deleteGroup(selectedFolder?.id));
      setSelectedFolder(null);
      return;
    }
    if (type === 'create-folder') {
      setCreateFolder(true);
    }
  }, [dispatch, selectedFile, selectedFolder])

  const fileExplorerTaskBarButtons = fileExplorerButtons.map((button, index) => <ProgramWindowButton
    key={button.label + index}
    classNames={classes.programWindowButton}
    label={button.label}
    disabled={
      !button.strictEnabled && !(!button.disabled && (selectedFile?.id || selectedFolder?.id) && (user.id !== selectedFile?.userId || user.id !== selectedFolder?.userId))}
    onClickButton={() => onClickButtonHandler(button.type)}/>)

  const onSelectedFileHandler = useCallback(data => {
    setTimeout(() => setSelectedFile(data), 200)
  }, []);

  const onSelectedFolderHandler = useCallback(data => {
    setTimeout(() => setSelectedFolder(data), 200)
  }, []);

  const onBackdropDismiss = useCallback(() => {
    setCreateFolder(false);
  }, []);

  const onClickSaveHandler = useCallback(data => {
    dispatch(createGroup(data.name))
    onBackdropDismiss();
  }, [dispatch, onBackdropDismiss]);

  return (
    <div className={classes.fileExplorer}>
      <ProgramTaskBar>
        {fileExplorerTaskBarButtons}
      </ProgramTaskBar>
      <div className={classes.explorerContent}>
        <div className={classes.sideFolders}>
          <SideFolders selectedFolder={selectedFolder} onSelectedFolder={onSelectedFolderHandler}/>
        </div>
        <div className={classes.tableWrapper}>
          <FilesList selectedFile={selectedFile} onSelectedFile={onSelectedFileHandler}/>
        </div>
      </div>
      {createFolder && <Backdrop onClickBackdrop={onBackdropDismiss}/>}
      {createFolder && <Modal>{
        <FieldNameModal
          onBackdropDismiss={onBackdropDismiss}
          onClickSave={onClickSaveHandler}
        />}</Modal>}
    </div>
  )

};

export default FileExplorer;

import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProgramWindowButton from '../UI/ProgramWindowButton/ProgramWindowButton';
import ProgramTaskBar from '../UI/ProgramTaskBar/ProgramTaskBar';
import SideFolders from './SideFolders/SideFolders';
import FilesList from './FilesList/FilesList';

import { fileExplorerButtons } from '../../config/program-task.config';

import { deleteFile } from '../Program/store/programs-actions';

import classes from './FileExplorer.module.scss';

const FileExplorer = () => {

  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const [selectedFile, setSelectedFile] = useState(null);

  const onClickButtonHandler = useCallback(type => {
    if (type === 'delete' && selectedFile?.id) {
      dispatch(deleteFile(selectedFile.id));
      setSelectedFile(null);
    }
  }, [dispatch, selectedFile])

  const fileExplorerTaskBarButtons = fileExplorerButtons.map((button, index) => <ProgramWindowButton
    key={button.label + index}
    classNames={classes.programWindowButton}
    label={button.label}
    disabled={button.disabled || !selectedFile?.id || user.userId !== selectedFile?.userId}
    onClickButton={() => onClickButtonHandler(button.type)}/>)

  const onSelectedFileHandler = useCallback(data => {
    setTimeout(() => setSelectedFile(data), 200)
  }, []);

  return (
    <div className={classes.fileExplorer}>
      <ProgramTaskBar>
        {fileExplorerTaskBarButtons}
      </ProgramTaskBar>
      <div className={classes.explorerContent}>
        <div className={classes.sideFolders}>
          <SideFolders userId={user.userId}/>
        </div>
        <div className={classes.tableWrapper}>
          <FilesList selectedFile={selectedFile} onSelectedFile={onSelectedFileHandler}/>
        </div>
      </div>
    </div>
  )

};

export default FileExplorer;

import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TaskBar from '../../components/TaskBar/TaskBar';
import MainTaskBar from '../../components/MainTaskBar/MainTaskBar';
import Program from '../../components/Program/Program';
import Notepad from '../../components/Notepad/Notepad';
import FileExplorer from '../../components/FileExplorer/FileExplorer';
import Camera from '../../components/Camera/Camera';
import Gallery from '../../components/Gallery/Gallery';
import Browser from '../../components/Browser/Browser';
import News from '../../components/News/News';

import { fetchGalleryData } from '../../components/Gallery/store/gallery-actions';
import { programsActions } from '../../components/Program/store/programs-slice';
import { fetchGroups } from '../../components/Program/store/programs-actions';

import classes from './Desktop.module.scss';

const Desktop = () => {

  const dispatch = useDispatch();

  const { runningPrograms, currentWindowId } = useSelector(state => state.programs);

  useEffect(() => {
    dispatch(fetchGalleryData());
    dispatch(fetchGroups());
  }, [dispatch])

  const onClickProgram = useCallback(id => {
    dispatch(programsActions.setCurrentWindowId(id))
  }, [dispatch])

  const programs = runningPrograms.map(program =>
    <Program
      key={program.id}
      program={program}
      onClickProgram={onClickProgram}
      zIndex={currentWindowId === program.id ? 100 : 'auto'}>
      {program.type === 'file' && <Notepad programId={program.id} fileId={program.fileId}/>}
      {program.type === 'folder' && <FileExplorer/>}
      {program.type === 'camera' && <Camera/>}
      {program.type === 'gallery' && <Gallery/>}
      {program.type === 'browser' && <Browser/>}
      {program.type === 'news' && <News/>}
    </Program>)

  return (
    <div className={classes.desktop}>
      <TaskBar/>
      {programs}
      <MainTaskBar/>
    </div>
  )
};

export default Desktop;

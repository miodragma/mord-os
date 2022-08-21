import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import TaskBar from '../../components/TaskBar/TaskBar';
import MainTaskBar from '../../components/MainTaskBar/MainTaskBar';
import Program from '../../components/Program/Program';
import Notepad from '../../components/Notepad/Notepad';

import classes from './Desktop.module.scss';

const Desktop = () => {

  const { runningPrograms, files } = useSelector(state => state.programs);
  const [currentWindowId, setCurrentWindowId] = useState(null);

  const onClickProgram = useCallback(id => {
    setCurrentWindowId(id);
  }, [])

  const programs = runningPrograms.map(program =>
    <Program
      key={program.id}
      program={program}
      onClickProgram={onClickProgram}
      zIndex={currentWindowId === program.id ? 100 : 'auto'}>
      {program.type === 'file' && <Notepad programId={program.id} fileId={program.fileId}/>}
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

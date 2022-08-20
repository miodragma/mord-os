import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import TaskBar from '../../components/TaskBar/TaskBar';
import Menu from '../../components/Menu/Menu';
import Program from '../../components/Program/Program';

import classes from './Desktop.module.scss';

const Desktop = () => {

  const { runningPrograms } = useSelector(state => state.programs);
  const [currentWindowId, setCurrentWindowId] = useState(null);

  const onClickProgram = useCallback(id => {
    setCurrentWindowId(id);
  }, [])

  const programs = runningPrograms.map(program =>
    <Program
      key={program.id}
      id={program.id}
      type={program.type}
      onClickProgram={onClickProgram}
      zIndex={currentWindowId === program.id ? 100 : 'auto'}>

    </Program>)

  return (
    <div className={classes.desktop}>
      <TaskBar/>
      {programs}
      <Menu/>
    </div>
  )
};

export default Desktop;

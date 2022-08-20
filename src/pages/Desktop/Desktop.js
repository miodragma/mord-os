import TaskBar from '../../components/TaskBar/TaskBar';
import Menu from '../../components/Menu/Menu';

import classes from './Desktop.module.scss';

const Desktop = () => {

  return (
    <div className={classes.desktop}>
      <TaskBar/>
      <Menu/>
    </div>
  )
};

export default Desktop;

import { useContext } from 'react';

import { VscRss } from 'react-icons/vsc';
import { MdBluetooth, MdGpsFixed, MdNavigation } from 'react-icons/md';
import { BsAlarm } from 'react-icons/bs';
import { GrSoundcloud } from 'react-icons/gr';
import { AiTwotoneSound } from 'react-icons/ai';
import { FaPowerOff } from 'react-icons/fa';

import Clock from '../Clock/Clock';

import AuthContext from '../../authContext/auth-context';

import classes from './TaskBar.module.scss';

const TaskBar = () => {

  const { logout } = useContext(AuthContext);

  const onClickLogoutHandler = () => {
    logout();
  }

  return (
    <div className={classes.taskBar}>

      <div className={classes.leftIcons}>
        <Clock/>
        <VscRss className={classes.icon}/>
        <MdBluetooth className={classes.icon}/>
      </div>

      <div className={classes.rightIcons}>
        <AiTwotoneSound className={classes.icon}/>
        <BsAlarm className={classes.icon}/>
        <MdNavigation className={classes.icon}/>
        <MdGpsFixed className={classes.icon}/>
        <GrSoundcloud className={classes.icon}/>
        <FaPowerOff title='Shut Down' onClick={onClickLogoutHandler}
                    className={`${classes.icon} ${classes.powerOffIcon}`}/>
      </div>
    </div>
  )
};

export default TaskBar;

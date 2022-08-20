import { FcCamera, FcFile, FcFolder } from 'react-icons/fc';
import { FaChrome } from 'react-icons/fa';

import classes from './Menu.module.scss';

const Menu = () => {

  return (
    <div className={classes.menuBar}>
      <FcFolder title='File Explorer' className={classes.icon}/>
      <FcFile title='Notepad' className={classes.icon}/>
      <FaChrome title='Browser' className={`${classes.icon} ${classes.browserIcon}`}/>
      <FcCamera title='Camera' className={classes.icon}/>
    </div>
  )

};

export default Menu;

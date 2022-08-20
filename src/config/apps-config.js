import { FcCamera, FcFile, FcFolder } from 'react-icons/fc';
import { FaChrome } from 'react-icons/fa';
import { RiCloseCircleLine } from 'react-icons/ri';

export const mainAppsConfig = [
  {
    label: 'File Explorer',
    type: 'folder',
    icon: (label, classNames = '', cb = () => {
    }) => <FcFolder className={classNames} title={label} onClick={cb}/>
  },
  {
    label: 'Notepad',
    type: 'file',
    icon: (label, classNames = '', cb = () => {
    }) => <FcFile className={classNames} title={label} onClick={cb}/>
  },
  {
    label: 'Browser',
    type: 'browser',
    icon: (label, classNames = '', cb = () => {
    }) => <FaChrome className={classNames} title={label} onClick={cb}/>
  },
  {
    label: 'Camera',
    type: 'camera',
    icon: (label, classNames = '', cb = () => {
    }) => <FcCamera className={classNames} title={label} onClick={cb}/>
  }
];

export const closeProgramIcon = {
  label: 'Close',
  type: 'folder',
  icon: (label, classNames = '', cb = () => {
  }) => <RiCloseCircleLine className={classNames} title={label} onClick={cb}/>
}

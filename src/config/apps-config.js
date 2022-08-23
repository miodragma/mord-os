import { FcCamera, FcFile, FcFolder, FcGallery } from 'react-icons/fc';
import { FaChrome } from 'react-icons/fa';
import { RiCloseCircleLine } from 'react-icons/ri';
import { BsRssFill } from 'react-icons/bs';

export const mainAppsConfig = [
  {
    label: 'File Explorer',
    type: 'folder',
    width: '840px',
    height: '580px',
    icon: (label, classNames = '', cb = () => {
    }) => <FcFolder className={classNames} title={label} onClick={cb}/>
  },
  {
    label: 'Notepad',
    type: 'file',
    width: '840px',
    height: '580px',
    icon: (label, classNames = '', cb = () => {
    }) => <FcFile className={classNames} title={label} onClick={cb}/>
  },
  {
    label: 'Gallery',
    type: 'gallery',
    width: '840px',
    height: '580px',
    icon: (label, classNames = '', cb = () => {
    }) => <FcGallery className={classNames} title={label} onClick={cb}/>
  },
  {
    label: 'Browser',
    type: 'browser',
    width: '840px',
    height: '580px',
    iconClass: 'browserIcon',
    icon: (label, classNames = '', cb = () => {
    }) => <FaChrome className={classNames} title={label} onClick={cb}/>
  },
  {
    label: 'Camera',
    type: 'camera',
    width: '840px',
    height: '580px',
    icon: (label, classNames = '', cb = () => {
    }) => <FcCamera className={classNames} title={label} onClick={cb}/>
  },
  {
    label: 'News',
    type: 'news',
    iconClass: 'newsIcon',
    width: '970px',
    height: '620px',
    icon: (label, classNames = '', cb = () => {
    }) => <BsRssFill className={classNames} title={label} onClick={cb}/>
  }
];

export const closeProgramIcon = {
  label: 'Close',
  type: 'folder',
  icon: (label, classNames = '', cb = () => {
  }) => <RiCloseCircleLine className={classNames} title={label} onClick={cb}/>
}

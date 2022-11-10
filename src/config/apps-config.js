import { RiCloseCircleLine } from 'react-icons/ri';
import { VscChromeMinimize } from 'react-icons/vsc';

import rss from '../assets/rss.png';
import safari from '../assets/safari.png';
import camera from '../assets/camera.png';
import gallery from '../assets/gallery.png';
import notepad from '../assets/notepad.png';
import fileExplorer from '../assets/file-explorer.png';

export const mainAppsConfig = [
  {
    label: 'File Explorer',
    type: 'folder',
    width: '840px',
    height: '580px',
    icon: (label, classNames = '', cb = () => {
    }) => <img src={fileExplorer} alt="" className={classNames} title={label} onClick={cb}/>
  },
  {
    label: 'Notepad',
    type: 'file',
    width: '840px',
    height: '580px',
    icon: (label, classNames = '', cb = () => {
    }) => <img src={notepad} alt="" className={classNames} title={label} onClick={cb}/>
  },
  {
    label: 'Gallery',
    type: 'gallery',
    width: '840px',
    height: '580px',
    icon: (label, classNames = '', cb = () => {
    }) => <img src={gallery} alt="" className={classNames} title={label} onClick={cb}/>
  },
  {
    label: 'Browser',
    type: 'browser',
    width: '840px',
    height: '580px',
    iconClass: 'browserIcon',
    icon: (label, classNames = '', cb = () => {
    }) => <img src={safari} alt="" className={classNames} title={label} onClick={cb}/>
  },
  {
    label: 'Camera',
    type: 'camera',
    width: '840px',
    height: '580px',
    icon: (label, classNames = '', cb = () => {
    }) => <img src={camera} alt="" className={classNames} title={label} onClick={cb}/>
  },
  {
    label: 'News',
    type: 'news',
    iconClass: 'newsIcon',
    width: '970px',
    height: '620px',
    icon: (label, classNames = '', cb = () => {
    }) => <img src={rss} alt="" className={classNames} title={label} onClick={cb}/>
  }
];

export const closeProgramIcon = {
  label: 'Close',
  type: 'button',
  icon: (label, classNames = '', cb = () => {
  }) => <RiCloseCircleLine className={classNames} title={label} onClick={cb}/>
}

export const minimizeProgramIcon = {
  label: 'Minimize',
  type: 'button',
  icon: (label, classNames = '', cb = () => {
  }) => <VscChromeMinimize className={classNames} title={label} onClick={cb}/>
}

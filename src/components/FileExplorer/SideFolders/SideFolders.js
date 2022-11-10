import { Fragment, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import outsideClick from '../../../hooks/OutsideClick';

import { fetchFiles, fetchGroups } from '../../Program/store/programs-actions';

import folder from '../../../assets/folder.png';
import openedFolder from '../../../assets/opened-folder.png';

import classes from './SideFolders.module.scss';

const SideFolders = props => {

  const dispatch = useDispatch();

  const { selectedFolder, onSelectedFolder } = props;
  const actionsRef = useRef(null);

  const { groups, activeFolder } = useSelector(state => state.programs);

  useEffect(() => {
    dispatch(fetchFiles());
    dispatch(fetchGroups());
  }, [dispatch]);

  const onRemoveSelect = useCallback(() => {
    onSelectedFolder(null);
  }, [onSelectedFolder]);

  outsideClick({ actionsRef, onRemoveSelect })

  const onFetchMyFilesHandler = e => {
    onSelectedFolder(null);
    if (e.detail === 2) {
      dispatch(fetchFiles());
    }
  }

  const onClickGroupFolder = (e, group) => {
    onSelectedFolder({ id: group.id, userId: group.createdBy.userId });
    if (e.detail === 2) {
      dispatch(fetchFiles(group.id));
    }
  };

  const currGroups = groups.map(group => {
    return (
      <div
        ref={actionsRef}
        key={group.createdAt}
        className={`${classes.folder} ${selectedFolder?.id === group.id ? classes.selectedFolder : ''} ${classes.filesRowContent}`}
        onClick={(e) => onClickGroupFolder(e, group)}>
        <img src={activeFolder === group.id ? openedFolder : folder} alt=""/>
        <p>{group.name}</p>
      </div>
    )
  })

  return (
    <Fragment>
      <div className={classes.filesRowContent} onClick={onFetchMyFilesHandler}>
        <img src={activeFolder === 'myFiles' ? openedFolder : folder} alt=""/>
        <p>My Files</p>
      </div>
      <p className={classes.groupsTitle}>Groups</p>
      {currGroups}
    </Fragment>
  )

};

export default SideFolders;

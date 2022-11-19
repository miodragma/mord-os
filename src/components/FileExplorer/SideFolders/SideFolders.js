import { Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Backdrop from '../../UI/Backdrop/Backdrop';
import Modal from '../../UI/Modal/Modal';
import FieldNameModal from '../../UI/FieldNameModal/FieldNameModal';
import MembersList from '../../Members/MembersList/MembersList';
import EditMember from '../../Members/EditMember/EditMember';

import { createGroup, deleteGroup, fetchFiles, fetchGroups } from '../../Program/store/programs-actions';

import { folderConfig } from '../../../config/folder-config';

import folder from '../../../assets/folder.png';
import openedFolder from '../../../assets/opened-folder.png';
import members from '../../../assets/members.png';
import edit from '../../../assets/edit.png';

import classes from './SideFolders.module.scss';

const SideFolders = props => {

  const dispatch = useDispatch();

  const { userId } = props;

  const { groups, activeFolder } = useSelector(state => state.programs);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [createFolderModal, setCreateFolderModal] = useState(false);
  const [membersModal, setMembersModal] = useState(false);
  const [addMemberModal, setAddMemberModal] = useState(false);

  useEffect(() => {
    dispatch(fetchFiles());
    dispatch(fetchGroups());
  }, [dispatch]);

  const onFetchMyFilesHandler = () => {
    setSelectedFolder(null);
    dispatch(fetchFiles());
  }

  const onClickGroupFolder = group => {
    setSelectedFolder(group)
    dispatch(fetchFiles(group.id));
  };

  const onClickMembers = e => {
    e.stopPropagation();
    setMembersModal(true);
  }

  const onClickAddMember = e => {
    e.stopPropagation();
    setAddMemberModal(true);
  }

  const currGroups = groups.map(group => {
    return (
      <div
        key={group.createdAt}
        className={`${classes.folder} ${activeFolder === group.id ? classes.selectedFolder : ''} ${classes.filesRowContent}`}
        onClick={() => onClickGroupFolder(group)}>
        <img src={activeFolder === group.id ? openedFolder : folder} alt=""/>
        <p>{group.name}</p>
        {activeFolder === group.id && <div className={classes.memberIcons}>
          <img
            onClick={(e) => onClickAddMember(e)}
            className={`${classes.membersIcon} ${userId !== selectedFolder?.createdBy.userId ? classes.disabled : ''}`}
            src={edit} alt=""/>
          <img
            onClick={(e) => onClickMembers(e)}
            className={classes.membersIcon}
            src={members} alt=""/>
        </div>
        }
      </div>
    )
  })

  const onClickGroupIcon = type => {
    if (type === 'create') {
      setCreateFolderModal(true);
      return;
    }
    dispatch(deleteGroup(selectedFolder?.id));
  }

  const groupButtons = folderConfig.map(conf => {
    return (
      <img
        className={`${conf.type === 'delete' && (activeFolder === 'myFiles' || userId !== selectedFolder?.createdBy.userId) ? classes.disabled : ''}`}
        key={conf.label}
        src={conf.icon}
        onClick={() => onClickGroupIcon(conf.type)}
        alt=""/>
    )
  });

  const onBackdropDismiss = useCallback(() => {
    setCreateFolderModal(false);
    setMembersModal(false);
    setAddMemberModal(false);
  }, []);

  const onClickSaveHandler = useCallback(data => {
    dispatch(createGroup(data.name))
    setCreateFolderModal(false);
  }, [dispatch]);

  return (
    <Fragment>
      <div className={`${classes.filesRowContent} ${activeFolder === 'myFiles' ? classes.selectedFolder : ''}`}
           onClick={onFetchMyFilesHandler}>
        <img src={activeFolder === 'myFiles' ? openedFolder : folder} alt=""/>
        <p>My Files</p>
      </div>
      <div className={classes.groupTitleAdnButtons}>
        <p className={classes.groupsTitle}>Groups</p>
        <div>
          {groupButtons}
        </div>
      </div>
      {currGroups}
      {createFolderModal && <Backdrop onClickBackdrop={onBackdropDismiss}/>}
      {createFolderModal && <Modal>{
        <FieldNameModal
          onBackdropDismiss={onBackdropDismiss}
          onClickSave={onClickSaveHandler}
        />}</Modal>}
      {membersModal && <Backdrop onClickBackdrop={onBackdropDismiss}/>}
      {membersModal && <Modal>{
        <MembersList
          userId={userId}
          groupId={selectedFolder.id}
        />}</Modal>}
      {addMemberModal && <Backdrop onClickBackdrop={onBackdropDismiss}/>}
      {addMemberModal && <Modal>{
        <EditMember
          saveEditMembers={onBackdropDismiss}
          userId={userId}
          groupId={selectedFolder.id}
        />}</Modal>}
    </Fragment>
  )

};

export default SideFolders;

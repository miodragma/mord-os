import axiosConfig from '../../../axios/axiosConfig';

import { programsActions } from './programs-slice';
import { loaderActions } from '../../UI/Toast/store/loader/loader-slice';

export const fetchFiles = groupId => {
  return async dispatch => {

    const fetchFiles = async () => {
      if (!groupId) {
        return axiosConfig.get('/file/user-files');
      }
      return axiosConfig.get(`/file/group/${groupId}`);
    }

    try {
      const { data } = await fetchFiles();
      const prepareFilesData = data.map(({ name, updatedAt, ...file }) => ({
        currentLabel: name, ...file,
        dateModified: JSON.stringify(new Date(updatedAt))
      }))
      dispatch(programsActions.setFiles({ data: prepareFilesData, activeFolder: !groupId ? 'myFiles' : groupId }));
    } catch (err) {
      console.log(err)
    }

  }
}

export const createOrUpdateFile = data => {
  return async dispatch => {

    const { id: fileId, programId, currentLabel, value, groupId } = data;

    const file = { name: currentLabel, value, groupId };

    const path = !fileId ? '/file/create' : `/file/edit/${fileId}`;
    const onCreateOrUpdateFile = async () => {
      if (!fileId) {
        return axiosConfig.put(path, file);
      }
      return axiosConfig.post(path, file);
    }

    try {
      const { data: fileData } = await onCreateOrUpdateFile();
      const file = {
        id: fileData.file.id,
        programId,
        currentLabel: fileData.file.name,
        value: fileData.file.value,
        dateModified: JSON.stringify(new Date(fileData.file.updatedAt)),
        userId: fileData.file.userId,
        groupId: fileData.file.groupId
      }
      !fileId && dispatch(programsActions.saveFile(file));
      fileId && dispatch(programsActions.updateFile(file));
      dispatch(loaderActions.showToast({ toastMessage: fileData.message, type: 'success' }))
    } catch (error) {
      console.log(error);
    }
  }
}

export const deleteFile = fileId => {
  return async dispatch => {

    const onDeleteFile = async () => {
      return axiosConfig.delete(`/file/delete/${fileId}`);
    }

    try {
      const { data } = await onDeleteFile();
      dispatch(programsActions.deleteFile(data.file.id))
      dispatch(loaderActions.showToast({ toastMessage: data.message, type: 'success' }))

    } catch (err) {
      console.log(err)
    }

  }
};

export const createGroup = name => {
  return async dispatch => {

    const onCreateGroup = async () => {
      return axiosConfig.put('/group/create', { name });
    };

    try {
      const { data } = await onCreateGroup();
      dispatch(programsActions.createNewGroup(data.group));
      dispatch(loaderActions.showToast({ toastMessage: data.message, type: 'success' }))
    } catch (err) {
      console.log(err)
    }

  }
}

export const fetchGroups = () => {
  return async dispatch => {

    const onFetchGroups = async () => {
      return axiosConfig.get('/group/user-groups');
    }

    try {
      const { data } = await onFetchGroups();
      dispatch(programsActions.setGroups(data.userGroups.groups))

    } catch (err) {
      console.log(err)
    }

  }
}

export const deleteGroup = groupId => {
  return async dispatch => {

    const onDeleteGroup = async () => {
      return axiosConfig.delete(`/group/delete/${groupId}`);
    }

    try {
      const { data } = await onDeleteGroup();
      dispatch(programsActions.deleteGroup(data.group.id));
      dispatch(fetchFiles());
      dispatch(loaderActions.showToast({ toastMessage: data.message, type: 'success' }))

    } catch (err) {
      console.log(err)
    }

  }
};

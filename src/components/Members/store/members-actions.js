import axiosConfig from '../../../axios/axiosConfig';
import { membersActions } from './members-slice';

export const fetchMembersByGroupId = groupId => {
  return async dispatch => {

    const onFetchMembers = async () => {
      return axiosConfig.get(`/member/group/${groupId}`)
    }

    try {
      const { data } = await onFetchMembers();
      const users = data.groupUsers.users.map(user => ({
        ...user,
        isAdmin: user.id === data.groupUsers.createdBy.userId
      }));
      dispatch(membersActions.setMembers(users));

    } catch (err) {
      console.log(err)
    }

  }
};

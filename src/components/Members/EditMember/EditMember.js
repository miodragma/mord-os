import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import axiosConfig from '../../../axios/axiosConfig';

import ProgramWindowButton from '../../UI/ProgramWindowButton/ProgramWindowButton';

import checkmark from '../../../assets/checkmark.png';
import removeMinus from '../../../assets/remove-minus.png';
import add from '../../../assets/add.png';

import classes from './EditMember.module.scss';

const selectedUsersReducer = (selectedUserState, action) => {
  switch (action.type) {
    case 'ADD':
      return [...selectedUserState, action.payload];
    case 'REMOVE':
      return selectedUserState.filter(currUserId => currUserId !== action.payload);
    default:
      throw new Error('Something goes wrong!')
  }
}

const initialUsersState = { users: [], allUsers: [] }

const usersReducer = (userState, action) => {
  switch (action.type) {
    case 'ADD':
      return { ...userState, users: action.payload };
    case 'ADD_ALL':
      const uniqueIds = new Set();
      const currentUsers = [...userState.allUsers].concat([...action.payload]);
      const users = currentUsers.filter(user => {
        const isDuplicate = uniqueIds.has(user.id);
        uniqueIds.add(user.id);
        return !isDuplicate;
      });
      return { ...userState, allUsers: users };
    case 'REMOVE':
      return { ...userState, users: [] };
    default:
      throw new Error('Something goes wrong!')
  }
}

const EditMember = props => {

  const { userId, groupId, saveEditMembers } = props;

  const [userEmail, setUserEmail] = useState('');
  const [selectedUsersState, dispatchSelectedUsers] = useReducer(selectedUsersReducer, []);
  const [usersState, dispatchUsers] = useReducer(usersReducer, initialUsersState);
  const isMounted = useRef(true);

  useEffect(() => {
    if (!isMounted.current && !!userEmail) {
      const getUsers = setTimeout(() => {
        axiosConfig.get(`/member/search/${userEmail}`)
          .then(res => {
            dispatchUsers({ type: 'ADD', payload: res.data.users });
            dispatchUsers({ type: 'ADD_ALL', payload: res.data.users });
          })
          .catch(err => console.log(err))
      }, 200);
      return () => clearTimeout(getUsers);
    } else {
      dispatchUsers({ type: 'REMOVE' });
    }
    isMounted.current = false;
  }, [userEmail])

  const onSearchUserByEmail = e => {
    const email = e.target.value;
    setUserEmail(email);
  };

  const findIfExistUser = (userId, obj) => {
    return obj.some(currUserId => currUserId === userId);
  }

  const onSelectUser = userId => {
    const isUser = findIfExistUser(userId, selectedUsersState);
    if (isUser) {
      dispatchSelectedUsers({ type: 'REMOVE', payload: userId });
    } else {
      dispatchSelectedUsers({ type: 'ADD', payload: userId });
    }
  }

  const onClickSaveHandler = useCallback(() => {
    const membersToUpdate = { deleteMembers: [], addMembers: [] }
    usersState.allUsers.forEach(user => {
      if (selectedUsersState.includes(user.id)) {
        if (user.groups.some(group => group.id === groupId)) {
          membersToUpdate.deleteMembers.push(user.id)
        } else {
          membersToUpdate.addMembers.push(user.id)
        }
      }
    })
    membersToUpdate.addMembers.length !== 0 && axiosConfig.put('/member/user-group/add', {
      userIds: membersToUpdate.addMembers,
      groupId
    })
      .then()
      .catch(err => console.log(err));
    membersToUpdate.deleteMembers.length !== 0 && axiosConfig.delete('/member/user-group/delete', {
      data: {
        userIds: membersToUpdate.deleteMembers,
        groupId
      }
    })
      .then()
      .catch(err => console.log(err));
    saveEditMembers();
  }, [groupId, saveEditMembers, selectedUsersState, usersState.allUsers]);

  const usersOptions = usersState.users.map(user => {
    let isExistMemberInGroup = false;
    let isAdminMemberInGroup = false;
    if (user.groups.length) {
      isExistMemberInGroup = user.groups.some(group => group.id === groupId);
      isAdminMemberInGroup = user.groups.some(group => user.id === userId && group.createdBy.userId === userId);
    }

    const ifExistUser = findIfExistUser(user.id, selectedUsersState);

    const isCheckmarkIconUser = (isExistMemberInGroup && !ifExistUser) || (!isExistMemberInGroup && ifExistUser);

    return (
      !isAdminMemberInGroup && <div
        onClick={() => onSelectUser(user.id)}
        key={user.createdAt}
        className={`
        ${isCheckmarkIconUser || (isExistMemberInGroup && ifExistUser) ? `${classes.selected} ${classes.selectedUser}` : ''}
        `}>
        <p>{user.email}</p>
        {(isExistMemberInGroup && !(isExistMemberInGroup && ifExistUser)) && <img src={checkmark} alt=""/>}
        {(isExistMemberInGroup && ifExistUser) && <img src={removeMinus} alt=""/>}
        {(!isExistMemberInGroup && ifExistUser) && <img src={add} alt=""/>}
      </div>
    )
  });

  return (
    <div className={classes.addMembersContent}>
      <h2>Edit members</h2>
      <div className={classes.searchAndResultContent}>
        <input type="email" placeholder="Search by email" onChange={onSearchUserByEmail}/>
        <div className={classes.selectUsersDropdown}>
          {usersOptions.length ? usersOptions : <p>No Data</p>}
        </div>
      </div>
      <ProgramWindowButton disabled={selectedUsersState.length === 0}
                           classNames={classes.saveEditButton} label='Save' onClickButton={onClickSaveHandler}/>
    </div>
  )

};

export default EditMember;

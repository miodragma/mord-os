import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { fetchMembersByGroupId } from '../store/members-actions';

import checkmark from '../../../assets/checkmark.png';

import classes from './MembersList.module.scss';

const MembersList = props => {

  const dispatch = useDispatch();

  const { groupId } = props;

  const { members } = useSelector(state => state.members);

  useEffect(() => {
    dispatch(fetchMembersByGroupId(groupId))
  }, [dispatch, groupId]);

  const currentMembers = members.map(member => {
    return (
      <tr key={member.email}>
        <td>{member.name}</td>
        <td>{member.email}</td>
        <td>{member.isAdmin ? <img src={checkmark} alt=""/> : ''}</td>
      </tr>
    )
  })

  return (
    <div className={classes.membersContent}>
      <h2>Members</h2>
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Admin</th>
        </tr>
        </thead>
        <tbody>
        {currentMembers}
        </tbody>
      </table>
    </div>
  );

};

export default MembersList;

import React from 'react';
import { IUser } from './Interface';
import { Button } from '@mui/material';

interface IProps {
    users: Array<IUser>;
    editRow: (user: IUser) => void;
    deleteUser: (id: number) => void;
  }

const ViewUsers: React.FunctionComponent<IProps> = (props) => {
  return <div>
      <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Gender</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.users.length > 0 ? (
        props.users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.age}</td>
            <td>{user.gender}</td>
            <td>
              <Button
                variant="contained"
                size='small'
                onClick={() => {
                  props.editRow(user)
                }}
                className="button muted-button"
              >
                Edit
              </Button>
              <Button
                variant="contained"
                size='small'
                color='error'
                onClick={() => props.deleteUser(user.id)}
                className="button muted-button"
              >
                Delete
              </Button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No users</td>
        </tr>
      )}
    </tbody>
  </table>
  </div>;
};

export default ViewUsers;
import React from 'react';
import { useState } from 'react';
import ViewUsers from './ViewUsers';
import { IBaseUser, IUser } from './Interface';

const AddEdit = () => {
  const usersData: Array<IUser> = [];
  const [ users, setUsers ] = useState(usersData)
  const initialFormState: IUser = { id: users.length, name: '', age: '', gender: ''};
	const [ currentUser, setCurrentUser ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)

  const addUser = (user: IBaseUser) => {
		const id = users.length + 1
		setUsers([ ...users, {...user, id }])
	}

  const updateUser = (id: number, updatedUser: IUser) => {
		setEditing(false)

		setUsers(users.map(user => (user.id === id ? updatedUser : user)))
	}

  const editRow = (user: IUser) => {
		setEditing(true)

		setCurrentUser(user)
	}

  const deleteUser = (id: number) => {
		setEditing(false)

		setUsers(users.filter(user => user.id !== id))
	}

  const handleSubmit = () => {
    addUser(currentUser);
    clearForm();
  };

  const clearForm = () => {
    setCurrentUser({
      id: currentUser.id + 1,
      name: '',
      age: '',
      gender: ''
    });
  };

  const handleUpdateSubmit = () => {
    updateUser(currentUser.id ,currentUser);
    setEditing(false);
    clearForm();
  };

  const handleCancelSubmit = () => {
    setEditing(false);
    clearForm();
  }

  const handleInputChange = (event: React.ChangeEvent<any>) => {
		const { name, value } = event.target

		setCurrentUser({ ...currentUser, [name]: value })
	}

  return <div>
    <form
    onSubmit={event => {
    event.preventDefault()
    if (currentUser.gender==='') return alert("Invalid Gender")
    if (editing===false) {
      handleSubmit()
    }
    else{
      handleUpdateSubmit()
    }}}>
      <label>Name : </label>
			<input type="text" name="name" value={currentUser.name} onChange={handleInputChange} required/>
			<label>Age : </label>
			<input type="number" name="age" value={currentUser.age} onChange={handleInputChange} required/>
      <label>Gender : </label>
      <select name="gender" value={currentUser.gender} onChange={handleInputChange} required>
        <option value='' >Choose</option>
        <option value='Male' >Male</option>
        <option value='Female'>Female</option>
      </select>
      {
        !editing ? (<button >Add</button>) : 
        (<><button >Update</button>
        <button onClick={handleCancelSubmit}>Cancel</button></>)
      }
    </form>
    <ViewUsers users={users} editRow={editRow} deleteUser={deleteUser}/>
  </div>;
};

export default AddEdit;
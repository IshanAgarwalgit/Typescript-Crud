import React from 'react';
import { useState } from 'react';
import ViewUsers from './ViewUsers';
import { IBaseUser, IUser } from './Interface';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    margin: 'auto',
    marginTop: '50px',
    padding: "30px",
    border: "2px solid",
    width: '50%'
  },
  Cards: {
    justifyContent: "center",
    margin: 'auto',
    width: '50%',
  },
  formfont: {
    fontSize: '50px',
  },
  Inputfields: {
    margin: 15,
    width: "80%",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
  },
});

const AddEdit = () => {
  const classes = useStyles();
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

  return <><div className={classes.container}>
    <form className={classes.formfont}
    onSubmit={event => {
    event.preventDefault()
    if (currentUser.gender==='') return alert("Invalid Gender")
    if (editing===false) {
      handleSubmit()
    }
    else{
      handleUpdateSubmit()
    }}}>
      <TextField
      className={classes.Inputfields}
      label="Full Name"
      type="text"
      name="name"
      variant="filled" size='small'
      required
      value={currentUser.name}
      onChange={handleInputChange}
      />
      <TextField
      className={classes.Inputfields}
      label="Age"
      type="number"
      name="age"
      variant="filled" size='small'
      required
      value={currentUser.age}
      onChange={handleInputChange}
      />
      <TextField
              className={classes.Inputfields}
              select
              label="Gender"
              name="gender"
              value={currentUser.gender}
              variant="filled" size='small'
              required
              onChange={handleInputChange}
            >
                <MenuItem value=''>Choose</MenuItem>
                <MenuItem value='Male'>Male</MenuItem>
                <MenuItem value='Female'>Female</MenuItem>
            </TextField>
      <div className={classes.buttons}>
      {
        !editing ? (<Button variant="contained" size='small' type="submit">Add</Button>) : 
        (<><Button variant="contained" size='small' color='primary' type="submit">Update</Button>
        <Button variant="contained" color='error' size='small' onClick={handleCancelSubmit}>Cancel</Button></>)
      }
      </div>
    </form>
    </div>
    <div className={classes.Cards}>
    <ViewUsers users={users} editRow={editRow} deleteUser={deleteUser}/>
    </div>
    </>;
};

export default AddEdit;
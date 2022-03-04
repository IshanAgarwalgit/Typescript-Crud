import { useState } from 'react';
import ViewUsers from './ViewUsers';
import { IUser } from './Interface';
import { makeStyles } from "@mui/styles";
import { useStoreState, useStoreActions } from "easy-peasy";
import { ReactForm, setDefaultProps } from 'react-forms';
import * as YUP from 'yup';

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
  }
});

const AddEdit = () => {

  const users: IUser[] = useStoreState((state: any) => state.users);
  // const dispatch = useDispatch();

  const classes = useStyles()
  const [currentUser, setCurrentUser] = useState<IUser>({
    id: 0,
    name: "",
    age: "",
    gender: ""
  });

  const addUser: any = useStoreActions((actions: any) => actions.addUser);

  const updateUser: any = useStoreActions((actions: any) => actions.updateUser);

  const editRow = (user: IUser) => {
    setButtonName("Update")
		setCurrentUser(user)
	}

  const deleteUser: any = useStoreActions(
    (actions: any) => actions.deleteUser
  );

  const handleAddSubmit = (event: IUser) => {
    addUser(event);
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

  const handleUpdateSubmit = (event: IUser) => {
    updateUser(event);
    setButtonName("Add");
    clearForm();
  };

  const handleSubmit = (event: IUser) => {
    buttonName === "Add" ? handleAddSubmit(event) : handleUpdateSubmit(event);
  }

  setDefaultProps('text', { required: true, variant: "filled", size: 'small' });
  setDefaultProps('select', { required: true, variant: "filled", autowidth: "true", size: 'small' });

  const NameProps = {
    label: "Name"
  }

  const AgeProps = {
    label: "Age"
  }

  const GenderProps = {
    label: "Gender",
    options: [{ name: 'Male', value: 'Male' }, { name: 'Female', value: 'Female' }],
  }
  const myConfig = [{
    type: 'text',
    valueKey: 'name',
    fieldProps: { ...NameProps }
  },
  {
    type: 'text',
    valueKey: 'age',
    fieldProps: { ...AgeProps }
  },
  {
    type: 'select',
    valueKey: 'gender',
    fieldProps: { ...GenderProps }
  }
  ]

  const [buttonName, setButtonName] = useState("Add");
  const submitButtonProps = { color: "primary" as const, fullwidth: "true"}

  const loaderProps = { variant: "determinate" as const}

  const actionConfig = {
    submitButtonText: buttonName,
    submitButtonProps: submitButtonProps,
    loaderProps: loaderProps
  }

  const formValidation = YUP.object({
    name: YUP.string().required("Enter a valid name!"),
    age: YUP.string().required("Enter a valid age!"),
    gender: YUP.string().required("Select a gender!")
  })

  return <><div className={classes.container}>
        <ReactForm
          formId='react-form-crud'
          config={myConfig}
          initialValues={currentUser}
          validationSchema={formValidation}
          onSubmit={handleSubmit}
          actionConfig={actionConfig}
          enableReinitialize
        />
      </div>
    <div className={classes.Cards}>
    <ViewUsers users={users} editRow={editRow} deleteUser={deleteUser}/>
    </div>
    </>;
};

export default AddEdit;
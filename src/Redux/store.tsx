import { createStore, action } from "easy-peasy";
import { IUser } from "../Components/Interface";

const store = createStore({
      users: [
        {
          id: 0,
          name: "",
          age: "",
          gender: ""
        },
      ],
      addUser: action((state: any, payload: IUser) => {
        state.users.push(payload);
      }),
  
      updateUser: action((state: any, payload: IUser) => {
        const updatedUser = state.users.map((user: IUser) =>
          user.id === payload.id ? payload : user
        );
        state.users = updatedUser;
      }),
  
      deleteUser: action((state: any, payload: number) => {
        const filteredUsers = state.users.filter(
          (user: IUser) => user.id !== payload
        );
        state.users = filteredUsers;
      })
  });
  
  export default store;
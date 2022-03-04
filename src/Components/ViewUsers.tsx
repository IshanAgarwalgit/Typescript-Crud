import React from 'react';
import { IUser } from './Interface';
import { Button } from '@mui/material';
import Card from "@mui/material/Card";
import { makeStyles } from "@mui/styles";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const useStyle = makeStyles({
  Card: {
    margin: 'auto',
    marginTop: 20,
    width: '80%',
  },
  table: {
    margin: 'auto'
  }
});

interface IProps {
    users: Array<IUser>;
    editRow: (user: IUser) => void;
    deleteUser: (id: number) => void;
  }

const ViewUsers: React.FunctionComponent<IProps> = ({users , editRow, deleteUser}) => {

  const classes = useStyle();

  return <Card 
  variant="outlined"
  className={classes.Card}
  >
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="customized table" className={classes.table}>
    <TableHead>
      <TableRow>
        <StyledTableCell>Name</StyledTableCell>
        <StyledTableCell align="center">Age</StyledTableCell>
        <StyledTableCell align="center">Gender</StyledTableCell>
        <StyledTableCell align="center">Actions</StyledTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {users.length > 0 ? (
        users.map(user => (
          <TableRow key={user.id}>
            <StyledTableCell component="th" scope="row">{user.name}</StyledTableCell>
            <StyledTableCell align="center">{user.age}</StyledTableCell>
            <StyledTableCell align="center">{user.gender}</StyledTableCell>
            <StyledTableCell align="center">
              <Button
                variant="contained"
                size='small'
                onClick={() => {
                  editRow(user)
                }}
                className="button muted-button"
              >
                Edit
              </Button>
              <Button
                variant="contained"
                size='small'
                color='error'
                onClick={() => deleteUser(user.id)}
                className="button muted-button"
              >
                Delete
              </Button>
            </StyledTableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <StyledTableCell align="center">No users</StyledTableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
  </TableContainer>
  </Card>;
};

export default ViewUsers;
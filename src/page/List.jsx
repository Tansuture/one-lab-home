import { useState } from "react";
import styled from "styled-components";

import cancel from "../images/cancel.svg";
import trash from "../images/trash.svg";
import save from "../images/save.svg";
import pen from "../images/pen.svg";
import { useDispatch, useSelector } from "react-redux";
import { editUser, removeUser } from "../redux/slices/userSlice";

const Table = styled.table`
  width: 100%;
  margin-top: 10px;

  border-collapse: collapse;
`;
const Container = styled.div`
  background-color: #4abdac;
`;

const Th = styled.th`
  background-color: #4abdac;
  padding: 10px;
  color: white;
  border: 1px solid #ddd;
`;

const TD = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  color: white;
`;

const Button = styled.button`
  border: none;
  background-color: #4abdac;
  cursor: pointer;
  margin-left: 10px;
  border: 1px solid grey;
`;

const Image = styled.img`
  width: 20px;
  height: 20px;
`;

const Input = styled.input`
  border: none;
  outline: none;
`;

export default function List() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [rowIDToEdit, setRowIDToEdit] = useState(undefined);
  const [savedUsers,setSavedUsers]=useState([])

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.list);

  const [editedRow, setEditedRow] = useState();

  const handleEdit = (rowID) => {
    setIsEditMode(true);

    const rowToEdit = users.find((user) => user.id === rowID);
    setEditedRow(rowToEdit);
    setRowIDToEdit(rowID);
  };

  const handleOnChangeField = (e, rowID) => {
    const { name, value } = e.target;

    setEditedRow((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancelEditing = () => {
    setIsEditMode(false);
    setEditedRow(undefined);
  };

  const handleRemoveRow = (rowID) => {
    const updatedUsers = users.filter((user) => user.id !== rowID);
    dispatch(removeUser(rowID));
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
  };

  const handleSaveRowChanges = () => {
    const updatedUsers = users.map((user) =>
      user.id === editedRow.id ? { ...user, ...editedRow } : user
    );
    dispatch(editUser(editedRow));
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setIsEditMode(false);
    setEditedRow({});
  };

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Surname</Th>
            <Th>Phone Number</Th>
          </tr>
        </thead>
        <tbody>
          {users.map((row) => (
            <tr key={row.id}>
              <TD>
                {isEditMode && rowIDToEdit === row.id ? (
                  <Input
                    type="text"
                    value={editedRow ? editedRow.name : row.name}
                    id={row.id}
                    name="name"
                    onChange={(e) => handleOnChangeField(e, row.id)}
                  />
                ) : (
                  row.name
                )}
              </TD>
              <TD>
                {isEditMode && rowIDToEdit === row.id ? (
                  <Input
                    type="text"
                    value={editedRow ? editedRow.surname : row.surname}
                    id={row.id}
                    name="surname"
                    onChange={(e) => handleOnChangeField(e, row.id)}
                  />
                ) : (
                  row.surname
                )}
              </TD>

              <TD>
                {isEditMode && rowIDToEdit === row.id ? (
                  <Input
                    type="number"
                    value={editedRow ? editedRow.phone : row.phone}
                    id={row.id}
                    name="phone"
                    onChange={(e) => handleOnChangeField(e, row.id)}
                  />
                ) : (
                  row.phone
                )}
              </TD>
              <TD>
                {isEditMode && rowIDToEdit === row.id ? (
                  <Button
                    onClick={() => handleSaveRowChanges()}
                    disabled={!editedRow}
                  >
                    <Image src={save} />
                  </Button>
                ) : (
                  <Button onClick={() => handleEdit(row.id)}>
                    <Image src={pen} />
                  </Button>
                )}
                {isEditMode && rowIDToEdit === row.id ? (
                  <Button onClick={() => handleCancelEditing()}>
                    <Image src={cancel} />
                  </Button>
                ) : (
                  <Button onClick={() => handleRemoveRow(row.id)}>
                    <Image src={trash} />
                  </Button>
                )}
              </TD>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

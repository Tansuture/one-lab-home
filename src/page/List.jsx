import { useEffect, useState } from "react";
import styled from "styled-components";
import Person from "../components/Person";
import cancel from "../images/cancel.svg";
import trash from "../images/trash.svg";
import save from "../images/save.svg";
import pen from "../images/pen.svg";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #f0f0f0;
  padding: 10px;
  border: 1px solid #ddd;
`;

const TD = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;
const Input = styled.input`
  border: none;
  width: 100%;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  margin-left: 10px;
  border: 1px solid grey;
`;

const Image = styled.img`
  width: 20px;
  height: 20px;
`;
export default function List() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [rowIDToEdit, setRowIDToEdit] = useState(undefined);
  const [rowsState, setRowsState] = useState([]);
  const [editedRow, setEditedRow] = useState();

  useEffect(() => {
    let list = sessionStorage.getItem("list");
    if (!list) {
      list = [];
    } else {
      list = JSON.parse(list);
    }
    setRowsState(list);
  }, []);

  const handleEdit = (rowID) => {
    setIsEditMode(true);
    setEditedRow(undefined);
    setRowIDToEdit(rowID);
  };
  const handleRemoveRow = (rowID) => {
    const newData = rowsState.filter((row) => {
      return row.id !== rowID ? row : null;
    });
    setRowsState(newData);
    sessionStorage.setItem("list", JSON.stringify(newData));
  };
  const handleOnChangeField = (e, rowID) => {
    console.log(rowID);
    const { name: fieldName, value } = e.target;

    setEditedRow((prev) => ({
      ...prev,
      id: rowID,
      [fieldName]: value,
    }));
  };
  const handleCancelEditing = () => {
    setIsEditMode(false);
    setEditedRow(undefined);
  };
  const handleSaveRowChanges = () => {
    setIsEditMode(false);
    const newData = rowsState.map((row) => {
      if (row.id === editedRow.id) {
        return {
          ...row, // Keep the existing row fields
          ...editedRow, // Override with edited fields
        };
      }
      return row;
    });
    setRowsState(newData);
    console.log(newData);
    sessionStorage.setItem("list", JSON.stringify(newData));
    setEditedRow(undefined);
  };

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Surname</Th>
            <Th>Phone Number</Th>
          </tr>
        </thead>
        <tbody>
          {rowsState.map((row) => (
            <tr key={row.id}>
              <TD>
                {isEditMode && rowIDToEdit === row.id ? (
                  <input
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
                  <input
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
                  <input
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
    </div>
  );
}

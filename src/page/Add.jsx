import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../redux/slices/userSlice";
import styled from "styled-components";
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #4abdac;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  width: 100%;
  border: none;
  border-radius: 20px;
  background-color: #4abdac;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
`;
const Div = styled.div`
  background-color: white;

  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
`;

// .register-form button:hover {
//     background-color: #38a89d; /* A slightly darker shade for the hover state */
// }
export default function Add() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const users = useSelector((state) => state.users.list);

  const [phone, setPhone] = useState("");

  const navigateTo = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleAddUser = () => {
    if (!name || !surname || !phone) return;
    let list = localStorage.getItem("list");
    if (!list) {
      list = [];
    } else {
      list = JSON.parse(list);
    }
    dispatch(addUser({ id: Date.now(), name, surname, phone }));
    localStorage.setItem("users", JSON.stringify(users));

    navigateTo("/");
  };

  return (
    <FormContainer>
      <Div>
        <h2>Add User</h2>
        <Input
          value={name}
          onChange={handleNameChange}
          type="text"
          name="name"
          placeholder="First Name"
        />
        <Input
          value={surname}
          onChange={handleSurnameChange}
          type="text"
          name="surname"
          placeholder="Last Name"
        />
        <Input
          value={phone}
          onChange={handlePhoneChange}
          type="number"
          name="phonenumber"
          placeholder="Phone Number"
        />
        <Button onClick={handleAddUser}>Save</Button>
      </Div>
    </FormContainer>
  );
}

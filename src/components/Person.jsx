import styled from "styled-components"

export default function Person({person}) {
    return (
        <StyledContainer vip={person.name === "name"}>
            <p>{person.name}</p>
            <p>{person.surname}</p>
            <p>{person.phone}</p>
        </StyledContainer>
    )
}

const StyledContainer = styled("div")`
    background-color: ${(props) => props.vip ? "green" : "red"};
`
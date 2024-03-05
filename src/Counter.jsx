import { useEffect } from "react";

function Counter({ count, handleClick }) {

    useEffect(() => {
        console.log("Counter rerendered");
    }, [])

    return (
        <div>
            <p> {count} </p>
            <button onClick={handleClick}>
                Click
            </button>
        </div>
    )
}
export default Counter;


/*
                html
    head    body    footer
        App
        Counter



*/
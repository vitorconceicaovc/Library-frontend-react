import { Link } from "react-router-dom";

export function Home() {
    return(
        <>
         <br /><br />
           <h1>Local Library Home</h1>
           <p>Welcome to LocalLibrary, a website developed by react and django!</p>
           <br />
           <h1>Dynamic content</h1>
           <p>The library has the following record counts:</p>
           <br />
           <ul>
            <li>Books: 2</li>
            <li>Copies: 2</li>
            <li>Copies available: 2</li>
            <li>Authors: 2</li>
           </ul>
        </>
    )
}
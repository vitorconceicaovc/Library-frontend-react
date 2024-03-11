import { Link } from "react-router-dom"

const Nav = () => {
    return(
        <>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/books'>All books</Link></li>
            <li><Link to='/authors'>All authors</Link></li>
        </>
    )
}

export default Nav
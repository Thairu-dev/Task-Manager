import react from 'react'

function Navbar () {
    return(
        <nav>
            <ul>
                <li><link to="/tasks">Tasks</link></li>
                <li><link to="/users">Users</link></li>
                <li><link to="assignments">Assignments</link></li>
            </ul>
        </nav>
    )
}
export default Navbar;
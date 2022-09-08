import './Navigation.scss'
import {Link} from 'react-router-dom'

export const Navigation = () => {
    return (

        <nav className="settings-section-navigation-container">
            <ul>
                <li className="non-active-link">
                   <Link to="/settings/general">General</Link>
                </li>
                <li className="active-link">
                    <Link to="/settings/password">Password</Link>
                </li>
            </ul>
        </nav>

    )

}
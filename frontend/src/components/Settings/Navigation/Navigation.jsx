import './Navigation.scss'
import {Link} from 'react-router-dom'

export const Navigation = ({inactive, active}) => {
    return (

        <nav className="settings-section-navigation-container">
            <ul>
                <li className={active}>
                   <Link to="/settings/general">General</Link>
                </li>
                <li className={inactive}>
                    <Link to="/settings/password">Password</Link>
                </li>
            </ul>
        </nav>

    )

}
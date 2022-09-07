import "./Login.scss"
import Logo from '../../components/Logo/Logo'
import { LoginCard } from "./LoginCard"

export const Login = () => {
    return (
    <div className="login">
        <div className="login-header">
            <Logo/>
            <h1>Tasks</h1>
        </div>
        <LoginCard/>
    </div>
    )

}
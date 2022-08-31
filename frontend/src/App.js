import {Routes, Route} from "react-router-dom";
import SignUpPage from "./pages/Sign Up /SignUpPage";


function App() {
    return (
        <div className='main-body'>
            <Routes>
                <Route path='/signup' element={<SignUpPage/>}></Route>
            </Routes>
        </div>
    );
}

export default App;

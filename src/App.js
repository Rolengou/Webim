import {SignIn} from "./components/Form";
import {HashRouter, Route, Switch} from "react-router-dom";
import {Main} from "./components/Main";

function App() {
    return (
        <div>
            <HashRouter>
                <Switch>
                    <Route exact path='/' component={SignIn}/>
                    <Route path='/users' component={Main}/>
                </Switch>
            </HashRouter>
        </div>
    );
}

export default App;

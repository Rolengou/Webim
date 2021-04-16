import {SignIn} from "./components/Form";
import {Users} from "./components/Users";
import {HashRouter, Route, Switch} from "react-router-dom";

function App() {
    return (
        <div>
            <HashRouter>
                <Switch>
                    <Route exact path='/' component={SignIn}/>
                    <Route path='/users' component={Users}/>
                </Switch>
            </HashRouter>
        </div>
    );
}


export default App;

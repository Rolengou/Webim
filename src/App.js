import {SignIn} from "./components/Form";
import {Users} from "./components/Users";
import {HashRouter, Route, Switch} from "react-router-dom";
import {DataTable} from "./components/table";

function App() {
    return (
        <div>
            <HashRouter>
                <Switch>
                    <Route exact path='/' component={SignIn}/>
                    <Route path='/users' component={DataTable}/>
                </Switch>
            </HashRouter>
        </div>
    );
}


export default App;

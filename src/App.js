import {SignIn} from "./components/Form";
import {Users} from "./components/Users";
import {BrowserRouter, Route} from "react-router-dom";


function App() {
  return (
      <div>
          <BrowserRouter>
            <Route exact path='/' component={SignIn} />
            <Route path='/users' component={Users} />
          </BrowserRouter>
      </div>
  );
}

export default App;

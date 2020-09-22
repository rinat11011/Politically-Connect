import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Login from "./components/Login";
import PartyPage from "./components/PartyPage";
import AddRegister from "./components/AddRegister";
import RemoveRegister from "./components/RemoveRegister";
import AddParties from "./components/AddParties";
import RemoveParties from "./components/RemoveParties";
import GetParties from "./components/GetParties";
import MOJPage from "./components/MOJPage";
import AddUserMOJ from "./components/AddUserMOJ";
import GetCandidates from "./components/getCandidates";
import GetChain from "./components/GetChain";
import MainPage from "./components/MainPage";
import HomeRegistration from "./components/HomeRegistration";
import RemoveHomeRegistration from "./components/RemoveHomeRegistration";
import PieStat from "./components/PieStat";

function App() {
    return (<Router>

            <Switch>
                <Route exact path='/' component={MainPage} />
                <Route path="/sign-in" component={Login} />
                <Route path="/PartyPage" component={PartyPage}/>
                <div className="auth-wrapper">
                    <Route path="/:id/blockchain" component={GetChain} />
                    <Route path="/:id/AddRegister" component={AddRegister}/>
                    <Route path="/:id/RemoveRegister" component={RemoveRegister}/>
                    <Route path="/:id/GetCandidates" component={GetCandidates}/>
                    <Route path="/:id/Stat" component={PieStat}/>
                    <Route path="/MOJPage" component={MOJPage}/>
                    <Route path="/MOJ/AddParties" component={AddParties}/>
                    <Route path="/MOJ/AddUserMOJ" component={AddUserMOJ}/>
                    <Route path="/MOJ/RemoveParties" component={RemoveParties}/>
                    <Route path="/MOJ/getParties" component={GetParties}/>
                    <Route path="/HomeRegistration" component={HomeRegistration}/>
                    <Route path="/RemoveHomeRegistration" component={RemoveHomeRegistration}/>

                </div>
            </Switch>

        </Router>
    );
}

export default App;
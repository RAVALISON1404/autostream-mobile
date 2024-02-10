import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton } from "@ionic/react";
import { Redirect, Route } from "react-router";
import { Home } from "./Home";
import { AjoutAnnonce } from "./AjoutAnnonce";

export const Index: React.FC = () => {
    var connected = false;
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) connected = true;
    console.log('Rendering Index component...');
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Redirect exact path="/home" to="/home/annonces" />
                <Route path="/home/annonces">
                    {connected ? <Home /> : <Redirect to="/signin" />}
                </Route>
                <Route path="/home/annonce">
                    {connected ? <AjoutAnnonce /> : <Redirect to="/signin" />}
                </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/home/annonces">
                    <span className='icon has-text-info'>
                        <i className="fa-solid fa-house fa-2x"></i>
                    </span>
                </IonTabButton>
                <IonTabButton tab="annonce" href="/home/annonce">
                    <span className='icon has-text-info'>
                        <i className="fa-solid fa-bullhorn fa-2x"></i>
                    </span>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>

    );
}
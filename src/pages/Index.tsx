import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton } from "@ionic/react";
import { useEffect, useState } from "react";
import { Redirect, Route } from "react-router";
import { Home } from "./Home";
import { AjoutAnnonce } from "./AjoutAnnonce";
import { Profil } from "./Profil";

export const Index: React.FC = () => {
    const [connected, setConnected] = useState<boolean>(false);
    useEffect(() => {
        const token = `window.localStorage.getItem('token')`;
        if (token) setConnected(true);
    }, []);
    console.log('Rendering Index component...');
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Redirect exact path="/home" to="/home/annonces" />
                <Route path="/home/annonces" component={Home} />
                <Route path="/home/annonce">
                    {connected ? <AjoutAnnonce /> : <Redirect to="/login" />}
                </Route>
                <Route path="/home/profile">
                    {connected ? <Profil /> : <Redirect to="/login" />}
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
                <IonTabButton tab="library" href="/home/annonces">
                    <span className='icon has-text-info'>
                        <i className="fa-solid fa-magnifying-glass fa-2x"></i>
                    </span>
                </IonTabButton>
                <IonTabButton tab="profil" href="/home/profile">
                    <span className='icon has-text-info'>
                        <i className="fa-regular fa-user fa-2x"></i>
                    </span>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>

    );
}
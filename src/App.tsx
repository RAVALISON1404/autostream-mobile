import { setupIonicReact, IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Index } from './pages/Index';
import { DetailAnnonce } from './pages/DetailAnnonce';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';

import '@ionic/react/css/core.css';
import '@ionic/react/css/padding.css';
import 'bulma-extensions/bulma-pageloader/dist/css/bulma-pageloader.min.css';
import 'bulma-dashboard/dist/bulma-dashboard.css';
import 'bulma-extensions/bulma-carousel/dist/css/bulma-carousel.min.css';
import 'bulma-extensions/bulma-divider/dist/css/bulma-divider.min.css';
import './theme/style.css';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const token = localStorage.getItem('token');
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Redirect exact path="/" to="/home" />
          <Redirect path='/home' to={ token ? '/home': '/signin'} />
          <Route path="/home">
            <Index />
          </Route>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/annonce/detail/:id" component={DetailAnnonce} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;

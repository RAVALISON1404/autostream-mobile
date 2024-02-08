import { setupIonicReact, IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { Index } from './pages/Index';
import { DetailAnnonce } from './pages/DetailAnnonce';
import { Login } from './pages/Login';

import '@ionic/react/css/core.css';
import '@ionic/react/css/padding.css';
import 'bulma-extensions/bulma-pageloader/dist/css/bulma-pageloader.min.css';
import 'bulma-dashboard/dist/bulma-dashboard.css';
import 'bulma-extensions/bulma-carousel/dist/css/bulma-carousel.min.css';
import 'bulma-extensions/bulma-divider/dist/css/bulma-divider.min.css';
import './theme/style.css';
import './theme/variables.css';
import { useState } from 'react';

setupIonicReact();

const App: React.FC = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  return (
    <IonApp>
      <div className={`pageloader is-info ${loaded ? '' : 'is-active'}`}></div>
      <IonReactRouter>
        <IonRouterOutlet>
          <Redirect exact path="/" to="/home" />
          <Route path="/home" component={Index} />
          <Route path="/login" component={Login} />
          <Route path="/annonce/detail/:id" component={DetailAnnonce} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;

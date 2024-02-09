import { IonContent, IonPage } from "@ionic/react";
import { useState } from "react";
import 'bulma-extensions/bulma-pageloader/dist/css/bulma-pageloader.min.css';

export const SignIn: React.FC = () => {
    const logo = '/logo.png';
    const [loaded, setLoaded] = useState<boolean>(true);
    console.log('Rendering SignIn component...');
    return (
        <IonPage>
            <IonContent fullscreen className="ion-padding">
                <div className="container mt-6 pt-6">
                    <h3 className="title has-text-centered">
                        <span className="has-text-info">AUTO</span><span className="has-text-danger">STREAM</span>
                    </h3>
                    <div className="field">
                        <label className="label">
                            E-mail
                        </label>
                        <div className="control">
                            <input type="email" className="input" placeholder="Entrez votre adresse e-mail" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">
                            Mot de passe
                        </label>
                        <div className="control">
                            <input type="password" className="input" placeholder="Entrez votre mot de passe" />
                        </div>
                    </div>
                    <br />
                    <div className="field">
                        <div className="control">
                            <button className="button is-fullwidth is-info">
                                Se connecter
                            </button>
                        </div>
                    </div>
                    <p>Vous n'avez pas de compte? <a href="/signup">Inscrivez-vous ici</a></p>
                    <div className="is-divider" data-content="OU"></div>
                    <div className="field">
                        <div className="control">
                            <button className="button is-fullwidth is-info is-outlined has-text-weight-bold" disabled>
                                Continuer avec Google
                            </button>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}
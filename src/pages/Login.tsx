import { IonContent, IonImg, IonPage } from "@ionic/react";
import { useState } from "react";
import { Header } from "../components/Header";
import 'bulma-extensions/bulma-pageloader/dist/css/bulma-pageloader.min.css';

export const Login: React.FC = () => {
    const logo = '/logo.png';
    const [loaded, setLoaded] = useState<boolean>(true);
    console.log('Rendering Login component...');
    return (
        <IonPage>
            <Header loading={ loaded } />
            <IonContent fullscreen className="content">
                <div className="columns">
                    <div className="column is-8 p-0">
                        <div className="carousel-login" style={{ overflowX: "hidden"}}>
                            <div className="item-1">
                                <figure className="image is-4by3">
                                    <img src="assets/img/undraw_electric_car_b-7-hl.svg" alt="Placeholder image"/>
                                </figure>
                            </div>
                            <div className="item-2">
                                <figure className="image is-4by3">
                                    <img src="assets/img/undraw_city_driver_re_9xyv.svg" alt="Placeholder image"/>
                                </figure>
                            </div>
                            <div className="item-3">
                                <figure className="image is-4by3">
                                    <img src="assets/img/undraw_delivery_truck_vt6p.png" alt="Placeholder image"/>
                                </figure>
                            </div>
                        </div>
                    </div>
                    <div className="column is-4 is-full-touch pl-5">
                        <div className="content is-flex is-flex-direction-column is-justify-content-center is-align-content-center">
                            <div className="is-flex is-justify-content-center">
                                <figure className="image is-64x64 is-flex">
                                    <img src="https://bulma.io/images/placeholders/1280x960.png" className="is-rounded"/>
                                </figure>
                            </div>
                            <div className="field">
                                <label className="label">
                                    E-mail
                                </label>
                                <div className="control">
                                    <input type="email" className="input" placeholder="Entrez votre adresse e-mail"/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">
                                    Mot de passe
                                </label>
                                <div className="control">
                                    <input type="password" className="input" placeholder="Entrez votre mot de passe"/>
                                </div>
                            </div>
                            <br/>
                            <div className="field">
                                <div className="control">
                                    <button className="button is-fullwidth is-info">
                                        Se connecter
                                    </button>
                                </div>
                            </div>
                            <div className="is-divider" data-content="OU"></div>
                            <div className="field">
                                <div className="control">
                                    <button className="button is-fullwidth is-info is-outlined has-text-weight-bold">
                                        Continuer avec Google
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}
import { IonPage, IonImg, IonContent, IonRadio, IonRadioGroup } from "@ionic/react";
import { useState } from "react";
import 'bulma-extensions/bulma-pageloader/dist/css/bulma-pageloader.min.css';
import '../theme/style.css';

export const AjoutAnnonce: React.FC = () => {
    const logo = '/logo.png';
    const [loaded, setLoaded] = useState<boolean>(true);
    const Tabs = document.querySelectorAll("[data-tab]");
    console.log(Tabs);
    
    console.log('Rendering AjoutAnnonce component...');
    return (
        <IonPage>
            <div className={`pageloader is-info ${loaded ? '' : 'is-active'}`}></div>
            <header>
                <nav className="navbar is-transparent has-background-light">
                    <div className="container is-fluid">
                        <div className="navbar-brand">
                            <a className="navbar-item">
                                <IonImg className="image is-48x48 is-rounded" src={logo}></IonImg>
                            </a>
                        </div>
                    </div>
                </nav>
            </header>
            <IonContent fullscreen className="content">
                <div className="section">
                    <div className="field">
                        <label className="label">Marque</label>
                        <div className="control is-expanded">
                            <div className="select is-fullwidth">
                                <select>
                                    <option>
                                        Marque 1
                                    </option>
                                    <option>
                                        Marque 2
                                    </option>
                                    <option>
                                        Marque 3
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Modele</label>
                        <div className="control is-expanded">
                            <div className="control is-expanded">
                                <div className="select is-fullwidth">
                                    <select>
                                        <option>
                                            Modele 1
                                        </option>
                                        <option>
                                            Modele 2
                                        </option>
                                        <option>
                                            Modele 3
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Prix</label>
                        <div className="control is-expanded">
                            <input type="number" className="input" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Kilometrage</label>
                        <div className="control is-expanded">
                            <input type="number" className="input" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Date de sortie</label>
                        <div className="control is-expanded">
                            <input type="date" className="input" />
                        </div>
                    </div>
                    <div className="field is-grouped is-grouped-right">
                        <div className="control">
                            <a className="button is-info is-outlined" href="#1" data-tab="1">
                                Suivant
                            </a>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Puissance</label>
                        <div className="control is-expanded">
                            <input type="number" className="input"  />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Cylindree</label>
                        <div className="control is-expanded">
                            <input type="number" className="input" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Options</label>
                        <div className="control">
                            <label className="checkbox">
                                <input type="checkbox" />
                                Option 1
                            </label>
                        </div>
                        <div className="control">
                            <label className="checkbox">
                                <input type="checkbox" />
                                Option 2
                            </label>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Description</label>
                        <div className="control is-expanded">
                            <textarea className="textarea" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Conduite</label>
                        <div className="control is-expanded">
                            <IonRadioGroup name="conduite" value="droite">
                                <IonRadio value="droite" labelPlacement="end">droite</IonRadio>
                                <br />
                                <IonRadio value="gauche" labelPlacement="end">gauche</IonRadio>
                            </IonRadioGroup>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Transmission</label>
                        <div className="control is-expanded">
                            <div className="select is-fullwidth">
                                <select>
                                    <option>
                                        Automatique
                                    </option>
                                    <option>
                                        Manuelle
                                    </option>
                                    <option>
                                        Sequentielle
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Energie</label>
                        <div className="control is-expanded">
                            <div className="select is-fullwidth">
                                <select>
                                    <option>
                                        Essence
                                    </option>
                                    <option>
                                        Diesel
                                    </option>
                                    <option>
                                        Hybride
                                    </option>
                                    <option>
                                        Electrique
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Nombre de place</label>
                        <div className="control is-expanded">
                            <input type="number" className="input" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Nombre de porte</label>
                        <div className="control is-expanded">
                            <input type="number" className="input" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Nombre de cylindre</label>
                        <div className="control is-expanded">
                            <input type="number" className="input" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Type de conduite</label>
                        <div className="control is-expanded">
                            <div className="select is-fullwidth">
                                <select>
                                    <option>
                                        AWD
                                    </option>
                                    <option>
                                        RWD
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Fumeur</label>
                        <div className="control is-expanded">
                            <IonRadioGroup name="fumeur" value="oui">
                                <IonRadio value="oui" labelPlacement="end">Oui</IonRadio>
                                <br />
                                <IonRadio value="non" labelPlacement="end">Non</IonRadio>
                            </IonRadioGroup>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Nombre de cylindre</label>
                        <div className="control is-expanded">
                            <div className="file is-boxed">
                                <label className="file-label">
                                    <input className="file-input" type="file" name="resume" />
                                    <span className="file-cta">
                                        <span className="file-icon">
                                            <i className="fas fa-upload"></i>
                                        </span>
                                        <span className="file-label">
                                            Importer des photos
                                        </span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control is-expanded">
                            <button className="button is-fullwidth is-outlined is-danger has-text-weight-semibold">
                                Valider
                            </button>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};
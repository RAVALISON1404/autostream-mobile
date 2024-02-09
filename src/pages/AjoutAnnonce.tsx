import { IonPage, IonImg, IonContent, IonRadio, IonRadioGroup } from "@ionic/react";
import { useState, useEffect } from "react";
import 'bulma-extensions/bulma-pageloader/dist/css/bulma-pageloader.min.css';
import '../theme/style.css';
import { Drivetype, Options, Modele, Transmission, Energie, Conduite } from "../models/Annonce";
import useApi from "../service/Api";

export const AjoutAnnonce: React.FC = () => {
    const logo = '/logo.png';
    const [loaded, setLoaded] = useState<boolean>(false);
    const Tabs = document.querySelectorAll("[data-tab]");
    console.log(Tabs);

    const [drivetypes, setDrivetypes] = useState<Drivetype[]>([]);
    const { data, loading, error } = useApi<Drivetype[]>(
        'https://back-autostream-production.up.railway.app/drivetype'
    );
    //console.log(data);
    useEffect(() => {
        if (data) {
            setDrivetypes(data);
        }
    }, [data]);
    const [modeles, setModeles] = useState<Modele[]>([]);
    const { data: data1, loading: loading1, error: error1 } = useApi<Modele[]>(
        'https://back-autostream-production.up.railway.app/modele'
    );
    // console.log(data1);
    useEffect(() => {
        if (data1) {
            setModeles(data1);
        }
    }, [data1]);

    const [transmissions, setTransmissions] = useState<Transmission[]>([]);
    const { data: data2, loading: loading2, error: error2 } = useApi<Transmission[]>(
        'https://back-autostream-production.up.railway.app/transmission'
    );
    // console.log(data2);
    useEffect(() => {
        if (data2) {
            setTransmissions(data2);
        }
    }, [data2]);

    const [energies, setEnergies] = useState<Energie[]>([]);
    const { data: data3, loading: loading3, error: error3 } = useApi<Energie[]>(
        'https://back-autostream-production.up.railway.app/energie'
    );
    // console.log(data3);
    useEffect(() => {
        if (data3) {
            setEnergies(data3);
        }
    }, [data3]);

    const [options, setOptions] = useState<Options[]>([]);
    const { data: data4, loading: loading4, error: error4 } = useApi<Options[]>(
        'https://back-autostream-production.up.railway.app/options'
    );
    // console.log(data4);
    useEffect(() => {
        if (data4) {
            setOptions(data4);
        }
    }, [data4]);

    const voiture = 'https://back-autostream-production.up.railway.app/voiture';
    const annonce = 'https://back-autostream-production.up.railway.app/annonce';
    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        const formData = new FormData(document.querySelector('form')!);
        console.log(formData);
        
        const nbplace = formData.get('idmodele');
        const nbporte = formData.get('nbporte');
        const kilometrage = formData.get('kilometrage');
        const cylindre = formData.get('cylindre');
        const puissance = formData.get('puissance');
        const fumeur = formData.get('fumeur');
        const datesortie = formData.get('datesortie');
        const idconduite = formData.get('idconduite');
        const idmodele = formData.get('idmodele');
        const iddrivetype = formData.get('iddrivetype');
        const idtransmission = formData.get('idtransmission');
        const idenergie = formData.get('idenergie');
        const idoptions = formData.getAll('idoptions');
        const photos = formData.get('photos');
        const voitureEnvoyer = {
            "nbplace" : nbplace,
            "nbporte" : nbporte,
            "kilometrage" : kilometrage,
            "cylindre" : cylindre,
            "puissance" : puissance,
            "fumeur" : fumeur,
            "datesortie" : datesortie,
            "conduite": {
                "idconduite" : idconduite
            },
            "modele" : {
                "idmodele" : idmodele
            },
            "drivetype" : {
                "iddrivetype" : iddrivetype
            },
            "transmission" : {
                "idtransmission" : idtransmission
            },
            "energie" : {
                "idenergie" : idenergie
            },
            "idoptions" : [idoptions]
            , "photos" : photos
        }
        console.log(JSON.stringify(voitureEnvoyer));
        try {
            const response = await fetch(voiture, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },          
                body: JSON.stringify(voitureEnvoyer)
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);

                const annonceEnvoyer = {
                    
                }
                const token = responseData.response.token;
                localStorage.setItem('token',token);
                console.log("token ",localStorage.getItem('token'));
            }
            else {
                alert('Échec de la connexion', JSON.stringify(response));
            }
        }
        catch (error) {
            alert('Erreur lors de la connexion'+ error);
        }
    }


    //console.log('Rendering AjoutAnnonce component...');
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

                <form>
                    <div className="section">
                        <div className="field">
                            <label className="label">Modele</label>
                            <div className="control is-expanded">
                                <div className="control is-expanded">
                                    <div className="select is-fullwidth">
                                        <select name="idmodele">
                                            {modeles.map((modele, index) => {
                                                return (
                                                    <option key={index} value={modele.idmodele}>
                                                        {modele.nommodele}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Prix</label>
                            <div className="control is-expanded">
                                <input type="number" className="input" name="prix" />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Kilometrage</label>
                            <div className="control is-expanded">
                                <input type="number" className="input" name="kilometrage" />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Date de sortie</label>
                            <div className="control is-expanded">
                                <input type="date" className="input" name="datesortie" />
                            </div>
                        </div>
                        {/* <div className="field is-grouped is-grouped-right">
                        <div className="control">
                            <a className="button is-info is-outlined" href="#1" data-tab="1">
                                Suivant
                            </a>
                        </div>
                    </div> */}
                        <div className="field">
                            <label className="label">Puissance</label>
                            <div className="control is-expanded">
                                <input type="number" className="input" name="puissance" />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Drive type</label>
                            <div className="control is-expanded">
                                <div className="select is-fullwidth">
                                    <select name="iddrivetype">
                                        {drivetypes.map((drivetype, index) => {
                                            return (
                                                <option key={index} value={drivetype.iddrivetype}>
                                                    {drivetype.nomdrivetype}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Options</label>
                            {options.map((option, index) => {
                                return (
                                    <div className="control" key={index}>
                                        <label className="checkbox">
                                            <input type="checkbox" value={option.idoptions} name="idoptions" />
                                            {option.nomoptions}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="field">
                            <label className="label">Description</label>
                            <div className="control is-expanded">
                                <textarea className="textarea" name="descri" />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Conduite</label>
                            <div className="control is-expanded">
                                <IonRadioGroup name="idconduite" value="1">
                                    <IonRadio value="1" labelPlacement="end" name="idconduite">droite</IonRadio>
                                    <br />
                                    <IonRadio value="2" labelPlacement="end" name="idconduite">gauche</IonRadio>
                                </IonRadioGroup>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Transmission</label>
                            <div className="control is-expanded">
                                <div className="select is-fullwidth">
                                    <select name="idtransmission">
                                        {transmissions.map((transmission, index) => {
                                            return (
                                                <option key={index} value={transmission.idtransmission}>
                                                    {transmission.nomtransmission}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Energie</label>
                            <div className="control is-expanded">
                                <div className="select is-fullwidth">
                                    <select name="idenergie">
                                        {energies.map((energie, index) => {
                                            return (
                                                <option key={index} value={energie.idenergie}>
                                                    {energie.nomenergie}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Nombre de place</label>
                            <div className="control is-expanded">
                                <input type="number" className="input" name="nbplace" />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Nombre de porte</label>
                            <div className="control is-expanded">
                                <input type="number" className="input" name="nbporte" />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Nombre de cylindre</label>
                            <div className="control is-expanded">
                                <input type="number" className="input" name="cylindre" />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Fumeur</label>
                            <div className="control is-expanded">
                                <IonRadioGroup name="fumeur" value="0">
                                    <IonRadio value="0" labelPlacement="end" name="fumeur">Oui</IonRadio>
                                    <br />
                                    <IonRadio value="1" labelPlacement="end" name="fumeur">Non</IonRadio>
                                </IonRadioGroup>
                            </div>
                        </div>
                        <div className="field">
                        <label className="label">Photo</label>
                        <div className="control is-expanded">
                            <div className="file is-boxed">
                                <label className="file-label">
                                    <input className="file-input" type="file" name="photos" />
                                    <span className="file-cta">
                                        <span className="file-icon">
                                            <i className="fas fa-upload"></i>
                                        </span>
                                        <span className="file-label">
                                            Importer
                                        </span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                        <div className="field">
                            <div className="control is-expanded">
                                <button className="button is-fullwidth is-outlined is-danger has-text-weight-semibold" onClick={handleSubmit}>
                                    Valider
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

            </IonContent>
        </IonPage>
    );
};
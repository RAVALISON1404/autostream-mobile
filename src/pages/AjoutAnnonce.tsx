import {
    IonPage,
    IonImg,
    IonContent,
    IonRadio,
    IonRadioGroup,
} from "@ionic/react";
import { useState, useEffect } from "react";
import "bulma-extensions/bulma-pageloader/dist/css/bulma-pageloader.min.css";
import "../theme/style.css";
import {
    Drivetype,
    Options,
    Modele,
    Transmission,
    Energie,
} from "../models/Annonce";
import useApi from "../service/Api";
import imageCompression from "browser-image-compression";
import Resizer from "react-image-file-resizer";
import { useHistory } from "react-router";

export const AjoutAnnonce: React.FC = () => {
    const history = useHistory();
    const logout = async () => {
        localStorage.removeItem('token');
        history.push('/signin');
    }
    const resizeAndCompressImage = async (file: File) => {
        return new Promise((resolve, reject) => {
            Resizer.imageFileResizer(
                file,
                1280,
                960,
                "PNG",
                70,
                0,
                (uri) => {
                    resolve(uri);
                },
                "base64"
            );
        });
    };
    const logo = "/logo.png";
    const [loaded, setLoaded] = useState<boolean>(false);
    const token = localStorage.getItem("token");
    const [drivetypes, setDrivetypes] = useState<Drivetype[]>([]);
    const { data, loading, error } = useApi<Drivetype[]>(
        "https://back-autostream-production.up.railway.app/drivetype"
    );
    useEffect(() => {
        if (data) {
            setDrivetypes(data);
        }
    }, [data]);
    const [modeles, setModeles] = useState<Modele[]>([]);
    const {
        data: data1,
        loading: loading1,
        error: error1,
    } = useApi<Modele[]>(
        "https://back-autostream-production.up.railway.app/modele"
    );
    useEffect(() => {
        if (data1) {
            setModeles(data1);
        }
    }, [data1]);

    const [transmissions, setTransmissions] = useState<Transmission[]>([]);
    const {
        data: data2,
        loading: loading2,
        error: error2,
    } = useApi<Transmission[]>(
        "https://back-autostream-production.up.railway.app/transmission"
    );
    useEffect(() => {
        if (data2) {
            setTransmissions(data2);
        }
    }, [data2]);

    const [energies, setEnergies] = useState<Energie[]>([]);
    const {
        data: data3,
        loading: loading3,
        error: error3,
    } = useApi<Energie[]>(
        "https://back-autostream-production.up.railway.app/energie"
    );
    useEffect(() => {
        if (data3) {
            setEnergies(data3);
        }
    }, [data3]);
    const [options, setOptions] = useState<Options[]>([]);
    const {
        data: data4,
        loading: loading4,
        error: error4,
    } = useApi<Options[]>(
        "https://back-autostream-production.up.railway.app/options"
    );
    useEffect(() => {
        if (data4) {
            setOptions(data4);
        }
    }, [data4]);

    const voiture = "https://back-autostream-production.up.railway.app/voiture";
    const annonce = "https://back-autostream-production.up.railway.app/annonce";
    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        setLoaded(false);
        const formData = new FormData(document.querySelector("form")!);
        const nbplace = formData.get("nbplace");
        const nbporte = formData.get("nbporte");
        const kilometrage = formData.get("kilometrage");
        const cylindre = formData.get("cylindre");
        const puissance = formData.get("puissance");
        const fumeur = formData.get("fumeur");
        const datesortie = formData.get("datesortie");
        const idconduite = formData.get("idconduite");
        const idmodele = formData.get("idmodele");
        const iddrivetype = formData.get("iddrivetype");
        const idtransmission = formData.get("idtransmission");
        const idenergie = formData.get("idenergie");
        const idoptions = formData.getAll("idoptions");
        const fichiers = formData.getAll("photos");
        const descri = formData.get("descri");
        const prix = formData.get("prix");
        const photos: string[] = [];
        try {
            const promises = fichiers.map(async (fichier) => {
                if (fichier instanceof File) {
                    const options = {
                        maxSizeMB: 1,
                        maxWidthOrHeight: 1920,
                        useWebWorker: true,
                    };
                    const compressedFile = await imageCompression(fichier, options);
                    const base64Photo: string = await resizeAndCompressImage(compressedFile) as string;
                    photos.push(base64Photo);
                }
            });
            await Promise.all(promises);
            const voitureEnvoyer = {
                nbplace: nbplace,
                nbporte: nbporte,
                kilometrage: kilometrage,
                cylindre: cylindre,
                puissance: puissance,
                fumeur: fumeur,
                datesortie: datesortie,
                conduite: {
                    idconduite: idconduite,
                },
                modele: {
                    idmodele: idmodele,
                },
                drivetype: {
                    iddrivetype: iddrivetype,
                },
                transmission: {
                    idtransmission: idtransmission,
                },
                energie: {
                    idenergie: idenergie,
                },
                idoptions: idoptions,
                photos: photos,
            };
            try {
                const response = await fetch(voiture, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(voitureEnvoyer),
                });
                if (response.ok) {
                    const data = await response.json();
                    const annonceEnvoyer = {
                        descri: descri,
                        prix: prix,
                        voiture: {
                            idvoiture: data.idvoiture,
                        },
                    };
                    const resp = await fetch(annonce, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(annonceEnvoyer),
                    });
                    history.push("/home/annonce");
                    setLoaded(true);
                } else {
                    console.log("Tsy nety");
                }
            } catch (error) {
                alert("Erreur lors de la connexion" + error);
            }
        } catch (error) {
            console.error("Erreur lors du traitement des fichiers :", error);
        }
    };
    useEffect(() => {
        if (loading && loading1 && loading2 && loading3 && loading4) {
            setLoaded(true);
        }
    }, [loading, loading1, loading2, loading3, loading4]);

    return (
        <IonPage>
            <div className={`pageloader is-info ${loaded ? "" : "is-active"}`}></div>
            <header>
                <nav className="navbar is-transparent has-background-light">
                    <div className="container is-fluid">
                        <div className="navbar-brand is-flex is-justify-content-space-between" style={{ width: '85%' }}>
                            <a className="navbar-item">
                                <IonImg className="image is-48x48 is-rounded" src={logo}></IonImg>
                            </a>
                            <a className="navbar-item">
                                <span className="icon has-text-info" onClick={logout}>
                                    <i className="fa-solid fa-arrow-right-from-bracket fa-lg"></i>
                                </span>
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
                                            <input
                                                type="checkbox"
                                                value={option.idoptions}
                                                name="idoptions"
                                            />
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
                                    <IonRadio value="1" labelPlacement="end" name="idconduite">
                                        droite
                                    </IonRadio>
                                    <br />
                                    <IonRadio value="2" labelPlacement="end" name="idconduite">
                                        gauche
                                    </IonRadio>
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
                                    <IonRadio value="0" labelPlacement="end" name="fumeur">
                                        Oui
                                    </IonRadio>
                                    <br />
                                    <IonRadio value="1" labelPlacement="end" name="fumeur">
                                        Non
                                    </IonRadio>
                                </IonRadioGroup>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Photo</label>
                            <div className="control is-expanded">
                                <div className="file is-boxed">
                                    <label className="file-label">
                                        <input
                                            className="file-input"
                                            type="file"
                                            name="photos"
                                            multiple
                                        />
                                        <span className="file-cta">
                                            <span className="file-icon">
                                                <i className="fas fa-upload"></i>
                                            </span>
                                            <span className="file-label">Importer</span>
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control is-expanded">
                                <button
                                    className="button is-fullwidth is-outlined is-danger has-text-weight-semibold"
                                    onClick={handleSubmit}
                                >
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
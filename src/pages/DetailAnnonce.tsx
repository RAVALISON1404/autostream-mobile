import { IonContent, IonPage, useIonViewWillEnter } from "@ionic/react";
import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import "bulma-carousel/dist/css/bulma-carousel.min.css";
import bulmaCarousel from "bulma-carousel/dist/js/bulma-carousel.min.js";
import { Annonce, Options } from "../models/Annonce";
import useApi from "../service/Api";

export const DetailAnnonce: React.FC = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const data = searchParams.get("data");
    const annonce: Annonce = data ? JSON.parse(decodeURIComponent(data)) : null;
    const history = useHistory();
    const handleGoBack = () => {
        history.goBack();
    };
    const [options, setOptions] = useState<Options[]>([]);
    const ListOption: Options[] = [];
    const optionslist = annonce.voiture.idoptions;
    optionslist.forEach((element) => {
        const { data, loading, error } = useApi<Options>(
            `https://back-autostream-production.up.railway.app/options/${element}`
        );
        if (data) {
            ListOption.push(data);
        }
    });
    useEffect(() => {
        setOptions(ListOption);
    }, [data]);
    useIonViewWillEnter(() => {
        bulmaCarousel.attach(".carousel", {
            slidesToScroll: 1,
            slidesToShow: 1,
            pagination: false,
            infinite: true,
            autoplay: true,
        });
    });

    console.log("Rendering DetailAnnonce component...");
    return (
        <IonPage>
            <header className="has-background-light">
                <nav className="navbar has-background-light">
                    <div className="navbar-brand">
                        <div className="navbar-item">
                            <button
                                className="button is-rounded is-light"
                                onClick={handleGoBack}
                            >
                                <span className="icon has-text-info">
                                    <i className="fa-solid fa-chevron-left fa-lg"></i>
                                </span>
                            </button>
                            <h3 className="subtitle has-text-weight-bold has-text-cente">
                                <span className="has-text-info is-uppercase">Auto</span>
                                <span className="has-text-danger is-uppercase">Stream</span>
                            </h3>
                        </div>
                    </div>
                </nav>
            </header>
            <IonContent fullscreen className="content">
                <section className="section">
                    <div className="columns">
                        <div className="column is-7">
                            <article className="media mb-6">
                                <span className="media-left icon has-text-info is-size-3">
                                    <i className="fa-solid fa-gear"></i>
                                </span>
                                <div className="media-content">
                                    <div className="content">
                                        <h3 className="has-text-info">Options</h3>
                                        <ol>
                                            {ListOption.map((option, index) => {
                                                return (
                                                    <li key={index}>
                                                        {option.nomoptions}
                                                    </li>
                                                );
                                            })}
                                        </ol>
                                    </div>
                                </div>
                            </article>
                        </div>

                        <div className="column">
                            <article className="media mb-6">
                                <span className="media-left icon has-text-info is-size-3">
                                    <i className="fa-solid fa-wrench"></i>
                                </span>
                                <div className="media-content">
                                    <div className="content">
                                        <h3 className="has-text-info">A propos</h3>
                                        <ul>
                                            <li>
                                                <strong>Energie</strong> {annonce.voiture.energie.nomenergie}
                                            </li>
                                            <li>
                                                <strong>Transmission</strong> {annonce.voiture.transmission.nomtransmission}
                                            </li>
                                            <li>
                                                <strong>Drive Type</strong> {annonce.voiture.drivetype.nomdrivetype}
                                            </li>
                                            <li>
                                                <strong>Puissance</strong> {annonce.voiture.puissance}
                                            </li>
                                            <li>
                                                <strong>Kilometrage</strong> {annonce.voiture.kilometrage} Km
                                            </li>
                                            <li>
                                                <strong>Cylindre</strong> {annonce.voiture.cylindre}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                    <div className="tile is-ancestor">
                        <div className="tile is-parent is-6">
                            <div className="tile is-child">
                                <div className="content has-text-right has-text-left-mobile">
                                    <h1 className="has-text-info"> {annonce.voiture.modele.nommodele} </h1>
                                    <div className="tags">
                                        <span className="tag is-primary is-light">{annonce.voiture.nbporte} portes</span>
                                        <span className="tag is-primary is-light">{annonce.voiture.nbplace} places</span>
                                        <span className="tag is-primary is-light">
                                            {annonce.voiture.conduite.nomconduite}
                                        </span>
                                        <span className="tag is-primary is-light">{annonce.voiture.modele.reservoire}L</span>
                                        <span className="tag is-primary is-light">{annonce.voiture.modele.poids}T</span>
                                        <span className="tag is-primary is-light">{annonce.voiture.modele.longueur}*{annonce.voiture.modele.largeur}*{annonce.voiture.modele.hauteur}</span>
                                        <span className="tag is-primary is-light">{annonce.voiture.fumeur === 0 ? 'Non fumeur' : 'Fumeur'}</span>
                                    </div>
                                    <nav className="level is-mobile">
                                        <div className="level-item has-text-centered">
                                            <div>
                                                <p className="heading">categorie</p>
                                                <p className="subtitle has-text-weight-bold"> {annonce.voiture.modele.categorie.nomcategorie} </p>
                                            </div>
                                        </div>
                                        <div className="level-item has-text-centered">
                                            <div>
                                                <p className="heading">carrosserie</p>
                                                <p className="subtitle has-text-weight-bold">{annonce.voiture.modele.carrosserie.nomcarrosserie}</p>
                                            </div>
                                        </div>
                                        <div className="level-item has-text-centered">
                                            <div>
                                                <p className="heading">Annee</p>
                                                <p className="subtitle has-text-weight-bold">{annonce.voiture.datesortie.substring(0, 4)}</p>
                                            </div>
                                        </div>
                                        <div className="level-item has-text-centered">
                                            <div>
                                                <p className="heading">Etat</p>
                                                <p className="subtitle has-text-weight-bold">500</p>
                                            </div>
                                        </div>
                                    </nav>
                                    <article>{annonce.descri}</article>
                                    <blockquote>
                                        <h3>MGA {annonce.prix.toLocaleString('fr-FR')}</h3>
                                    </blockquote>

                                    <div className="buttons is-right">
                                        <button className="button is-rounded is-small is-info has-text-weight-semibold">
                                            Confirmer
                                        </button>
                                        <button className="button is-rounded is-small is-danger has-text-weight-semibold">
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tile is-6 carousel">
                            {annonce.voiture.photos.map((item, index) => {
                                return (
                                    <div className="tile is-parent" key={index}>
                                        <div className="tile is-child item-1">
                                            <figure className="image is-4by3">
                                                <img src={item} />
                                            </figure>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </IonContent>
        </IonPage>
    );
};

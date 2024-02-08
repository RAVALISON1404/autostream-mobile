import { IonContent, IonPage, useIonViewWillEnter } from "@ionic/react";
import { useHistory } from "react-router";
import { useState } from "react";
import 'bulma-carousel/dist/css/bulma-carousel.min.css';
import bulmaCarousel from 'bulma-carousel/dist/js/bulma-carousel.min.js';

interface DetailAnnonceProps {
    id: number;
}

export const DetailAnnonce: React.FC<DetailAnnonceProps> = ({ id }) => {
    const history = useHistory();
    const handleGoBack = () => {
        history.goBack();
    }
    const [loaded, setLoaded] = useState<boolean>(true);
    const images = ['https://bulma.io/images/placeholders/1280x960.png', 'https://bulma.io/images/placeholders/1280x960.png', 'https://bulma.io/images/placeholders/1280x960.png', 'https://bulma.io/images/placeholders/1280x960.png', 'https://bulma.io/images/placeholders/1280x960.png'];

    useIonViewWillEnter(() => {
        bulmaCarousel.attach('.carousel', {
            slidesToScroll: 1,
            slidesToShow: 1,
            pagination: false,
            infinite: true,
            autoplay: true
        });
    });

    console.log('Rendering DetailAnnonce component...');
    return (
        <IonPage>
            <div className={`pageloader is-info ${loaded ? '' : 'is-active'}`}></div>
            <header className="has-background-light">
                <nav className="navbar has-background-light">
                    <div className="navbar-brand">
                        <div className="navbar-item">
                            <button className="button is-rounded is-light" onClick={handleGoBack}>
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
                                            <li>In fermentum leo eu lectus mollis, quis dictum mi aliquet.</li>
                                            <li>Morbi eu nulla lobortis, lobortis est in, fringilla felis.</li>
                                            <li>Aliquam nec felis in sapien venenatis viverra fermentum nec lectus.</li>
                                            <li>Ut non enim metus.</li>
                                            <li>In fermentum leo eu lectus mollis, quis dictum mi aliquet.</li>
                                            <li>Morbi eu nulla lobortis, lobortis est in, fringilla felis.</li>
                                            <li>Aliquam nec felis in sapien venenatis viverra fermentum nec lectus.</li>
                                            <li>Ut non enim metus.</li>
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
                                            <li><strong>Energie</strong> Essence</li>
                                            <li><strong>Transmission</strong> Manuel</li>
                                            <li><strong>Drive Type</strong> AWD</li>
                                            <li><strong>Puissance</strong> 250CV</li>
                                            <li><strong>Kilometrage</strong> 689 652Km</li>
                                            <li><strong>Cylindre</strong> 6</li>
                                            <li><strong>Cubage</strong> 56000</li>
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
                                    <h1 className="has-text-info">
                                        Modele
                                    </h1>
                                    <div className="tags">
                                        <span className="tag is-primary is-light">5 portes</span>
                                        <span className="tag is-primary is-light">12 places</span>
                                        <span className="tag is-primary is-light">Conduite gauche</span>
                                        <span className="tag is-primary is-light">50L</span>
                                        <span className="tag is-primary is-light">1.6T</span>
                                        <span className="tag is-primary is-light">700*800*900</span>
                                        <span className="tag is-primary is-light">Fumeur</span>
                                    </div>
                                    <nav className="level is-mobile">
                                        <div className="level-item has-text-centered">
                                            <div>
                                                <p className="heading">categorie</p>
                                                <p className="title">3,456</p>
                                            </div>
                                        </div>
                                        <div className="level-item has-text-centered">
                                            <div>
                                                <p className="heading">Type</p>
                                                <p className="title">123</p>
                                            </div>
                                        </div>
                                        <div className="level-item has-text-centered">
                                            <div>
                                                <p className="heading">Annee</p>
                                                <p className="title">
                                                    500
                                                </p>
                                            </div>
                                        </div>
                                        <div className="level-item has-text-centered">
                                            <div>
                                                <p className="heading">Etat</p>
                                                <p className="title">
                                                    500
                                                </p>
                                            </div>
                                        </div>
                                    </nav>
                                    <article>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum cupiditate qui magnam,
                                        eius totam alias explicabo modi quam repudiandae deserunt error. Minima possimus pariatur
                                        assumenda dignissimos doloribus sunt nesciunt maiores.
                                    </article>
                                    <blockquote>
                                        <h3>
                                            MGA 3 500 000
                                        </h3>
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
                            { images.map((item, index) => {
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
}
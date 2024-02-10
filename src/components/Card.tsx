import { IonCard, IonImg } from "@ionic/react";
import { useEffect, useState } from "react";
import bulmaCarousel from 'bulma-carousel/dist/js/bulma-carousel.min.js';
import 'bulma-carousel/dist/css/bulma-carousel.min.css';
import { Validation } from "../models/Annonce";

interface CardProps {
    validation: Validation;
    isLiked: boolean;
}

export const Card: React.FC<CardProps> = ({ validation, isLiked }) => {
    useEffect(() => {
        setTimeout(() => {
            bulmaCarousel.attach('.carousel', {
                initialSlide: 1,
                slidesToScroll: 1,
                slidesToShow: 1,
                navigation: false,
            });
        }, 1);
    });
    return (
        <IonCard className="card is-clickable">
            <div className="card-image">
                <div className="carousel">
                    {validation.annonce.voiture.photos?.map((item, index) => (
                        <figure className={`image is-4by3 item-${index}`} key={index}>
                            <img src={item} />
                        </figure>
                    ))}
                </div>
            </div>
            <div className="card-content p-3">
                <div className="list has-visible-pointer-controls has-overflow-ellipsis">
                    <div className="list-item">
                        <div className="list-item-content">
                            <span className="tag">
                                MGA {validation.annonce.prix.toLocaleString('fr-FR')}
                            </span>
                            <h5 className="list-item-title has-text-info mb-0">{validation.annonce.voiture.modele.nommodele}</h5>
                            <p className="list-item-description help">{validation.annonce.descri}</p>
                        </div>

                        <div className="list-item-controls has-text-info">
                            <span className="icon">
                                <i className={validation.etat === 0 ? 'fa-solid fa-clock fa-lg' : validation.etat === 3 ? 'fa-solid fa-check' : ''}></i>
                            </span>
                            <a href={`/annonce/detail/${validation.annonce.idannonce}?data=${encodeURIComponent(JSON.stringify(validation))}`}>
                                <i className="fa-solid fa-chevron-right fa-lg"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </IonCard>
    );
};

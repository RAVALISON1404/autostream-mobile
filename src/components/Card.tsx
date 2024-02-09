import { IonCard, IonImg } from "@ionic/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bulmaCarousel from 'bulma-carousel/dist/js/bulma-carousel.min.js';
import 'bulma-carousel/dist/css/bulma-carousel.min.css';
import { Annonce } from "../models/Annonce";

interface CardProps {
    id: number;
    annonce: Annonce;
    isLiked: boolean;
}

export const Card: React.FC<CardProps> = ({ id, annonce, isLiked }) => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [like, setLike] = useState<boolean>(isLiked);
    const [images, setImages] = useState<string[]>([]);
    useEffect(() => {
        setTimeout(() => {
            setImages(annonce.voiture.photos);
            setTitle(annonce.voiture.modele.nommodele);
            setDescription(annonce.descri);
            bulmaCarousel.attach('.carousel', {
                initialSlide: 1,
                slidesToScroll: 1,
                slidesToShow: 1,
                navigation: false,
            });
        }, 1);
    });
    const handleLikeBtn = () => {
        setLike(!like);
    }
    return (
        <IonCard className="card is-clickable">
            <div className="card-image">
                <div className="carousel">
                    {images?.map((item, index) => (
                        <IonImg className={`image item-${index}`} src={item} key={index}></IonImg>
                    ))}
                </div>
            </div>
            <div className="card-content p-3">
                <div className="list has-visible-pointer-controls has-overflow-ellipsis">
                    <div className="list-item">
                        <div className="list-item-content">
                            <h5 className="list-item-title has-text-info mb-0">{ title }</h5>
                            <p className="list-item-description help">{ description }</p>
                        </div>

                        <div className="list-item-controls has-text-info">
                            <span className="icon is-clickable">
                                <i className={ like ? 'fa-solid fa-heart fa-lg' : 'fa-regular fa-heart fa-lg' } onClick={ handleLikeBtn }></i>
                            </span>
                            <Link to={`/annonce/detail/${annonce.idannonce}?data=${encodeURIComponent(JSON.stringify(annonce))}`}>
                                <i className="fa-solid fa-chevron-right fa-lg"></i>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </IonCard>
    );
};

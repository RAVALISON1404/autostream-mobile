import { IonImg } from "@ionic/react";
import { useEffect, useState } from "react";
import 'bulma-extensions/bulma-pageloader/dist/css/bulma-pageloader.min.css';

interface HeaderProps {
    loading: boolean;
}

export const Header: React.FC<HeaderProps> = ({ loading }) => {
    const logo = '/logo.png';
    const [loaded, setLoaded] = useState<boolean>(false);
    useEffect(() => {
        setLoaded(loading);
    })
    return (
        <>
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
        </>
    );
}
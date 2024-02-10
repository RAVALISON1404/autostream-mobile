import { IonContent, IonPage } from "@ionic/react";
import { useState } from "react";
import 'bulma-extensions/bulma-pageloader/dist/css/bulma-pageloader.min.css';
import axios from "axios";
import { useHistory } from 'react-router';


const api = axios.create({
    baseURL: 'https://back-autostream-production.up.railway.app/'
})

type inscription = {
    nomutilisateur: string,
    email: string,
    mdp: string
}
export const SignUp: React.FC = () => {
    const logo = '/logo.png';
    const history = useHistory();
    const [loaded, setLoaded] = useState<boolean>(true);
    console.log('Rendering SignIn component...');

    const [form, setForm] = useState<inscription>({
        nomutilisateur: '',
        email: '',
        mdp: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName: string = e.target.name;
        const fieldValue: string = e.target.value;
        const newField: Partial<inscription> = {[fieldName]: { value: fieldValue }};

        setForm({...form, [fieldName]: fieldValue});
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoaded(false)
        try {
            const response = await api.post('/login/register', {
                nomutilisateur: form.nomutilisateur,
                email: form.email,
                mdp: form.mdp
            });
            history.push('/signIn');
            setLoaded(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }

    return (
        <IonPage>
            <IonContent fullscreen className="ion-padding">
                <div className="container mt-6 pt-6">
                    <h3 className="title has-text-centered">
                        <span className="has-text-info">AUTO</span><span className="has-text-danger">STREAM</span>
                    </h3>
                    <form onSubmit={e => handleSubmit(e)}>
                    <div className="field">
                            <label className="label">
                                Nom
                            </label>
                            <div className="control">
                                <input type="text" className="input" name="nomutilisateur" placeholder="Entrez votre adresse e-mail" onChange={e => handleInputChange(e)} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">
                                E-mail
                            </label>
                            <div className="control">
                                <input type="email" className="input" name="email" placeholder="Entrez votre adresse e-mail" onChange={e => handleInputChange(e)} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">
                                Mot de passe
                            </label>
                            <div className="control">
                                <input type="password" className="input" name="mdp" placeholder="Entrez votre mot de passe" onChange={e => handleInputChange(e)} />
                            </div>
                        </div>
                        <br />
                        <div className="field">
                            <div className="control">
                                <button className="button is-fullwidth is-info" type="submit">
                                    S'inscrire
                                </button>
                            </div>
                        </div>
                    </form>
                    
                    <p>Vous avez deja un compte? <a href="/signin">Connectez-vous ici</a></p>
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
import axios from 'axios';
import { IonContent, IonPage } from "@ionic/react";
import React, { useState } from "react";
import 'bulma-extensions/bulma-pageloader/dist/css/bulma-pageloader.min.css';
import { useHistory } from 'react-router';


const api = axios.create({
    baseURL: 'https://back-autostream-production.up.railway.app/'
})

type login = {
    email: string,
    mdp: string
}

export const SignIn: React.FC = () => {
    const logo = '/logo.png';
    const history = useHistory();
    const [loaded, setLoaded] = useState<boolean>(true);
    console.log('Rendering SignIn component...');

    const [form, setForm] = useState<login>({
        email:'',
        mdp:''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName: string = e.target.name;
        const fieldValue: string = e.target.value;
        const newField: Partial<login> = {[fieldName]: { value: fieldValue }};

        setForm({...form, [fieldName]: fieldValue});
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       
        try {
            const response = await api.post('/login/auth', {
                email: form.email,
                mdp: form.mdp
            });

            const token = response.data.response.token;

            localStorage.setItem('token', token);

            history.push('/home');

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
                                E-mail
                            </label>
                            <div className="control">
                                <input type="email" name="email" className="input" placeholder="Entrez votre adresse e-mail" onChange={e => handleInputChange(e)} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">
                                Mot de passe
                            </label>
                            <div className="control">
                                <input type="password" name="mdp" className="input" placeholder="Entrez votre mot de passe" onChange={e => handleInputChange(e)} />
                            </div>
                        </div>
                        <br />
                        <div className="field">
                            <div className="control">
                                <button className="button is-fullwidth is-info" type="submit">
                                    Se connecter
                                </button>
                            </div>
                        </div>
                    </form>
                   
                    <p>Vous n'avez pas de compte? <a href="/signup">Inscrivez-vous ici</a></p>
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
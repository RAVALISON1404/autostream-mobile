import { IonContent, IonImg, IonPage, useIonViewWillEnter } from '@ionic/react';
import { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import 'bulma-extensions/bulma-pageloader/dist/css/bulma-pageloader.min.css';
import 'bulma-list/css/bulma-list.css';
import useApi from '../service/Api';
import { Validation } from '../models/Annonce';

export const Home: React.FC = () => {
	const logo = '/logo.png';
	const [dashboardPanelActive, setDashboardPanelActive] = useState<boolean>(false);
	const [cardData, setCardData] = useState<Validation[] | null>(null);
	const { data, loading, error } = useApi<Validation[]>("https://back-autostream-production.up.railway.app/validation/etat/1");

	useEffect(() => {
		setTimeout(() => {
			setCardData(data);
		}, 1);
	}, [data]);
	const handleFilterClick = () => {
		setDashboardPanelActive(!dashboardPanelActive);
	};
	console.log('Rendering Home component...');
	return (
		<IonPage>
			<div className={`pageloader is-info ${loading ? '' : 'is-active'}`}></div>
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
			<IonContent className="dashboard is-full-height">
				<div className={`dashboard-panel ${dashboardPanelActive ? 'is-active' : ''} is-small is-scrollable has-background-white`}>
					<header className="dashboard-panel-header">

					</header>
					<div className="dashboard-panel-content">
						<div className="buttons is-right">
							<a className="delete close-menu" onClick={handleFilterClick}></a>
						</div>
						<aside className="menu has-text-white">
							<p className="menu-label">
								General
							</p>
							<ul className="menu-list">
								<li><a>Dashboard</a></li>
								<li><a>Customers</a></li>
							</ul>
							<p className="menu-label">
								Administration
							</p>
							<ul className="menu-list">
								<li><a>Team Settings</a></li>
								<li>
									<a className="is-active">Manage Your Team</a>
									<ul>
										<li><a>Members</a></li>
										<li><a>Plugins</a></li>
										<li><a>Add a member</a></li>
									</ul>
								</li>
								<li><a>Invitations</a></li>
								<li><a>Cloud Storage Environment Settings</a></li>
								<li><a>Authentication</a></li>
							</ul>
							<p className="menu-label">
								Transactions
							</p>
							<ul className="menu-list">
								<li><a>Payments</a></li>
								<li><a>Transfers</a></li>
								<li><a>Balance</a></li>
							</ul>
						</aside>
					</div>
				</div>
				<div className="dashboard-main is-scrollable" style={{ height: '100%' }}>
					<section className="section p-5" style={{ height: '100%' }}>
						<div className='content filter has-background-white py-3'>
							<div className="field is-grouped is-grouped-right">
								<div className="control">
									<button className="button is-rounded is-white" onClick={handleFilterClick}>
										<span className="icon has-text-info">
											<i className="fa-solid fa-sliders"></i>
										</span>
									</button>
								</div>
								<div className="control">
									<div className="dropdown is-right is-hoverable is-pulled-right">
										<div className="dropdown-trigger">
											<div className="button" aria-haspopup="true" aria-controls="dropdown-menu6">
												<span>Filtrer par</span>
												<span className="icon is-small">
													<i className="fas fa-angle-down" aria-hidden="true"></i>
												</span>
											</div>
										</div>
										<div className="dropdown-menu" id="dropdown-menu6" role="menu">
											<div className="dropdown-content">
												<a href="" className="dropdown-item">
													En vedette
												</a>
												<a href="#" className="dropdown-item">
													Les plus récents
												</a>
												<a href="#" className="dropdown-item">
													Prix: décroissant
												</a>
												<a href="#" className="dropdown-item">
													Prix: croissant
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="tile is-ancestor">
							{cardData?.map((data) => (
								<div className="tile is-parent" key={data.idvalidation}>
									<div className="tile is-child">
										<Card
											id={data.annonce.idannonce}
											annonce={data.annonce}
											isLiked={false}
										/>
									</div>
								</div>
							))}
						</div>
					</section>
				</div>
			</IonContent>
		</IonPage>
	);
};
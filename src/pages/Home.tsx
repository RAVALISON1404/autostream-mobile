import { IonContent, IonImg, IonPage } from '@ionic/react';
import { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import 'bulma-extensions/bulma-pageloader/dist/css/bulma-pageloader.min.css';
import 'bulma-list/css/bulma-list.css';
import useApi from '../service/Api';
import { Validation } from '../models/Annonce';
import { useHistory } from 'react-router';

export const Home: React.FC = () => {
	const history = useHistory();
	const logout = async () => {
		localStorage.removeItem('token');
		history.push('/signin');
	}
	const [filter, setFilter] = useState<number | null>(null);
	const logo = '/logo.png';
	const [dashboardPanelActive, setDashboardPanelActive] = useState<boolean>(false);
	const [cardData, setCardData] = useState<Validation[] | null>(null);
	const { data, loading, error } = useApi<Validation[]>('https://back-autostream-production.up.railway.app/annonce/historique', localStorage.getItem('token')!);
	const [loaded, setLoaded] = useState<boolean>(loading);
	const filteredData = cardData?.filter(item => {
		if (filter === null) {
			return true;
		}
		return item.etat === filter;
	});
	const handleFilterClick = (value: any) => {
		document.querySelector('.dropdown')?.classList.remove('is-active');
		setFilter(value);
	};
	useEffect(() => {
		setTimeout(() => {
			setCardData(data);
			setLoaded(loading);
		}, 1);
	}, [data]);
	return (
		<IonPage>
			<div className={`pageloader is-info ${loaded ? '' : 'is-active'}`}></div>
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
												<a className="dropdown-item" onClick={() => handleFilterClick(null)}>
													Tous
												</a>
												<a className="dropdown-item" onClick={() => handleFilterClick(0)}>
													En cours de validation
												</a>
												<a className="dropdown-item" onClick={() => handleFilterClick(1)}>
													Disponible
												</a>
												<a className="dropdown-item" onClick={() => handleFilterClick(3)}>
													Vendu
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="tile is-ancestor">
							{filteredData?.map((data) => (
								<div className="tile is-parent" key={data.idvalidation}>
									<div className="tile is-child">
										<Card
											validation={data}
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
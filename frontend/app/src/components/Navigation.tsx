import { Link } from 'react-router-dom';
import iconSearch from '/img/icon-search.svg';
import iconGear from '/img/icon-gear.svg';
import iconExit from '/img/icon-exit.svg';
import NavigationItem from './NavigationItem';
import { RoutesList } from '../configuration/routes/RouteList';

interface NavigationProps {
  isAdmin: boolean;
}

const Navigation = ({ isAdmin }: NavigationProps) => {
  return (
    <div className="boxed-content">
      <Link to={RoutesList.Home}>
        <div className="top-banner"></div>
      </Link>
      <div className="top-nav">
        <div className="nav-items">
          <NavigationItem label="home" navigateTo={RoutesList.Home} />
          <NavigationItem label="channels" navigateTo={RoutesList.Channels} />
          <NavigationItem label="playlists" navigateTo={RoutesList.Playlists} />

          {isAdmin && <NavigationItem label="downloads" navigateTo={RoutesList.Downloads} />}
        </div>
        <div className="nav-icons">
          <Link to={RoutesList.Search}>
            <img src={iconSearch} alt="search-icon" title="Search" />
          </Link>
          <Link to={RoutesList.SettingsDashboard}>
            <img src={iconGear} alt="gear-icon" title="Settings" />
          </Link>
          <Link to={RoutesList.Logout}>
            <img className="alert-hover" src={iconExit} alt="exit-icon" title="Logout" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navigation;

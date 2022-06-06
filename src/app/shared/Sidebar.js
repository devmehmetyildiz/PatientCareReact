import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { Trans } from 'react-i18next';
class Sidebar extends Component {

  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({[menuState] : false});
    } else if(Object.keys(this.state).length === 0) {
      this.setState({[menuState] : true});
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({[i]: false});
      });
      this.setState({[menuState] : true}); 
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({[i]: false});
    });

    const dropdownPaths = [
      {path:'Setting', state: 'SettingsMenuOpen'},
      {path:'/Roles', state: 'RolesOpen'},
      {path:'/Stations', state: 'StationsOpen'},
      {path:'/Cases', state: 'CasesOpen'},
      {path:'/tables', state: 'tablesMenuOpen'},
      {path:'/maps', state: 'mapsMenuOpen'},
      {path:'/icons', state: 'iconsMenuOpen'},
      {path:'/charts', state: 'chartsMenuOpen'},
      {path:'/User', state: 'userPagesMenuOpen'},
      {path:'/error-pages', state: 'errorPagesMenuOpen'},
      {path:'/general-pages', state: 'generalPagesMenuOpen'},
      {path:'/ecommerce', state: 'ecommercePagesMenuOpen'},
      {path:'/editors', state: 'editorsMenuOpen'},
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({[obj.state] : true})
      }
    }));
 
  }

  render () {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <a className="sidebar-brand brand-logo" href="index.html"><img src={require('../../assets/images/logo.svg')} alt="logo" /></a>
          <a className="sidebar-brand brand-logo-mini" href="index.html"><img src={require('../../assets/images/logo-mini.svg')} alt="logo" /></a>
        </div>
        <ul className="nav">
                
          <li className={ this.isPathActive('/dashboard') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <Link className="nav-link" to="/dashboard">
              <span className="menu-icon"><i className="mdi mdi-speedometer"></i></span>
              <span className="menu-title"><Trans>Dashboard</Trans></span>
            </Link>
          </li>         
          <li className={ this.isPathActive('/User') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.userPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('userPagesMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-security"></i>
              </span>
              <span className="menu-title"><Trans>User Pages</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.userPagesMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/User/login') ? 'nav-link active' : 'nav-link' } to="/Login"><Trans>Login</Trans></Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/User/login-2') ? 'nav-link active' : 'nav-link' } to="/User/login-2"><Trans>Login 2</Trans></Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/User/Register') ? 'nav-link active' : 'nav-link' } to="/User/Register"><Trans>Register</Trans></Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/User/register-2') ? 'nav-link active' : 'nav-link' } to="/User/register-2"><Trans>Register 2</Trans></Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/User/lockscreen') ? 'nav-link active' : 'nav-link' } to="/User/lockscreen"><Trans>Lockscreen</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>      
          <li className={ this.isPathActive('/error-pages') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.errorPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('errorPagesMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-lock"></i>
              </span>
              <span className="menu-title"><Trans>Error Pages</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.errorPagesMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/error-pages/error-404') ? 'nav-link active' : 'nav-link' } to="/error-pages/error-404">404</Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/error-pages/error-500') ? 'nav-link active' : 'nav-link' } to="/error-pages/error-500">500</Link></li>
                </ul>
              </div>
            </Collapse>
          </li>    
          <li className={ this.isPathActive('Setting') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.SettingsMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('SettingsMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-lock"></i>
              </span>
              <span className="menu-title"><Trans>Ayarlar</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.SettingsMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/Cases') ? 'nav-link active' : 'nav-link' } to="/Cases">Durumlar</Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/Roles') ? 'nav-link active' : 'nav-link' } to="/Roles">Roller</Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/Stations') ? 'nav-link active' : 'nav-link' } to="/Stations">İstasyonlar</Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/Departments') ? 'nav-link active' : 'nav-link' } to="/Departments">Departmanlar</Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/Users') ? 'nav-link active' : 'nav-link' } to="/Users">Kullanıcılar</Link></li>
                </ul>
              </div>
            </Collapse>
          </li>    
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);
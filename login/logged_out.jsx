LoginButtonsLoggedOut = React.createClass( {
  dropdown: function() {
    return Accounts._loginButtons.dropdown();
  },
  services: function() {
    return Accounts._loginButtons.getLoginServices();
  },
  singleService: function() {
    var services = Accounts._loginButtons.getLoginServices();
    if (services.length !== 1){
      throw new Error(
        "Shouldn't be rendering this template with more than one configured service");
    }
    return services[0];
  },
  configurationLoaded: function() {
    return Accounts.loginServicesConfigured();
  },
  // additional classes that can be helpful in styling the dropdown
  additionalClasses() {
    if (!Accounts.password) {
      return false;
    } else {
      if (loginButtonsSession.get('inSignupFlow')) {
        return 'login-form-create-account';
      } else if (loginButtonsSession.get('inForgotPasswordFlow')) {
        return 'login-form-forgot-password';
      } else {
        return 'login-form-sign-in';
      }
    }
  },

  dropdownVisible() {
    return loginButtonsSession.get('dropdownVisible');
  },

  isPasswordService() {
    return this.name === 'password';
  },

  hasOtherServices() {
    return Accounts._loginButtons.getLoginServices().length > 1;
  },

  hasPasswordService() {
    return Accounts._loginButtons.hasPasswordService();
  },
  render() {
    console.debug( ['this.services()', this.services()]);
    if ( this.services()) {
      console.debug( ['this.configurationLoaded()', this.configurationLoaded()]);
      if ( this.configurationLoaded()) {
        console.debug( ['this.dropdown()', this.dropdown()]);
        if( this.dropdown()) {
          return <loginButtonsLoggedOutDropdown />
        } else {
          if ( ! this.props.logginIn)  {
            return(
              <div className="navbar-form">
                <loginButtonsLoggedOutSingleLoginButton service={this.singleService}/>
              </div>
            );
          }
        }
      } else {
        return(
          <div className="no-services">{i18n( 'loginButtonsLoggedOut.noLoginServices')}</div>
        );
      }
    }
  }
});

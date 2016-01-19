if (Meteor.isClient) {
  Meteor.startup(function () {
    // Use Meteor.startup to render the component after the page is ready
    ReactDOM.render( <LoginButtons user={Meteor.user()} loggedIn={Meteor.loggingIn()}/>,
                document.getElementById("login-button-target"));
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

LoginButtons = React.createClass( {
  render() {
    if ( this.props.user) {
      if ( ! this.props.loggedIn) {
        return(
          <LoginButtonsLoggedIn user={this.props.user} />
        );
      }
    } else {
      return(
        <LoginButtonsLoggedOut loggedIn={this.props.loggedIn} />
      );
    }
  }
});

LoginButtonsLoggedIn = React.createClass( {
  render() {
    return(
      <p>LoginButtonsLoggedIn</p>
    );
  }
});

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

  services() {
    return Accounts._loginButtons.getLoginServices();
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
    if ( this.services()) {
      if ( this.configurationLoaded()) {
        if( this.dropdown()) {
          return <loginButtonsLoggedOutDropdown />
        } else {
          if ( ! this.props.logginIn)  {
            return(
              <div class="navbar-form">
                <loginButtonsLoggedOutSingleLoginButton service={this.singleService}/>
              </div>
            );
          }
        }
      } else {
        return(
          <div class="no-services">{i18n( 'loginButtonsLoggedOut.noLoginServices')}</div>
        );
      }
    }
  }
});

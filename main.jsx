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

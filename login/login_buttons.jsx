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

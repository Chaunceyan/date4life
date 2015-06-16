var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var GuestGrid = ReactMeteor.createClass({
  templateName: "GuestGrid",

  startMeteorSubscriptions: function() {
    Meteor.subscribe("users");
  },

  getMeteorState: function() {
    var allUsers = Meteor.users.find().fetch();
    console.log("Meteor intervention");
    console.log("All users", allUsers);
    return {
      users: allUsers
    };
  },

  //getInitialState: function() {
  //var allUsers = Meteor.users.find().fetch();
  //return {
  //users: allUsers
  //};
  //},

  deleteUser: function(userId) {
    console.log("userId", userId);
    Meteor.users.remove({
      "_id": userId
    });
  },

  renderUserPreview: function(user) {
    return <UserPreview key={user.username} user={user}
            userDeleteHandler={this.deleteUser} />;
  },

  render: function() {
    console.log("render AdminPanel", this.state);

    var rows = [
      this.state.users.map(this.renderUserPreview)
    ];

    return (
      <div className="container">
        <div className="row" style={{paddingBottom: "20px"}}>
          <div className="col-md-3">
            <input type="text" name="filter" placeholder="Search User"
              className="form-control"></input>
          </div>
        </div>
        <div>
            {{rows}}
        </div>
      </div>
    );
  }
});

var UserPreview = ReactMeteor.createClass({

  getDefaultProps: function() {
    return {
      user: null,
      userDeleteHandler: null
    };
  },

  getInitialState: function() {
    return {
      banned: false,
    };
  },

  getMeteorState: function() {
    var banned = Meteor.users.findOne({
      "_id": this.props.user._id
    }).banned;

    console.log("banned", banned);
    return {
      banned: banned
    };
  },

  deleteUserWrapper: function() {
    //console.log("deleteUserWrapper", this.props.user.username);
    this.props.userDeleteHandler(this.props.user._id);
  },

  banUser: function() {
    Meteor.users.update({
      "_id": this.props.user._id,
    }, {
      "$set": {
        "banned": !this.state.banned
      }
    });
  },

  //componentWillUpdate: function(nextProps, nextState) {
  //console.log("componentWillUpdate", nextState);
  //},

  render: function() {
    var gravatarPicSrc = gravatarPicSmall(this.props.user.emails[0].address);
    var userLink = "/user/" + this.props.user._id;
    var banColor = this.state.banned ? "#a94442" : null;
    console.log("ban color", banColor);

    return (
      <div className="custom-row-card">
        <div className="name">
          <strong className="text-primary">Mayer Leonard</strong>
          <small className="text-primary-light">Ovolo</small>
        </div>
        <div>Kapowsin</div>
        <div><span>Hawaii</span>
          <span>, </span>
          <span>United Kingdom</span>
        </div>
      </div>
    );
  }

});

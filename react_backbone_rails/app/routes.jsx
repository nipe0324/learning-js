var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.RouteHandler;

var About = React.createClass({
  render: function () {
    return <h2>About</h2>;
  }
});

var Inbox = React.createClass({
  render: function () {
    return <h2>Inbox</h2>;
  }
});

// TODO: update to react 0.13.
var App = React.createClass({
  render: function() {
    return (
      <div className="app">
        <header className="header">
          <ul>
            <li><a href="https://github.com/brunch/brunch/tree/master/docs">Brunch docs</a></li>
            <li><a href="https://github.com/brunch/brunch/issues">Brunch issues</a></li>
            <li><a className="last-link" href="http://twitter.com/brunch">Twitter</a></li>
          </ul>
        </header>
        <div className="home-page">
          <a href="http://brunch.io/">
            <div className="icon-brunch-logo-napkin"></div>
          </a>
        </div>
        <RouteHandler/>
      </div>
    )
  }
});

// declare our routes and their hierarchy
var routes = (
  <Route handler={App}>
    <Route path="about" handler={About}/>
    <Route path="inbox" handler={Inbox}/>
  </Route>
);

module.exports = routes;

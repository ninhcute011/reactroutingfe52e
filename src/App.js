import React, { Component } from "react";
import "./App.css";
// import HomePage from "./containers/HomeTemplate/HomePage";
// import AboutPage from "./containers/HomeTemplate/AboutPage";
// import ListMoviePage from "./containers/HomeTemplate/ListMoviePage";
import { Route, Switch, withRouter } from "react-router-dom";
import PageNotFound from "./containers/PageNotFound";
// import NavbarHome from "./components/NavbarHome";
import { routesHome, routesAdmin } from "./routes";
import HomeTemplate from "./containers/HomeTemplate";
import AdminTemplate from "./containers/AdminTemplate";
import AuthPage from "./containers/AdminTemplate/AuthPage";
import { actTryLogin } from "containers/AdminTemplate/AuthPage/modules/action";
import { connect } from "react-redux";

class App extends Component {
  showLayoutHome = (routes) => {
    if (routes && routes.length > 0) {
      return routes.map((item, index) => {
        return (
          <HomeTemplate
            key={index}
            exact={item.exact}
            path={item.path}
            Component={item.component}
          />
        );
      });
    }
  };

  showLayoutAdmin = (routes) => {
    if (routes && routes.length > 0) {
      return routes.map((item, index) => {
        return (
          <AdminTemplate
            key={index}
            exact={item.exact}
            path={item.path}
            Component={item.component}
          />
        );
      });
    }
  };

  componentDidMount() {
    this.props.fetchTryLogin(this.props.history);
  }

  render() {
    return (
      <Switch>
        {/* Trang chủ - localhost:3000 - HomePage */}
        {/* <Route exact path="/" component={HomePage} />
          <Route path="/home" component={HomePage} /> */}

        {/* Trang about - localhost:3000/about - AboutPage */}
        {/* <Route path="/about" component={AboutPage} /> */}

        {/* Trang listmovie - localhost:3000/list-movie - ListMoviePage */}
        {/* <Route path="/list-movie" component={ListMoviePage} /> */}

        {this.showLayoutHome(routesHome)}
        {this.showLayoutAdmin(routesAdmin)}

        {/* AuthPage */}
        <Route path="/auth" component={AuthPage} />

        {/* PageNotFound - để cuối cùng */}
        <Route path="" component={PageNotFound} />
      </Switch>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTryLogin: (history) => {
      dispatch(actTryLogin(history));
    },
  };
};

const ConnectedComponent = connect(null, mapDispatchToProps)(App);

export default withRouter(ConnectedComponent);

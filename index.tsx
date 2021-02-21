import React, { Component, Suspense, lazy } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loading from "./components/commons/loading.component";
import Navbar from "./components/commons/navbar.component";
import "./style.css";

const HomePage = lazy(() => import("./pages/home.component"));
const PopularMoviePage = lazy(() => import("./pages/movies/popular.component"));
const TopRatedMoviePage = lazy(() =>
  import("./pages/movies/top-rated.component")
);
const UpcomingMoviePage = lazy(() =>
  import("./pages/movies/upcoming.component")
);
const SearchMoviePage = lazy(() => import("./pages/movies/search.component"));
const MovieDetailPage = lazy(() => import("./pages/movies/_id.component"));
interface AppProps {}
interface AppState {}

class App extends Component<AppProps, AppState> {
  render() {
    return (
      <Router>
        <Navbar />
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route
              exact
              path="/movies/top-rated"
              component={TopRatedMoviePage}
            />
            <Route exact path="/movies/popular" component={PopularMoviePage} />
            <Route
              exact
              path="/movies/upcoming"
              component={UpcomingMoviePage}
            />
            <Route exact path="/movies/search" component={SearchMoviePage} />
            <Route path="/movies/:id" component={MovieDetailPage} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

render(<App />, document.getElementById("root"));

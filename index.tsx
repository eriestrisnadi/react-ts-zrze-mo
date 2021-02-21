import React, { Component, Suspense, lazy } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Loading from "./components/commons/loading.component";
import "./style.css";

const HomePage = lazy(() => import("./pages/home.component"));
const PopularMoviePage = lazy(() => import("./pages/movies/popular.component"));
const TopRatedMoviePage = lazy(() =>
  import("./pages/movies/top-rated.component")
);
const UpcomingMoviePage = lazy(() =>
  import("./pages/movies/upcoming.component")
);
const MovieDetailPage = lazy(() => import("./pages/movies/_id.component"));

interface AppProps {}
interface AppState {}

class App extends Component<AppProps, AppState> {
  render() {
    return (
      <Router>
        <div className="bg-white px-5 py-2 flex flex-row gap-5 items-center shadow-md capitalize">
          <Link to="/" className="hidden sm:block">
            Home
          </Link>
          <div className="flex flex-grow gap-2 justify-center">
            <div className="flex justify-center flex-row items-center w-full md:w-64 border-2 rounded-md">
              <input
                type="text"
                placeholder="Search"
                className="outline-none py-1.5 p-2.5 rounded-xl w-full"
              />
            </div>
          </div>
          <div className="hidden sm:flex flex-row items-center gap-5">
            <div role="button">Login</div>
            <div
              className="bg-blue-500 py-1.5 px-3 shadow-md text-white rounded-md"
              role="button"
            >
              Sign Up
            </div>
          </div>
        </div>
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
            <Route path="/movies/:id" component={MovieDetailPage} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

render(<App />, document.getElementById("root"));

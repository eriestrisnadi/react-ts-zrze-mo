import React, { Component } from "react";
import { match } from "react-router-dom";
import { PartialMovieModel } from "../../models/movie";
import { getDetailMovie } from "../../services";

export interface MovieDetailPageParams {
  id: string;
  movie: PartialMovieModel;
}
export interface MovieDetailPageProps {
  match?: match<MovieDetailPageParams>;
}
export interface MovieDetailPageState {}

export class MovieDetailPage extends Component<
  MovieDetailPageProps,
  MovieDetailPageState
> {
  state = {
    movie: undefined
  };

  constructor(props: MovieDetailPageProps) {
    super(props);

    this.state = { movie: undefined };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    getDetailMovie(id).then(movie => this.setState({ movie }));
  }

  render() {
    return <div>{!!this.state.movie ? this.state.movie.title : ""}</div>;
  }
}

export default MovieDetailPage;

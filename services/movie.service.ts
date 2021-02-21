import { MovieModel, MoviePagination } from "../models/movie";
import apiService from "./api.service";

const headers = { endpoint: "movie" };

export const getTopRatedMovies = (params?: any) =>
  apiService.get("top_rated", { headers, params }) as Promise<MoviePagination>;

export const getPopularMovies = (params?: any) =>
  apiService.get("popular", { headers, params }) as Promise<MoviePagination>;

export const getUpcomingMovies = (params?: any) =>
  apiService.get("upcoming", { headers, params }) as Promise<MoviePagination>;

export const getDetailMovie = (id: string, params?: any) =>
  apiService.get(id, { headers, params }) as Promise<MovieModel>;

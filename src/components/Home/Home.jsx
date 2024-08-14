import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import {BiPlay, AiOutlinePlus} from "react-icons/all"

const apiKey = "74a14a916fa50027b7e2e1010ad97e6f";
const url = "https://api.themoviedb.org/3";
const upcoming = "upcoming";
const imgUrl = "https://image.tmdb.org/t/p/original/";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";

const Card = ({ img }) => <img className="card" src={img} alt="cover" />;

const Row = ({
  title,
  arr = [
    {
      img: "https://lumiere-a.akamaihd.net/v1/images/image_174b2bb6.jpeg?region=0%2C0%2C1400%2C2100",
    },
  ],
}) => (
  <div className="row">
    <h2>{title}</h2>
    <div>
      {arr.map((item, index) => (
        <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
      ))}
    </div>
  </div>
);

const Home = () => {
  const [upcomingMovie, setUpcomingMoive] = useState([]);
  const [nowPlaingMovie, setNowPlayingMovie] = useState([]);
  const [popularMovie, setPopularMovie] = useState([]);
  const [topRatedMovie, setTopRatedMovie] = useState([]);
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    const fetchUpComing = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`);
      setUpcomingMoive(results);
    };

    const fetchNowPlaying = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`);
      setNowPlayingMovie(results);
    };
    const fetchPopular = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);
      setPopularMovie(results);
    };
    const fetchTopRated = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`);
      setTopRatedMovie(results);
    };
    const getAllGenre = async () => {
      const {
        data: { genres },
      } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
      setGenre(genres);
    };

    getAllGenre();
    fetchUpComing();
    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();
  }, []);

  return (
    <section className="home">
      <div
        className="banner"
        style={{
          backgroundImage: popularMovie[0]
            ? `url(${`${imgUrl}/${popularMovie[9].poster_path}`})`
            : "rgb(16, 16, 16)",
        }}>
        {popularMovie[2] && <h1>{popularMovie[9].original_title}</h1>}
        {popularMovie[2] && <p>{popularMovie[9].overview}</p>}

        <div>
          <button><BiPlay/> Play</button>
          <button>My List <AiOutlinePlus/></button>
        </div>

      </div>
      <Row title={"Upcoming"} arr={upcomingMovie} />
      <Row title={"Now Playing"} arr={nowPlaingMovie} />
      <Row title={"Popular"} arr={popularMovie} />
      <Row title={"Top Rated"} arr={topRatedMovie} />

      <div className="genreBox">
        {genre.map((item) => (
          <Link key={item.id} to={"/genre/"}>
            {item.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Home;

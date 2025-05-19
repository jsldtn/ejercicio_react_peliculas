// This file defines a movie card component in a React application using TypeScript

import Config from "../../config";
import Image from "next/image";

interface IMovieCard {
  title: string;
  voteAverage: number;
  posterPath: string;
  releaseYear: number;
  description: string;
}

const MovieCard: React.FC<IMovieCard> = ({
  title,
  voteAverage,
  posterPath,
  releaseYear,
  description,
}) => {
  const poster = Config.IMAGE_SOURCE + posterPath;

  return (
    <div className = "flex items-center justify-center">
      <div className = "mx-auto bg-white rounded-3xl shadow-xl">
        <div className = "grid rounded-3xl max-w-[360px] shadow-sm bg-slate-100 flex-col group">
          <Image
            src = {poster}
            width = "360"
            height = "200"
            className = "rounded-t-3xl object-cover"
            alt = {title}
          />
          <div className = "p-5">
            <p className = "h-10">{title}</p>
            <p className = "text-slate-400 pt-2 font-semibold">({releaseYear})</p>
            <div className = "h-20">
              <span className = "line-clamp-3 py-2 text-sm font-light leading-relaxed">
                {description}
              </span>
            </div>
            <div className = "flex justify-between">
              <div className = "font-black">
                <span className = "text-yellow-500 text-xl">SCORE</span>
                <span className = "text-3xl">{voteAverage.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
function Section({ title, movies }) {
  return (
    <div className="section">
      <div className="title">{title}</div>
      <div className="movies">
        {movies.map((image, i) => {
          return <img src={image} key={i} alt="movie" />;
        })}
      </div>
    </div>
  );
}

export default Section;

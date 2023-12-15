function Job(props) {
  const { className, title, contractType, country, city } = props;
  return (
    <>
      <div className={"job-container " + className}>
        <div>{title}</div>
        <div>
          {contractType} - {country} - {city}
        </div>
      </div>
    </>
  );
}

export default Job;

import Job from "./Job";

function Jobs(props) {
  return (
    <>
      <div className="jobs-container">
        <Job
          className="red"
          title="Full Time Sales Associate - Sydney Boutique"
          contractType="CDI"
          country="Australie"
          city="Sydney"
        />
        <Job
          className="green"
          title="Agent de Sécurité - Pantin"
          contractType="CDI"
          country="France"
          city="Pantin"
        />
        <Job
          className="yellow"
          title="Responsable d'Atelier (H/F)"
          contractType="CDD"
          country="France"
          city="Paris"
        />
        <Job
          className="blue"
          title="Chef de Projets"
          contractType="CDD"
          country="France"
          city="Paris"
        />
        <Job
          className="salmon"
          title="Développeur React.js"
          contractType="CDI"
          country="France"
          city="Paris"
        />
        <Job
          className="red"
          title="Sales Associate Stockholm"
          contractType="CDI"
          country="Suède"
          city="Stockholm"
        />
        <Job
          className="green"
          title="Full Time Sales Associate - Sydney Boutique"
          contractType="CDI"
          country="Australie"
          city="Sydney"
        />
      </div>
    </>
  );
}

export default Jobs;

const InfoCountry = ({ data }) => {
  if (!data) {
    return null;
  }

  return (
    <>
      <h1>{data.name.common}</h1>
      <p>Capital {data.capital[0]}</p>
      <p>Area {data.area}</p>

      <h2>Languages</h2>
      <ul>
        {Object.values(data.languages).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <img
        src={data.flags.png}
        alt={`the flag of ${data.name.common}`}
        style={{
          width: 200,
          boxShadow: "0 0 10px #00000063",
        }}
      />
    </>
  );
};

export default InfoCountry;
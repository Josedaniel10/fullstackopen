const ListResults = ({ matches, onResultClick }) => {
  if (!matches) {
    return null;
  }

  if (matches.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  return (
    <>
      {matches.map((name) => (
        <div key={name}>
          {name}
          <button data-value={name} onClick={onResultClick}>
            Show
          </button>
        </div>
      ))}
    </>
  );
};

export default ListResults;
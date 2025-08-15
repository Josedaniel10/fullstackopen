const CountryForm = ({ inputCountry, changeValue }) => {
  return (
    <>
      <form>
        <div>
          <label>Find countries:</label>
          <input type="text" value={inputCountry} onChange={changeValue} />
        </div>
      </form>
    </>
  );
};

export default CountryForm;
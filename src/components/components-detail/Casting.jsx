import React from "react";

const Casting = ({ data }) => {
  return (
    <div className="casting">
      {data.profile_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${data.profile_path}`}
          alt="err"
          className="img"
        />
      ) : (
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          className="img"
        />
      )}

      <div className="text">
        <h3>{data.name}</h3>
        <p>as {data.character}</p>
      </div>
    </div>
  );
};

export default Casting;

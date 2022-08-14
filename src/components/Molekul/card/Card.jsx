import "./card.scss";

import React from "react";
import Star from "../../Star/Star";
import { motion } from "framer-motion";

const Card = ({ data, tahun }) => {
  return (
    <motion.div
      className="container-card"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className={"info-item"}>
        <div className="item-title">
          <p>
            {data.original_title || data.original_name} ({tahun})
          </p>
          <Star vote={data.vote_average} />
        </div>
      </div>
      <img
        className="img"
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        alt={data.original_name}
        width={"250px"}
        height={"330px"}
      />
    </motion.div>
  );
};

export default Card;

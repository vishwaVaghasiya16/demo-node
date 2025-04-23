import jwt from "jsonwebtoken";
import {config} from "../config/config.js";

/**
 * Pagination details
 */
export const paginationDetails = ({page = 1,totalItems,limit}) => {
  const totalPages = Math.ceil(totalItems / limit);

  return {page: Number(page),totalPages,totalItems,limit};
};

/**
 * Pagination function
 */
export const paginationFun = (data) => {
  const {page = 1,limit = 10} = data;

  return {
    limit: Number(limit),
    skip: (Number(page) - 1) * Number(limit),
  };
};

/**
 * Generate token
 */
export const generateToken = async (data,expiresIn = "50d") => {
  return jwt.sign(data,config.jwt.secret_key,{expiresIn: expiresIn});
};

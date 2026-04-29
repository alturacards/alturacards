import axios from "axios";

const API_KEY = process.env.POKEMON_TCG_API_KEY;

const api = axios.create({
  baseURL: "https://api.pokemontcg.io/v2",
  headers: {
    "X-Api-Key": API_KEY || "",
  },
});

export const getCards = async (query: string = "pikachu") => {
  const res = await api.get(`/cards?q=name:${query}`);
  return res.data.data;
};

export const getCardById = async (id: string) => {
  const res = await api.get(`/cards/${id}`);
  return res.data.data;
};
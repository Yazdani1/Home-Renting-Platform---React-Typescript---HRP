// export const API_URL ="http://localhost:8080/api/v0"

export const API_URL ="https://home-renting-platform-node-js-server-hrp.vercel.app/api/v0"


export const headerConfig = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
};
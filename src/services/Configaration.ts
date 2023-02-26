export const API_URL ="http://localhost:8080/api/v0"

// export const API_URL ="https://video-stream-platform.vercel.app/api"


export const headerConfig = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
};
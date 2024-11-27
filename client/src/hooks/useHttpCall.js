import { useState } from "react";
import axios from "axios";
import { showToast } from "../utils/toast";
import { toastType } from "../utils/toast-type";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

const useHttpClient = () => {

  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = async ({
    url,
    method = "GET",
    body = null,
    headers = {},
    toast = true,
    withCredentials = false
  }

  ) => {
    setIsLoading(true);
    try {
      console.log(axios.defaults.baseURL + url, method, body);
      const response = await axios({
        url,
        method,
        data: body,
        headers,
        withCredentials,
      });
      console.log("URL RESPONSE", url, " ", response);
      if (toast) showToast(response.data.message, "success");
      return response;
    } catch (error) {
      console.log(error);
      if (toast)
        showToast(error.response.data.message, toastType(error.response.status));
      // throw error;
    } finally {
      setIsLoading(false);
    }
  };



  return { isLoading, sendRequest, setIsLoading };
};

export default useHttpClient;

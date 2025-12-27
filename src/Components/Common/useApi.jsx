import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

export const useApi = ({ url, method, body = null, headers = null }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);
  const fetchData = () => {
    axios[method](url, JSON.parse(headers), JSON.parse(body))
      .then(res => {
        setResponse(res.data);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [method, url, body, headers]);

  // custom hook returns value
  return { response, error, loading };
};

export const usePost = () => {
  const [data, setData] = useState([{ response: "", loading: "", error: "" }]);
  const { response, loading, error } = useApi({
    method: "post",
    url: "/posts",
    headers: JSON.stringify({ accept: "*/*" }),
    body: JSON.stringify({
      userId: 1,
      id: 19392,
      title: "title",
      body: "Sample text",
    }),
  });
  useEffect(() => {
    if (response !== null) {
      setData({ response: response, loading: loading, error: error });
    }
  }, [response]);

  return data;
};

export const useGet = () => {
  const [data, setData] = useState([{ response: "", loading: "", error: "" }]);
  const { response, loading, error } = useApi({
    method: "get",
    url: "/todos/1",
    headers: JSON.stringify({ accept: "*/*" }),
    body: JSON.stringify({
      userId: 1,
      id: 19392,
      title: "title",
      body: "Sample text",
    }),
  });
  // };
  //   setData({ response: response, loading: loading, error: error });
  useEffect(() => {
    if (response !== null) {
      setData({ response: response, loading: loading, error: error });
    }
  }, [response]);

  return data;
};

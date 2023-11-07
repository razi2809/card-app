import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const useSearchquery = () => {
  //get query params from url
  //once he gets the params 
  //convert to an object thet give 
  //key:value
  const { search } = useLocation();
  return useMemo(() => {
    let query = {};
    //convert entries to object
    for (let [key, value] of new URLSearchParams(search)) {
      query[key] = value;
    }
    return query;
  }, [search]);
};
export default useSearchquery;

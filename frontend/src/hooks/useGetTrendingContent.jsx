import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";

const useGettrendingContent = () => {
  const [trendingContent,setTrendingContent]  = useState(null);
  const {contentType} = useContentStore();
  
  useEffect(()=>{
    const getTrendingContent = async ()=>{
        try{
         const res = await axios.get(`/api/v1/${contentType}/trending`);
        setTrendingContent(res.data.content);
        }catch(err){
           console.error(err);
        }
    }
    getTrendingContent();
  },[contentType]);

  return {trendingContent};
}

export default useGettrendingContent;

import React from "react";
import { axiosPrivate } from "../api/axios";
import { useState } from "react";
import { useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
export const ColumnFilter = ( {event,setData,getData,placeholder='search'} ) => {  
  const [searchData, setSearchData] = useState('')
  const debouncedSearch = useDebounce(searchData,1000)

  useEffect(()=>{

    const getSearchedData = async (searchBy,seachSatring) =>{
     
      console.log('searchData',searchData.trim()==='')
      
      setData((prev) => {return[{
            email: "azat@mail.ru",
            firstname:"Axvan",            
            lastname:"Sahakyan",
            midname: "Hayriki"}]})
            // const response = await axiosPrivate.post('/searchData',{
          //   searchBy: searchBy,
          //   searchString: seachSatring
          // });  
    }
    if(debouncedSearch){
      getSearchedData(event.column?.id,searchData)
    }
    else{
      getData()
    }
    
  },[debouncedSearch])
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      <input
      type="search"
      placeholder={placeholder}
        value={searchData || ""}
        onChange={(e)=>setSearchData(e.target.value)}
      />
    </div>
    
  );
};

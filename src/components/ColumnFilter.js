import React, { useState, useEffect, useRef } from "react";
import { axiosPrivate } from "../api/axios";
import useDebounce from "../hooks/useDebounce";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";

export const ColumnFilter = ({ 
  column,
  setData,
  data, 
  id, 
  placeholder, 
  getUrl='' ,
  searchUrl='',
  filterData,
  setFilterData,
  handleSearchPageCount}) => {
  const [searchTerms, setSearchTerms] = useState(filterData?.[id] ||null);
  const [toggleSearchModal, setToggleSearchModal] = useState(false);
  const [mainData, setMainData] = useState([]);
  const [usersPerPage, setUsersPerPage] = useState(Math.round((window.innerHeight / 100)));
  const modalRef = useRef();
  const debouncedSearch = useDebounce(searchTerms, 1000);
  const [keyPressed, setKeyPressed] = useState(false);
  // console.log('filterData',Object.values(filterData).some(value => !!value))
  //console.log('filterData',filterData)

  const handleKeyDown = () => {
    //debugger
    setKeyPressed(true);
  };
  const handleSearch = async () =>{
    const controller = new AbortController();

    setFilterData({[id]:searchTerms})
    
    const updateFilterdObject = {...filterData,[id]:searchTerms}
    for(let i in updateFilterdObject){
      if(updateFilterdObject[i]==='')
        delete updateFilterdObject[i]
    }
   // console.log(updateFilterdObject)
    if(filterData && Object.values(filterData).some(value => !!value)){
      const params  = Object.keys(updateFilterdObject).map((key) => ({
        column: key,
        query: updateFilterdObject[key]
      }))
      // console.log({params:params ,
      //   page: 1,
      //   onPage: usersPerPage,
      //   signal: controller.signal})
        try {
      const response = await axiosPrivate.post(searchUrl, {
        params:{column:id,query:searchTerms},
        page: 1,
        onPage: usersPerPage,
        signal: controller.signal
      });
      setData(response.data.jsonString);
    } catch (err) {
      console.error(err);
    }
     }else if (searchTerms.toString().trim() !== ''){
      try {
      const response = await axiosPrivate.post(searchUrl, {
        params: { column: id, query: searchTerms},
        page: 1,
        onPage: usersPerPage,
        signal: controller.signal
      });
      //console.log('get search data')
      setData(response.data.jsonString);
      setToggleSearchModal(false)  
      handleSearchPageCount(
        {
        count:response.data.count,
        id:id,
        searchTerms:searchTerms
      
      })    
    }catch (err) {
      console.error(err);
    }    
  }
  // else if (toggleSearchModal && !searchTerms==='') {
  //   console.log("call full data")
  //   setFilterData({[id]:''})

  //   const response = await axiosPrivate.post(getUrl, {
  //     signal: controller.signal,
  //     page: 1,
  //     onPage: usersPerPage,
  //   });    
  //     setData(response.data.jsonString) 
  // }
}
const handleEmptySearch = async () =>{
  const controller = new AbortController();
  //debugger
  // if (toggleSearchModal && debouncedSearch==='') {
  //   // const asd = {...filterData}
  //   // delete asd[id]
  //   // setFilterData(asd)
    
  //   console.log("call full data")
  //   //console.log("call full data",asd)
  //   try { 
  //     const response = await axiosPrivate.post(getUrl, {
  //     signal: controller.signal,
  //     page: 1,
  //     onPage: usersPerPage,
  //   });
    
    
  //   setData(response.data.jsonString);            
    
    
  // } catch (err) {
  //   console.error(err);
  // }
  //setFilterData({"garnik":''})
//}
}
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        // if (debouncedSearch.trim() !== '') {
        //  setFilterData({[id]:debouncedSearch})
        //   // const response = await axiosPrivate.post(searchUrl, {
        //   //   params: { column: id, query: debouncedSearch},
        //   //   page: 1,
        //   //   onPage: usersPerPage,
        //   //   signal: controller.signal
        //   // });
        //   // if (isMounted) {
        //   //   setData(response.data.jsonString);
        //   // }
        // } 
        // else 
        // if (debouncedSearch.trim() !== '') {
        //   console.log("call local data")
        //   //setFilterData({[id]:''})
        //   // const response = await axiosPrivate.post(getUrl, {
        //   //   signal: controller.signal,
        //   //   page: 1,
        //   //   onPage: usersPerPage,
        //   // });
        //   // if (isMounted) {
        //   //   setData(response.data.jsonString);            
        //   // }
        // }
        //else 
        if (toggleSearchModal && debouncedSearch==='' && keyPressed) {
          // setFilterData({[id]:''})
          // const asd = {...filterData}
          // delete asd[id]
          // setFilterData(asd)

          // console.log("call full data")
          // console.log("call full data",asd)
         
          const response = await axiosPrivate.post(getUrl, {
            signal: controller.signal,
            page: 1,
            onPage: usersPerPage,
          });
          if (isMounted) {
            setKeyPressed(false)
            setToggleSearchModal(false) 
            handleSearchPageCount(
              {
                count:'',
                id:'',
                searchTerms:''
              }
            )    

            setData(response.data.jsonString);            
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [debouncedSearch, id, toggleSearchModal, getUrl,searchUrl, usersPerPage, setData,]);
  const handleSearchInputChange = (value) => {


    setSearchTerms(value);
    //setFilterData({[id]:debouncedSearch})
  }

  const handleSearchClick = (e) => {
    e.stopPropagation();
    setToggleSearchModal((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setToggleSearchModal(false);
    }
  };

  useEffect(() => {
    if (toggleSearchModal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleSearchModal]);

  return (
    <>
      <div style={{ position: "relative" }}>
        <span
          className="d-flex justify-content-center align-items-center"
          onClick={handleSearchClick}
          style={{ 
          backgroundColor:searchTerms ? '#4eafcb' : '', 
          padding: '5px', 
          borderRadius: '5px' }}
        >
          <FeatherIcon icon="search" width={15} height={15} />
        </span>
        {toggleSearchModal && (
          <div
            ref={modalRef}
            style={{
              position: "absolute",
              padding: "8px",
              backgroundColor: "#ffffff",
              borderRadius: "5px",
              boxShadow: "0 6px 16px 0 rgba(0, 0, 0, 0.1)",
              zIndex: 1000,
            }}
          >
            <input
              type={id==="age" || id==="patientId"?"number":"search"}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {                
                handleSearchInputChange(e.target.value)
              }}
              value={searchTerms || ''}
              onKeyDown={handleKeyDown}
              placeholder={placeholder ? placeholder : id}
              style={{
                minWidth: "200px",
                backgroundColor: "#fff",
                border: "2px solid #f6f6f6",
                borderRadius: "5px",
                padding: "5px",
              }}
            />
            <div className="d-flex">
              <button
                className="btn__search"
                onClick={handleSearch}
                style={{
                  backgroundColor: "#4eafcb",
                  color:'#fff',
                  margin: "5px",
                  borderRadius: "5px",
                  border: "none",
                  padding: "5px",
                }}
                disabled={!searchTerms}
              >
               <FeatherIcon icon="search" width={15} height={15} /> Փնտրել
              </button>
              <button
                className="btn__search"
                onClick={() => {
                  //setToggleSearchModal(false);
                  handleEmptySearch()
                  setSearchTerms('')
                  handleKeyDown()
                  //handleSearchInputChange('');
                }}
                style={{
                  backgroundColor: "#f6f6f6",
                  margin: "5px",
                  borderRadius: "5px",
                  border: "none",
                  padding: "5px",
                }}
              >
                Ջնջել
              </button>
              <button
                className="btn__search"
                onClick={(e)=>handleSearchClick(e)}
                style={{
                  backgroundColor: "#f6f6f6",
                  margin: "5px",
                  borderRadius: "5px",
                  border: "none",
                  padding: "5px",
                }}
              >
                Փակել
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

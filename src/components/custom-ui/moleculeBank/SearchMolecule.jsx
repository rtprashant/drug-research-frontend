import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { searchMoleculeFailure, searchMoleculeStart, searchMoleculeStop, searchMoleculeSuccess } from '../../../redux/features/moleculeBank/searchMolecule';
import { toast } from 'sonner';

function SearchMolecule() {
    const [moleculeName , setMoleculeName] = useState('')
    const [isTyping , setIsTyping] = useState(false)
    const {searchloading,
      error ,
      element ,
      search } = useSelector(state => state.searchMolecule)
      const dispatch = useDispatch()
      const handleInputChange = (e)=>{
        setMoleculeName(e.target.value)
        setIsTyping(true)

      }
    const handleSearchClick = async(name)=>{
      console.log(moleculeName);
      
      if (name.trim() === "") {
        dispatch(searchMoleculeStop());
        return; 
    }


        try {
          dispatch(searchMoleculeStart())
          const response = await axios.post("http://localhost:5000/api/v1/moleculeBanks/searchMolecule" , { moleculeName: name },{
              headers: {
                  'Content-Type': 'application/json',
              },
              withCredentials:true
          })
          console.log('search clicked');
          console.log(response);
          console.log(response.data.data);
          dispatch(searchMoleculeSuccess(response.data.data))
          toast.success("Molecule Found")
        } catch (error) {
          console.error(error);
          dispatch(searchMoleculeFailure(error.message))
          toast.error(error.response.data.data)
          
        }
       
    }
    const debounce = (func, delay) => {
      let timeout;
      return (args) => {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
              func(args);
          }, delay);
      };
  };


  const debouncedSearch = debounce(handleSearchClick, 1000);
  useEffect(() => {
    if ( moleculeName.trim().length === 0 ) {
      debouncedSearch(moleculeName);
    }
  }, [moleculeName]);
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          handleSearchClick(moleculeName);
        }
      };
  return (
    <div className='flex'>
      <input type="text"
        value={moleculeName}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
          className='w-full rounded-xl h-11 p-5'
          placeholder='search molecule...' />
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-
          2 px-4 rounded-xl' onClick={() => handleSearchClick(moleculeName)}><FaSearch/></button>
    </div>
  )
}

export default SearchMolecule

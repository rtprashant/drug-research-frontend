import React, { useEffect, useState } from 'react'
import MoleculeStructure from './MoleculeStructure';
import MoleculeList from './MoleculeList';
import AddMolecule from './AddMolecule';
import { X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { set } from 'react-hook-form';
import { moleculeAddToList } from '../../../redux/features/moleculeBank/addMolecule';
import SearchMolecule from './SearchMolecule';

function MoleculeBank() {
  const [addMoleculePopUp, setAddMoleculePopUp] = useState(false)
  const { loading,
    error,
    moleculeData,
    molecule,
    addMoleculeSuccess } = useSelector((state) => state.addMolecule)
  const dispatch = useDispatch()
  const handleAddMolecule = () => {
    setAddMoleculePopUp(!addMoleculePopUp)
  }

  useEffect(() => {
    if (molecule) {
      setAddMoleculePopUp(false)
    }

    dispatch(moleculeAddToList())

  }, [molecule])

  


  return (
    <div className='p-10 flex flex-col gap-10 ' >
      <div className='flex justify-between'>
        <h1 className='font-bold text-[50px] font-spaceGrotesk'>MOLECULE BANK</h1>
        <button className='border bg-blue-500  rounded-xl px-10 font-spaceGrotesk text-white '
          onClick={handleAddMolecule}>ADD MOLECULE </button>
      </div>
      <div>
        <SearchMolecule/>
      </div>
      <div>
        <MoleculeList />
      </div>
      <div className='fixed'>
        {addMoleculePopUp && (
          <div className=''>
            <AddMolecule />
            <button onClick={handleAddMolecule} className='absolute mt-10 ml-[55vw]  '><X /></button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MoleculeBank

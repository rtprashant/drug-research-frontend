import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Skelton from './Skelton';
import MoleculeStructure from '../moleculeBank/MoleculeStructure'
import axios from 'axios';
import { dltMoleculeFailure, dltMoleculeStart, dltMoleculeSuceess } from '../../../redux/features/moleculeGenration/moleculeGenration';
import { toast } from 'sonner';
const apiUrl = import.meta.env.VITE_BACKEND_URL;
function GenrateMoleculeOutput() {
    const { loading, error, molecule , dltLoading } = useSelector((state) => state.moleculeGenration);
    const dispatch = useDispatch()
    const [molecules , setMolecules] = useState([])
    useEffect(() => {
        if (molecule) {
            setMolecules(molecule);
        } else  {
            setMolecules([]);  
        }
    }, [molecule]);

    const handleSubmit = ()=>{
        setMolecules([])
        toast.success(" Successfully Sended To Admin ")

    }

    const handleClear = async()=>{
        const id = molecules?.id;
        try {
            dispatch(dltMoleculeStart())
            const res = await axios.post(`${apiUrl}/api/v1/moleculeGenration/dltMolecule`, {id},
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }
            )
            dispatch(dltMoleculeSuceess())
        } catch (error) {
            console.log(error);
            dispatch(dltMoleculeFailure(error.data))
        }
    }
    
  return (
    <div className=' w-[50%] p-3'>
         
        {loading?<Skelton
        className=" mr-8"/>:(
            molecules.generatedMolecules?.length>0? (
                <div>
                   <h1 className='font-bold font-spaceGrotesk text-[20px] text-center my-5 '>Generated Molecules</h1>
                    <div className='flex flex-wrap gap-4'>
                        {molecules.generatedMolecules.map((molecule , index) => (
                            
                            <div key={Math.random()} className='bg-white p-4 rounded-md shadow-md flex flex-col'>
                                <MoleculeStructure
                                 id={index}
                                 structure={molecule.structure}
                                />
                                <p> SCORE : {molecule.score}</p>

                            </div>

                        ))}
                    </div>
                    <div className='flex gap-3 justify-evenly mt-2 '>
                    <button onClick={handleClear} className='border px-4 py-1 rounded-lg text-red-500 border-red-500'>Not Satisfied ? Distroy It</button>
                    <button onClick={handleSubmit} className='border px-4 py-1 rounded-lg text-green-500 border-green-500'>Satisfied ? Send This To Admin</button>
                    </div>

                </div>
                
            ):""
          
        )}
      
    </div>
)
}

export default GenrateMoleculeOutput

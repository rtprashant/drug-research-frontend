import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GenrateMoleculeOutput from './GenrateMoleculeOutput';
import { LoaderCircle } from 'lucide-react'
function DltMolecule() {
    const { loading, error, molecule, dltLoading } = useSelector((state) => state.moleculeGenration);
    const dispatch = useDispatch()
    return (
        <div className=' w-[50%] p-3'>
            <div className='mr-8'>
            {dltLoading ? (
                <LoaderCircle size={24} color="#000" className='animate-spin mt-2' />
            ) :<GenrateMoleculeOutput/>}
            </div>

        </div>
    )
}

export default DltMolecule

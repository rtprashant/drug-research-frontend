import React from 'react'
import { useSelector } from 'react-redux'

function ResearchResponse() {
    const { loading, error, moleculeDetails } = useSelector((state) => state.moleculeDetails)

    return (
        <div className='bg-transparent rounded-xl w-full flex flex-col  relative gap-5'>
            <div className='bg-white rounded-xl shadow-xl p-5 flex flex-col gap-3'>
                <h1 className='font-bold text-2xl'>Basic Information</h1>
                <div className='text-gray-500   font-staatliches gap-2'>
                    <div className='flex gap-2'>
                        <p>Molecular Formula     : </p>
                        <p className='text-black '>{moleculeDetails?.MolecularFormula  }</p>
                    </div>
                    <div className='flex gap-2'>
                        <p>Molecular Weight    : </p>
                        <p className='text-black '>{moleculeDetails?.MolecularWeight  }</p>
                    </div>
                    <div className='flex gap-2'>
                        <p>InChIKey    : </p>
                        <p className='text-black '>{moleculeDetails?.InChIKey  }</p>
                    </div>
                    <div className='flex gap-2'>
                        <p>Canonical SMILES    : </p>
                        <p className='text-black '>{moleculeDetails?.CanonicalSMILES  }</p>
                    </div>
                    <div className='flex gap-2'>
                        <p>Isomeric SMILES     : </p>
                        <p className='text-black '>{moleculeDetails?.IsomericSMILES  }</p>
                    </div>
                    <div className='flex gap-2'>
                        <p>IUPAC Name    : </p>
                        <p className='text-black '>{moleculeDetails?.IUPACName  }</p>
                    </div>


                </div>
            </div>
            <div className='bg-white rounded-xl shadow-xl p-5 flex flex-col gap-3'>
                <h1 className='font-bold text-2xl'>Physical Properties</h1>
                <div className='text-gray-500   font-staatliches gap-2'>
                    <div className='flex gap-2'>
                        <p>XLogP     : </p>
                        <p className='text-black '>{moleculeDetails?.XLogP  }</p>
                    </div>
                    <div className='flex gap-2'>
                        <p>Exact Mass    : </p>
                        <p className='text-black '>{moleculeDetails?.ExactMass  }</p>
                    </div>
                    <div className='flex gap-2'>
                        <p>Monoisotopic Mass    : </p>
                        <p className='text-black '>{moleculeDetails?.MonoisotopicMass  }</p>
                    </div>
                    <div className='flex gap-2'>
                        <p>Topological Polar Surface Area (TPSA)    : </p>
                        <p className='text-black '>{moleculeDetails?.TPSA  }</p>
                    </div>
                    <div className='flex gap-2'>
                        <p>Complexity     : </p>
                        <p className='text-black '>{moleculeDetails?.Complexity  }</p>
                    </div>
                    <div className='flex gap-2'>
                        <p>Charge    : </p>
                        <p className='text-black '>{moleculeDetails?.Charge  }</p>
                    </div>


                </div>
            </div>
            <div className='bg-white rounded-xl shadow-xl p-5 flex flex-col gap-3'>
                <h1 className='font-bold text-2xl'>Additional Information</h1>
                <div className='text-gray-500   font-staatliches gap-2'>
                    <div className='flex gap-2'>
                        <p>Hydrogen Bond Donors     : </p>
                        <p className='text-black '>{moleculeDetails?.HBondDonorCount  }</p>
                    </div>
                    <div className='flex gap-2'>
                        <p>Hydrogen Bond Acceptors    : </p>
                        <p className='text-black '>{moleculeDetails?.HBondAcceptorCount  }</p>
                    </div>
                    <div className='flex gap-2'>
                        <p>Rotatable Bonds    : </p>
                        <p className='text-black '>{moleculeDetails?.RotatableBondCount  }</p>
                    </div>
                    <div className='flex gap-2'>
                        <p>Heavy Atom Count    : </p>
                        <p className='text-black '>{moleculeDetails?.HeavyAtomCount }</p>
                    </div>
                    
                    


                </div>
            </div>
        </div>
    )
}

export default ResearchResponse

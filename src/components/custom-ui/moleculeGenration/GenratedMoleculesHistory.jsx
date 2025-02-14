import React, { lazy, Suspense, useEffect, useState } from 'react'
import axios from 'axios'
import Skelton from './Skelton';
const apiUrl = import.meta.env.VITE_BACKEND_URL;
const MoleculeStructure = lazy(() => import('../moleculeBank/MoleculeStructure'))

function GenratedMoleculesHistory() {
    const [moleculeHistory, setMoleculeHistory] = useState([])
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/v1/moleculeGenration/getMoleculeHistory`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true
                    }
                )
                setMoleculeHistory(response.data.data)
                console.log(response.data.data);

            } catch (error) {
                console.error(error);

            }
        }

        fetchHistory()


    }, [])
    return (
        <div className='p-10 '>
            <h1 className='text-center font-bold font-spaceGrotesk text-[20px] '>YOU ARE DOING A GREATE JOB</h1>
            <h1 className='font-bold font-spaceGrotesk  mt-5'> Generated Molecules History</h1>
            {
                moleculeHistory ? (
                    moleculeHistory.map((molecules) => (
                        <div key={molecules._id}  className='flex flex-col mt-5' >
                            <div className='w-full rounded-xl shadow-xl bg-white p-5 flex flex-col gap-3'>
                                <div className='flex gap-2'>
                                    <p className='font-bold'>SMILE :</p>
                                    <p className=''>{molecules.smiles}</p>
                                </div>
                                <div className='flex justify-between'>
                                    <div className='flex gap-2'>
                                        <p className='font-bold'>Minimum Similarity :</p>
                                        <p>{molecules.minSimilarity}</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <p className='font-bold'>No Of Molecules :</p>
                                        <p>{molecules.noOfMolecules}</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <p className='font-bold'>No Of Itrations :</p>
                                        <p>{molecules.noOfItrations}</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <p className='font-bold'>No Of Particals :</p>
                                        <p>{molecules.noOfParticals}</p>
                                    </div>

                                </div>
                                <div className='flex '>
                                    <div className='flex gap-2'>
                                        <p className='font-bold'>Property To Optimize :</p>
                                        <p>{molecules.propertyToOptimize}</p>
                                    </div>
                                    <div className='flex gap-2 ml-[8.5vw]'>
                                        <p className='font-bold'>Status :</p>
                                        <p className={`${molecules.status==="Pending" ? 'text-yellow-500' : 'text-red-500'}  ${molecules.status==="Accepted" ? 'text-green-500' : 'text-red-500'} `}>{molecules.status}</p>
                                    </div>
                                    <div className='flex gap-2 ml-[12vw]'>
                                        <p className='font-bold'>Created At :</p>
                                        <p>{molecules.createdAt}</p>
                                    </div>

                                </div>
                                <div className='flex flex-col'>
                                    <p className='font-bold'>Generated Molecules :</p>
                                    <div className=' w-full  flex-wrap flex'>
                                        {molecules.genratedModel.map((model)=>(
                                            <div key={model._id} className='flex flex-col flex-grow'>
                                              <Suspense fallback={Skelton}>
                                              <MoleculeStructure className='flex '
                                            id={model._id}
                                            structure={model.structure}
                                            
                                        />
                                              </Suspense>
                                        <p> Score :  {model.score}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))

                ) : (
                    <div>
                        <p className='text-center'>Nothing to show here</p>
                    </div>
                )
            }
        </div>
    )
}

export default GenratedMoleculesHistory

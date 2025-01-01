import React, { useEffect, useState } from 'react'
import MoleculeStructure from '../moleculeBank/MoleculeStructure'
import axios from 'axios'
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
const apiUrl = import.meta.env.VITE_BACKEND_URL;

function MolecucleDetails() {
    const [details, setDetails] = useState({})
    const [moleculeStructure, setMoleculeStructure] = useState({})
    const [molecules, setMolecules] = useState([])
    const [fetchTrigger, setFetchTrigger] = useState(false)
    const [numberOfMoleculeChanged , setNumberOfMoleculeChanged] = useState(false)
    const { molecule } = useSelector(state=>state.moleculeGenration)

    const handleShowDetails = (id) => {
        setDetails((prev) => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    const handleShowMoleculeStructure = (id) => {
        setMoleculeStructure((prev) => ({
            ...prev,
            [id]: !prev[id]
        }
        ))

    }
    const handleStatus = async (e)=>{
        const { id , value } = e.target
        const formData = new FormData()
        formData.append('id', id)
        formData.append('status', value)
       try {
        const res = await axios.put(`${apiUrl}/api/v1/admin/changeStatus` ,formData,{
             headers: {
                 'Content-Type': 'application/json',
             },
             withCredentials: true
         })
         toast.success('Status changed successfully')
         setFetchTrigger((prev) => !prev);
       
       } catch (error) {
        toast.error('Something Went Wrong')
       }   
    }
    

    useEffect(() => {
        const getMolecules = async () => {
            try {
                const res = await axios.get(`${apiUrl}/api/v1/admin/getSubmittedMolecules`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                })
                console.log(res.data.data.moleculeWithUserDetails);
                setMolecules(res.data.data.moleculeWithUserDetails)
                setNumberOfMoleculeChanged(true)

            } catch (error) {
                toast.error("Something Went Wrong")
            }

        }
        getMolecules();
    }, [fetchTrigger , molecule , numberOfMoleculeChanged])
    return (
        <div className='p-8'>
            <div className='w-full bg-white shadow-xl rounded-xl p-5'>
                <h1 className='font-bold text-[20px]'>Molecule Acceptence Requests</h1>
                {
                    molecules.map((molecule, index) => (
                        <div className='flex flex-col '>
                            <div className='flex justify-between'>
                                <div className='mt-5 flex gap-2'>
                                    <img src={molecule.createdBy?.profileImage} className='h-10 w-10 rounded-full' alt="profile Image" />
                                    <div className=''>
                                        <p className='text-black '>{molecule.createdBy?.fullName}</p>
                                        <p className='text-gray-500 text-[12px] -mt-1'>{molecule.createdBy?.userName}</p>
                                    </div>
                                </div>
                                <div className='flex gap-4' onClick={handleStatus}>
                                    <button className='text-green-500 ' value='Accepted' id={molecule._id}>Accept</button>
                                    <button className='text-red-500' value='Rejected'id={molecule._id}>Reject</button>
                                </div>

                            </div>
                            <div className='mt-3 '>
                                <button className='text-blue-500 font-sans' onClick={() => handleShowDetails(molecule._id)}><div key={molecules._id}>
                                    {details[molecule._id] ? (
                                        <div key={molecules._id}>
                                            Hide Details
                                        </div>
                                    ) : (
                                        <div key={molecules._id}>
                                            Show Details
                                        </div>
                                    )}
                                </div>
                                </button>
                            </div>
                            {
                                details[molecule._id] && (
                                    <div className='mt-3'>
                                        <div className='w-full rounded-xl shadow-xl bg-white p-5 flex flex-col gap-3'>
                                            <div className='flex gap-2'>
                                                <p className='font-bold'>SMILE :</p>
                                                <p className=''>{molecule.smiles}</p>
                                            </div>
                                            <div className='flex justify-between'>
                                                <div className='flex gap-2'>
                                                    <p className='font-bold'>Minimum Similarity :</p>
                                                    <p>{molecule.minSimilarity}</p>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <p className='font-bold'>No Of Molecules :</p>
                                                    <p>{molecule.noOfMolecules}</p>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <p className='font-bold'>No Of Itrations :</p>
                                                    <p>{molecule.noOfItrations}</p>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <p className='font-bold'>No Of Particals :</p>
                                                    <p>{molecule.noOfParticals}</p>
                                                </div>

                                            </div>
                                            <div className='flex '>
                                                <div className='flex gap-2'>
                                                    <p className='font-bold'>Optimized Property :</p>
                                                    <p>{molecule.propertyToOptimize}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <button className='text-blue-500 font-sans' onClick={() => handleShowMoleculeStructure(molecule._id)}>{moleculeStructure[molecule._id] ? "Hide Molecule Structure And Score" : "Show Molecule Structure And Score"}</button>
                                            </div>
                                            <div>
                                                {
                                                    moleculeStructure[molecule._id] && (
                                                        <div className='flex flex-col'>
                                                            <p className='font-bold'>Generated Molecules :</p>
                                                            <div className=' w-full  flex-wrap flex'>
                                                                {molecule.genratedModel.map((model) => (
                                                        <div key={model._id} className='flex flex-col flex-grow'>
                                                            <MoleculeStructure className='flex '
                                                                id={model._id}
                                                                structure={model.structure}

                                                            />
                                                            <p> Score :  {model.score}</p>
                                                        </div>
                                                    ))}
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>


                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    ))
                }



            </div>

        </div>
    )
}

export default MolecucleDetails

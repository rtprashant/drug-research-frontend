import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom';
import { moleculeGenrationFailure, moleculeGenrationStart, moleculeGenrationSuccess } from '../../../redux/features/moleculeGenration/moleculeGenration';
const apiUrl = import.meta.env.VITE_BACKEND_URL;

function GenrateMoleculeForm() {
    const { handleSubmit, register, formState: { errors } } = useForm()
    const { loading, error, molecule } = useSelector((state) => state.moleculeGenration);
    const dispatch = useDispatch()

    const handleSubmitEvent = async (data) => {
        dispatch(moleculeGenrationStart())
        try {
            const response = await axios.post(`${apiUrl}/api/v1/moleculeGenration/genrateMolecules`, data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },

                    withCredentials: true

                }
            )
            dispatch(moleculeGenrationSuccess(response.data.data))
            toast.success('Molecule Genrated Successfully')
            

        } catch (error) {
            console.log("failed" + error);
            dispatch(moleculeGenrationFailure(error.data))
            toast.error('Molecule Genration Failed')
        }
    }
    return (
        <div className=' w-[50%]  relative'>
            <form onSubmit={handleSubmit(handleSubmitEvent)}
                className='bg-white  shadow-2xl border-t-4 m-5 flex rounded-xl p-4 flex-col gap-5 border-blue-500'>
                <div>
                    <h1 className='font-bold font-spaceGrotesk text-[20px] text-center'>GENERATE MOLECULE</h1>
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="smiles" className='font-roboto text-black '>SMILES String</label>
                    <input type="text"
                        id='smiles'
                        {...register("smiles", {
                            required: true
                        })}
                        className='font-roboto text-black  border border-black rounded-lg p-2 w-[90%] ' />
                         {errors.smiles?.type === "required" && (
                  <p role="alert" className='text-red-800  text-[12px]'> * It is a required filed</p>
                )}
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="noOfMolecules" className='font-roboto text-black '>Number of Molecules to generate</label>
                    <input type="number"
                        id='noOfMolecules'
                        {...register("noOfMolecules", {
                            required: true
                        })}
                        className='font-roboto text-black  border border-black rounded-lg p-2 w-[90%] ' />
                            {errors.noOfMolecules?.type === "required" && (
                  <p role="alert" className='text-red-800  text-[12px]'> * It is a required filed</p>
                )}
                        
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="propertyToOptimize" className='font-roboto text-black '>Property to Optimize</label>
                    <select id="propertyToOptimize" name="property" className='font-roboto text-black
                    border border-black rounded-lg p-2 w-[90%] '
                        {...register("propertyToOptimize", {
                            required: true
                        })}>
                        <option value="QED">QED</option>
                        <option value="plogP">plogP</option>
                    </select>
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="minSimilarity" className='font-roboto text-black '>Similarity</label>
                    <input type="text"
                        id='minSimilarity'
                        {...register("minSimilarity", {
                            required: true,
                            validate: {
                                range: value => (value >= 0 && value <= 1) || "Value must be between 0 and 1"
                            }
                        })}
                        className='font-roboto text-black  border border-black rounded-lg p-2 w-[90%] ' />
                            {errors.minSimilarity?.type === "required" && (
                  <p role="alert" className='text-red-800  text-[12px]'> * It is a required filed</p>
                  
                )}
                 {errors.minSimilarity?.type === "range" && (
                  <p role="alert" className='text-red-800  text-[12px]'> * Value must be between 0 and 1</p>
                  
                )}
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="noOfParticals" className='font-roboto text-black '>Particles</label>
                    <input type="number"
                        id='noOfParticals'
                        {...register("noOfParticals", {
                            required: true
                        })}
                        className='font-roboto text-black  border border-black rounded-lg p-2 w-[90%] ' />
                            {errors.noOfParticals?.type === "required" && (
                  <p role="alert" className='text-red-800  text-[12px]'> * It is a required filed</p>
                )}
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="noOfItrations" className='font-roboto text-black '>Iterations</label>
                    <input type="number"
                        id='noOfItrations'
                        {...register("noOfItrations", {
                            required: true
                        })}
                        className='font-roboto text-black  border border-black rounded-lg p-2 w-[90%] ' />
                            {errors.noOfItrations?.type === "required" && (
                  <p role="alert" className='text-red-800  text-[12px]'> * It is a required filed</p>
                )}
                </div>
                <button
                    type='submit'
                    disabled={loading}
                    className={`border rounded-lg px-4 py-2 w-[20vw]   font-staatliches mt-5 ml-20 text-[20px] ${loading ? "bg-gray-400" : "bg-blue-500"}`}>{loading ? (
                        <div className='flex  ml-24'>
                            <p className='pt-2 '>Generating...</p>
                            <LoaderCircle className='animate-spin mt-2' />
                        </div>
                    ) : (
                        <p className='pt-1 mr-4'>Generate</p>
                    )}</button>

                    <div>
                        <Link to='/molecule-genration-history'
              className='text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out text-center ml-44' >View History</Link>
                    </div>

            </form>
          

        </div>
    )
}

export default GenrateMoleculeForm

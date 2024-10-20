import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addMoleculeFailure, addMoleculeStart, addMoleculeSuccess } from '../../../redux/features/moleculeBank/addMolecule'
import { toast } from 'sonner'
import { LoaderCircle } from 'lucide-react'

function AddMolecule() {
    const { register,
        handleSubmit,
        formState: { errors }, reset } = useForm()
    const { loading,
        error,
        moleculeData,
        molecule,
         } = useSelector((state) => state.addMolecule)
    const dispatch = useDispatch()
    
    const handleSubmitEvent = async (data) => {
        try {
            dispatch(addMoleculeStart())
             const response = await axios.post("http://localhost:5000/api/v1/moleculeBanks/addMolecule", data, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true

            })
            console.log(response);
            if (response.data?.success) {
                console.log(response.data?.success);
                dispatch(addMoleculeSuccess(response?.data?.data))
                toast.success("Molecule added successfully")
                reset()

            }

        } catch (error) {
            console.log(error.response?.data?.data);
            dispatch(addMoleculeFailure(error?.response?.data?.data))
            toast.error(error.response?.data?.data)


        }
    }
    return (
       
            <div className='bg-white  fixed  w-[40%] ml-72 p-10 rounded-xl shadow-xl'>
            <h1 className='font-bold font-spaceGrotesk'>
                Add Molecule
            </h1>
            <form
                onSubmit={handleSubmit(handleSubmitEvent)}
                className='mt-5'>
                <div className='font-spaceGrotesk flex flex-col gap-2'>
                    <div className='flex flex-col'>
                        <label className='' htmlFor='moleculeName' >Molecule Name:</label>
                        <input type="text"
                            id='moleculeName'
                            {...register('moleculeName',
                                { required: true }

                            )}
                            className='border border-gray-400 rounded-md p-2 mt-2' />
                        {errors.moleculeName?.type === "required" && (
                            <p role="alert" className='text-red-500  text-[12px]'> * Molecule Name  is required</p>
                        )}
                    </div>
                    <div className='flex flex-col'>
                        <label className='' htmlFor='smileString'>Smile String:</label>
                        <input type="text"
                            id='smileString'
                            {...register('smileString',
                                { required: true }

                            )}
                            className='border border-gray-400 rounded-md p-2 mt-2' />
                        {errors.smileString?.type === "required" && (
                            <p role="alert" className='text-red-500  text-[12px]'> * Smile String  is required</p>
                        )}
                    </div>
                    <div className='flex flex-col'>
                        <label className='' htmlFor='molecularWeight'>Molecular Weights:</label>
                        <input type="text"
                            id='molecularWeight'
                            {...register('molecularWeight',
                                { required: true }

                            )}
                            className='border border-gray-400 rounded-md p-2 mt-2' />
                        {errors.molecularWeight?.type === "required" && (
                            <p role="alert" className='text-red-500  text-[12px]'> * Molecular Weights is required</p>
                        )}
                    </div>
                    <div className='flex flex-col'>
                        <label className='' htmlFor='useages'>Category Usage:</label>
                        <input type="text"
                            id='useages'
                            {...register('useages',
                                { required: true }

                            )}
                            className='border border-gray-400 rounded-md p-2 mt-2' />
                        {errors.useages?.type === "required" && (
                            <p role="alert" className='text-red-500  text-[12px]'> * Usage  is required</p>
                        )}
                    </div>
                    <button
                        disabled={loading}
                        className={`border ${loading ? `bg-gray-400` : `bg-blue-500`} rounded-md py-2 text-white`} type='submit'>{
                            loading ? (
                                <div className='flex justify-center items-center'>
                                    <p>Adding...</p>
                                    <LoaderCircle className='animate-spin' />
                                </div>
                            ) : 'Add'
                        }</button>

                </div>
            </form>

        </div>
        )
       

    
}

export default AddMolecule

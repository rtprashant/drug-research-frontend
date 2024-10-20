import React, { useEffect, useState } from 'react'
import MoleculeStructure from './MoleculeStructure';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Skelton from '../research/Skelton'
const apiUrl = import.meta.env.VITE_BACKEND_URL;

function MoleculeList() {
    const [moleculeList, setMoleculeList] = useState([])
    const { loading,
        error,
        moleculeData,
        molecule,
    } = useSelector((state) => state.addMolecule)
    const { searchloading,
        searcherror,
        element,
        search } = useSelector(state => state.searchMolecule)

    useEffect(() => {
        const fetchMolecule = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/v1/moleculeBanks/getMolecule`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                });

                console.log(response);
                const newMolecules = response?.data?.data.map((item) => item);
                console.log(newMolecules);

                setMoleculeList(newMolecules);
            } catch (error) {
                console.log(error);
            }
        };
        console.log("molecule list " + moleculeList);


        fetchMolecule();
    }, [moleculeData]);


    return (
        <div>
            {/* <button onClick={addMolecule}>ghhfgfghgf</button> */}
            <div className='flex w-full  '>
                <div className='font-bold uppercase  w-[25%] '>
                    <h1 className='text-center'>Molecule name</h1>
                </div>
                <div className='font-bold uppercase  w-[25%] '>
                    <h1 className='text-center'>Smile Structure Image</h1>
                </div>
                <div className='font-bold uppercase   w-[25%] '>
                    <h1 className='text-center'>Molecular Weights (g/mol)</h1>
                </div>
                <div className='font-bold uppercase   w-[25%]'>
                    <h1 className='text-center'>Category Usage</h1>
                </div>


            </div>
            {
                searchloading ?
                    <div className='mt-5 ml-16 w-full'>
                        <Skelton />
                    </div> :
                    search ? (
                        <div className='flex w-full  mt-5 '>
                            <div className='font-bold uppercase flex justify-center items-center text-slate-500  w-[25%] '>
                                <p className=''>{element?.moleculeName}</p>
                            </div>
                            <div className='font-bold uppercase flex justify-center  w-[25%] '>
                                <MoleculeStructure
                                    className=''
                                    id={element?._id}
                                    structure={element?.smileString}
                                />
                                {/* <p className='text-center'>{item.smileString}</p>  */}
                            </div>
                            <div className='font-bold uppercase text-slate-500 flex justify-center items-center w-[25%] '>
                                <p className=''>{element?.molecularWeight}</p>
                            </div>
                            <div className='font-bold uppercase  text-slate-500 flex justify-center items-center  w-[25%]'>
                                <p className='flex gap-2'> {element?.useages?.map((usage, idx) => (
                                    <span key={idx}>{usage}</span>
                                ))}</p>
                            </div>


                        </div>
                    ) : (
                        <div>
                            {moleculeList.map((item) => (
                                <div key={item._id}>
                                    <div className='flex w-full  mt-5 '>
                                        <div className='font-bold uppercase flex justify-center items-center text-slate-500  w-[25%] '>
                                            <p className=''>{item.moleculeName}</p>
                                        </div>
                                        <div className='font-bold uppercase flex justify-center  w-[25%] '>
                                            <MoleculeStructure
                                                className=''
                                                id={item._id}
                                                structure={item.smileString}
                                            />
                                            {/* <p className='text-center'>{item.smileString}</p>  */}
                                        </div>
                                        <div className='font-bold uppercase text-slate-500 flex justify-center items-center w-[25%] '>
                                            <p className=''>{item.molecularWeight}</p>
                                        </div>
                                        <div className='font-bold uppercase  text-slate-500 flex justify-center items-center  w-[25%]'>
                                            <p className='flex gap-2'> {item?.useages?.map((usage, idx) => (
                                                <span key={idx}>{usage}</span>
                                            ))}</p>
                                        </div>


                                    </div>

                                </div>

                            ))}

                        </div>
                    )
            }



        </div>
    )
}

export default MoleculeList

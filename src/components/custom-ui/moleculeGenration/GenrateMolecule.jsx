import React from 'react'
import GenrateMoleculeForm from './GenrateMoleculeForm'
import GenrateMoleculeOutput from './GenrateMoleculeOutput'
import Skelton from './Skelton'

function GenrateMolecule() {
  return (
    <div className='flex '>
      <GenrateMoleculeForm />
     
      <GenrateMoleculeOutput />
    </div>
  )
}

export default GenrateMolecule

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { show, update } from "../services/petService"

// Components
import PetForm from "../components/PetForm"

const PetUpdate = ({ fetchPets }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    breed: ''
  })

  // ! Location variables
  const navigate = useNavigate()
  const { petId } = useParams()
  console.log(petId)


  // ! On Component Render
  useEffect(() => {
    const fetchPet = async () => {
      try {
        const { data } = await show(petId)
        setFormData(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPet()
  }, [petId])


  // ! Event Handlers 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await update(petId, formData)
      fetchPets()
      navigate(`/pets/${petId}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1>Edit Pet</h1>
      <PetForm 
        handleChange={handleChange} 
        handleSubmit={handleSubmit} 
        formData={formData}
      />
    </>
  )
}

export default PetUpdate

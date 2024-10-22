import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { show, remove } from '../services/petService'

const PetDetail = ({ fetchPets }) => {
  const [pet, setPet] = useState(null)

  // ! Location variables
  const { petId } = useParams()
  const navigate = useNavigate()


  const removePet = async (event) => {
    event.preventDefault()
    try {
      await remove(petId)
      await fetchPets()
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchPet = async () => {
      try {
        // Call our service "show" function
        const { data } = await show(petId)
        setPet(data)
      } catch (error) {
        console.log(error)
        // Set error state
      }
    }
    fetchPet()
  }, [petId])

  return (
    <>
      { pet &&
        <section>
          <h1>{pet.name}</h1>
          <h3>Breed: {pet.breed}</h3>
          <h3>Age: {pet.age} year{pet.age > 1 || pet.age === 0 ? 's' : ''}</h3>
          <Link to={`/pets/${pet._id}/edit`}>Edit {pet.name}</Link>
          <button onClick={removePet}>
            Delete {pet.name}
          </button>
        </section>
      }
    </>
  )
}

export default PetDetail

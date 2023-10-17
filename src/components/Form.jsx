import { useState, useEffect } from "react"
import typesDB from '../database/types.js'
import locationsDB from '../database/locations.js'



export function Form({ handleData }) {
  const initData = {
    image: "",
    typeEvent: "",
    cityEvent: "",
    title: "",
    subtitle: "",
    meetingPlace: "",
    date: "",
    hour: ""
  }

  const [data, setData] = useState(initData)


  const [types, setTypes] = useState(null)
  const [locations, setLocations] = useState(null)

  useEffect(() => {
    setTypes(typesDB)
    setLocations(locationsDB)
  }, [])

  const handleChange = (e) => {
    const name = e.target.name;

    setData((prevData) => ({
      ...prevData,
      [name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(data)
    handleData(data)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setData((prevData) => ({
      ...prevData,
      image: URL.createObjectURL(file)
    }))
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Titulo del Evento:
          <input name="title" type='text' onChange={handleChange} required />
        </label>
        <label>
          Titulo secundario:
          <input name="subtitle" type='text' onChange={handleChange} required />
        </label>
        <label>
          Tipo de evento:
          <select name="typeEvent" onChange={handleChange} required>
            {types && types.map(type => {
              return (
                <option key={type.id} value={type.id}>{type.name}</option>
              )
            })}
          </select>
        </label>
        <label>
          Departamento o Ciudad:
          <select name="cityEvent" onChange={handleChange} required>
            {locations && locations.map(location => {
              return (
                <option key={location.id} value={location.id}>{location.name}</option>
              )
            })}
          </select>
        </label>
        <label>
          Lugar de encuentro:
          <input name="meetingPlace" type='text' onChange={handleChange} required />
        </label>

        <label>
          Fecha:
          <input name="date" type='date' onChange={handleChange} required />
        </label>

        <label>
          Hora de Encuentro:
          <input name="hour" type='time' onChange={handleChange} required />
        </label>

        <label>
          Imagen de fondo:
          <input name="image" type="file" accept="image/*" onChange={handleImageChange} required />
        </label>

        <button type="submit">Generar</button>
      </form>
    </>
  )
}
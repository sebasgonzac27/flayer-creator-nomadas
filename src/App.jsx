import { useState } from 'react'
import './App.css'
import { Banner } from './components/Banner'
import { Form } from './components/Form'

const defaultData = {
  image: "https://cdn.shopify.com/s/files/1/0608/7819/2888/files/kawasaki-ninja-2023.jpg?v=1674124860",
  typeEvent: 1,
  cityEvent: 1,
  title: "Titulo Primario",
  subtitle: "Titulo Secundario",
  meetingPlace: "Lugar de encuentro",
  date: "2023-10-19",
  hour: "19:00"
}

function App() {
  const [data, setData] = useState(defaultData)

  const handleData = (formData) => {
    setData(formData)
  }

  return (
    <>
      <header className='header'>
        <h1>Creador de Flayers</h1>
        <p>Llene los campos del formulario y de click en generar, a continuación podrá ver el flayer y descargarlo.</p>
      </header>
      <main className='main'>
        <Form handleData={handleData} />
        <Banner
          image={data.image}
          typeEvent={data.typeEvent}
          cityEvent={data.cityEvent}
          title={data.title}
          subtitle={data.subtitle}
          meetingPlace={data.meetingPlace}
          date={data.date}
          hour={data.hour}
        />
      </main>
      <footer className='footer'>
        <p>By Teven y Sebasgonzac</p>
      </footer>
    </>

  )


}

export default App

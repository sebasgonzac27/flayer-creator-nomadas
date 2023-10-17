import { useState } from 'react'
import './App.css'
import { Banner } from './components/Banner'
import { Form } from './components/Form'
import { useRef } from 'react'
import { toJpeg } from 'html-to-image'

const defaultData = {
  image: "https://img.freepik.com/foto-gratis/hombre-vista-lateral-motocicleta_23-2150868420.jpg?size=626&ext=jpg&ga=GA1.1.534568101.1691172338&semt=sph",
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

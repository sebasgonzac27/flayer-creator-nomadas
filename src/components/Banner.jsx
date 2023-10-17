import logo from '../assets/icons/logo.svg'
import html2canvas from 'html2canvas';
import colFlag from '../assets/flags/colombia_flag.jpg'
import map from '../assets/icons/map.svg'
import watch from '../assets/icons/watch.svg'
import whatsapp from '../assets/icons/whatsapp.svg'
import typesBD from '../database/types.json'
import locationsBD from '../database/locations.json'
import React, { useState, useEffect } from 'react';
export function Banner({ image, typeEvent, cityEvent, title, subtitle, meetingPlace, date, hour }) {

    const type = typesBD.find(type => type.id === parseInt(typeEvent)) ?? typesBD.at(0)
    const city = locationsBD.find(location => location.id === parseInt(cityEvent)) ?? locationsBD.at(0)

    const upperTitle = title.toUpperCase()
    const upperSubtitle = subtitle.toUpperCase()

    const eventDate = new Date(date + 'T' + hour);

    const formattedHour = eventDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    // Obtener el nombre del día de la semana
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const dayOfWeek = (daysOfWeek[eventDate.getDay()] || 'Día').toUpperCase();

    // Obtener el número del día del mes
    const dayOfMonth = eventDate.getDate();

    // Obtener el nombre del mes
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const month = (months[eventDate.getMonth()] || 'Mes').toUpperCase();

    const [backgroundImage, setBackgroundImage] = useState(null);

    useEffect(() => {
        // Descargar la imagen de fondo y almacenarla en el estado local
        const downloadBackgroundImage = async () => {
            try {
                const response = await fetch(image);
                if (response.ok) {
                    const blob = await response.blob();
                    const objectURL = URL.createObjectURL(blob);
                    setBackgroundImage(objectURL);
                }
            } catch (error) {
                console.error('Error al descargar la imagen de fondo:', error);
            }
        };

        downloadBackgroundImage();
    }, [image]);

    const handleDownload = () => {
        const bannerElement = document.getElementById('banner');

        const options = {
            scale: 5,
            useCORS: true,
            logging: true,
        };

        html2canvas(bannerElement, options)
            .then((canvas) => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png', 1.0);
                link.download = 'flayer-nomadas.png';
                link.click();
            })
            .catch((error) => {
                console.error('Error al generar la imagen:', error);
            });
    };


    return (
        <div className='container'>
            <button className='download-button' onClick={handleDownload}>Descargar</button>
            <section id='banner' className="banner-box">

                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    
                }}/>
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#000000a5',
                    
                }}></div>

                <img src={`/src/assets/backgrounds/${type.background}`} alt={type.background} className='paper' />
                <img src={logo} className='logo' />
                <h2 className='title-club'>NÓMADAS URBANOS</h2>
                <div className='flags'>
                    <img src={colFlag} className='country' />
                    <img src={`/src/assets/flags/${city.flag}`} alt={city.flag} className='country' />
                </div>
                <div className='tags'>
                    <div className='tag tag-left'>
                        {type?.name.toUpperCase()}
                    </div>
                    <div className='tag tag-right'>
                        {city?.name.toUpperCase()}
                    </div>
                </div>
                <div className='center-title'>
                    <div className='primary-title'>
                        <h1 className='title'>
                            {upperTitle}
                        </h1>
                    </div>
                    <div className='secondary-title'>
                        <h3 className='subtitle'>
                            {upperSubtitle}
                        </h3>
                    </div>
                </div>
                <div className='info-event'>
                    <div className='place'>
                        <img src={map} className='map-icon' />
                        <div>
                            <h3>LUGAR DE ENCUENTRO</h3>
                            <p>{meetingPlace}</p>
                        </div>
                    </div>
                    <div className='time'>
                        <img src={watch} className='watch-icon' />
                        <div>
                            <h3>HORA DE ENCUENTRO</h3>
                            <p>{formattedHour}</p>
                        </div>
                    </div>
                </div>
                <div className='confirm'>
                    <img src={whatsapp} className='whatsapp-icon' />
                    <p>CONFIRMAR ASISTENCIA</p>
                </div>
                <div className='date-info'>
                    <h3>{dayOfWeek}</h3>
                    <h1>{dayOfMonth}</h1>
                    <h3>{month}</h3>
                </div>
            </section>
            
        </div>

    )
}
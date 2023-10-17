import logo from '/src/assets/icons/logo.svg'
import html2canvas from 'html2canvas';
import colFlag from '/src/assets/flags/colombia_flag.jpg'
import map from '/src/assets/icons/map.svg'
import watch from '/src/assets/icons/watch.svg'
import whatsapp from '/src/assets/icons/whatsapp.svg'
import typesBD from '/src/database/types.json'
import locationsBD from '/src/database/locations.json'

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
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',

                }} />
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#000000c3',

                }}></div>

                <img src={`../assets/backgrounds/${type.background}`} alt={type.background} className='paper' />
                <img src={logo} className='logo' />
                <h2 className='title-club'>NÓMADAS URBANOS</h2>
                <div className='flags'>
                    <img src={colFlag} className='country' />
                    <img src={`../assets/flags/${city.flag}`} alt={city.flag} className='country' />
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
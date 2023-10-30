import imagen from '../../public/img/nosotros.jpg'
import styles from '~/styles/nosotros.css'

export function meta() {
    return [
        {title: 'GuitarLA - Sobre Nosotros'},
        {description: 'Venta de guitarras, blog de música'}
    ]
}

export function links() {
    return [
        {
            rel: 'stylesheet',
            href: styles
        },
        {
            rel: 'preload',
            href: imagen,
            as: 'image'
        }
    ]    
}

const nosotros = () => {

    return (
        <main className="contenedor nosotros">
            <h2 className="heading">Nosotros</h2>
            <div className="contenido">
                <img src={imagen} alt="imagen sobre nosotros"/>

                <div>
                    <p>Ut a feugiat dolor. Proin ultrices massa nibh, vel commodo tellus iaculis vitae. Duis iaculis tincidunt enim non tempus. Nullam mi elit, lobortis sed nibh nec, tincidunt accumsan nisi. Vivamus dapibus vestibulum dolor quis maximus. Cras luctus risus sit amet aliquam dignissim. Nam tincidunt tellus leo. Mauris tortor diam, tristique nec vestibulum ac, molestie at urna. Mauris at fermentum massa.</p>
                </div>
            </div>
        </main>
    )
}

export default nosotros
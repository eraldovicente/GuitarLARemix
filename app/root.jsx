import { useState, useEffect } from 'react'
import {
    Meta,
    Links,
    Outlet,
    Scripts,
    LiveReload,
    useRouteError,
    isRouteErrorResponse,
    Link
} from '@remix-run/react'
import styles from '~/styles/index.css'
import Header from '~/components/header'
import Footer from '~/components/footer'

export function meta() {
    return (
        [
            {charset: 'utf-8'},
            {title: 'GuitarLA - Remix'},
            {viewport: 'width=device-width,initial-scale=1'}
        ]
    )
}

export function links() {
    return [
        {
            rel: 'stylesheet',
            href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
        },        
        {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com'
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossOrigin: "true"
        },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap'
        },
        {
            rel: 'stylesheet',
            href: styles
        }
    ]
}

export default function App() {

    const carritoLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? [] : null
    const [carrito, setCarrito] = useState(carritoLS)

    // UseEffect para grabar en el LS
    useEffect(() => {
        if (carrito?.length === 0) return;
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);
    
    // useEffect para cargar el state con info del LS
    useEffect(() => {
        const carritoLS = JSON.parse(localStorage.getItem('carrito')) ?? [];
        setCarrito(carritoLS);
    }, []);

    const agregandoCarrito = guitarra => {
        if(carrito.some(guitarraState =>  guitarraState.id === guitarra.id)) {
            // Iterar sobre el arreglo, e identicar el elemento duplicado
            const carritoActualizado = carrito.map( guitarraState => {
                // Reescribir la catidadd
                guitarraState.catidad = guitarra.catidad
                return guitarraState
            })
            // Añadir al carrito
            setCarrito(carritoActualizado) 
        } else {
            // Registro nuevo, agregar al carrito
            setCarrito([...carrito, guitarra])
        }
    }

    const actualizarCantidad = guitarra => {
        const carritoActualizado = carrito.map(guitarraState => {
            if(guitarraState.id === guitarra.id) {
                guitarraState.cantidad = guitarra.cantidad
            }
            return guitarraState
        })
        setCarrito(carritoActualizado)
    }

    const eliminarGuitarra = (id) => {
        const carritoActualizado = carrito.filter((guitarraState) => guitarraState.id !== id);
        carritoActualizado.length === 0 && localStorage.setItem('carrito', '[]');
        setCarrito(carritoActualizado);
    };

    return (
        <Document>
           <Outlet 
                context={{
                    agregandoCarrito,
                    carrito,
                    actualizarCantidad,
                    eliminarGuitarra
                }}
           />
        </Document>
    )
}

function Document({children}) {
    return (
        <html lang="es">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <Header />
                {children}
                <Footer />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}

/** Manejo de errores */ 
export function ErrorBoundary() {
    const error = useRouteError();
  
    if (isRouteErrorResponse(error)) {
      return (
        <Document>
          <p className='error'>{error.status} {error.statusText}</p>
          <Link className='error-enlace' to='/'>Tal vez quieras volvera a la página principal</Link>
        </Document>
      );
    } else if (error instanceof Error) {
      return (
        <Document>
          <p className='error'>{error.status} {error.statusText}</p>
          <Link className='error-enlace' to='/'>Tal vez quieras volvera a la página principal</Link>
        </Document>
      );
    } else {
      return (
        <Document>
            <p>Erro desconhecido</p>
            <Link className='error-enlace' to='/'>Tal vez quieras volvera a la página principal</Link>
        </Document>
      )
    }
}
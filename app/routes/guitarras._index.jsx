import { useLoaderData } from '@remix-run/react';
import ListadoGuitarras from '~/components/listado-guitarras'
import { getGuitarras } from '~/models/guitarras.server'

export function meta() {
    return [
        {title: 'GuitarLA - Tienda de Guitarras'},
        {description: 'GuitarLA - Nuestra colección de guitarras'}
    ]
}

export async function loader() {
    const guitarras = await getGuitarras()
    return guitarras.data;
}

const Tienda = () => {

    const guitarras = useLoaderData()

    return (       
        <ListadoGuitarras
            guitarras={guitarras}
        /> 
    )
}

export default Tienda
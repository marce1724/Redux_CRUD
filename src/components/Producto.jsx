
import {Link, useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'

//Redux
import {useDispatch} from 'react-redux'
import { borrarProductoAction, obtenerProductoEditar } from '../actions/productoActions'

const Producto = ({producto}) => {
  
  const {nombre, precio, id} = producto

  const dispatch = useDispatch()
  const navigate = useNavigate()

  //Confirmar si desea eliminarlo
  const confirmarElimnarProducto = id =>{

     Swal.fire({
        title: 'Estas seguro?',
        text: "un producto eliminado no se puede recuperar",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'Cancelar'

      }).then((result) => {
        if (result.isConfirmed) {
         dispatch(borrarProductoAction(id))  
        }
      })
    }

    const redireccionarEdicion = producto => {
      dispatch(obtenerProductoEditar(producto))
      navigate(`/productos/editar/${producto.id}`)
   }


  return (
        <tr>
             <td>{nombre}</td>
             <td><span className="font-weight-bold"></span>$ {precio}</td>
             <td className="acciones">
                 <button 
                     type='button'
                     onClick={() => redireccionarEdicion(producto)}
                     className="btn btn-primary mr-2"
                 >Editar</button>

                 <button
                     type='button'
                     className='btn btn-danger'
                     onClick={() => confirmarElimnarProducto(id)}
                 >Eliminar</button>
             </td>
        </tr>
  )
}

export default Producto
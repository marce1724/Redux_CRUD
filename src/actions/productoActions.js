
import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR, 
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR, 
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR,
    COMENZAR_EDICION_PRODUCTO
    
} from '../types'
import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'
import { type } from '@testing-library/user-event/dist/type'


//Crear nuevos productos
export function CrearNuevoProductoAction (producto){

    return async (dispatch) =>{
         dispatch(agregarProducto())

         try {
             //Add en la API
             await clienteAxios.post('/productos', producto)

             //Update the state
             dispatch (agregarProductoExito(producto))

             //Add alert
             Swal.fire(
                 'Correcto',
                 'El producto se agrego correctamente',
                 'success'
             )

         } catch (error) {
              console.log(error)

              //Change state
             dispatch(agregarProductoError(true))

             //Add alert
             Swal.fire({
               icon: 'error',
               title: 'error',
               text: 'Hubo un error , intenta de nuevo'
             })
         }
    }
}

const agregarProducto = () => ({
     type: AGREGAR_PRODUCTO,
     payload: true
})

//Si el producto de guarda en la base de datos
const agregarProductoExito = (producto) =>({
     type: AGREGAR_PRODUCTO_EXITO,
     payload: producto
})

//Si hubo un error
const agregarProductoError = (estado) =>({
     type: AGREGAR_PRODUCTO_ERROR,
     payload: estado
})

//Función que descarga los productos de la base de datos
export function obtenerProductosAction(){
     
    return async (dispatch) =>{
         dispatch(descargarProductos())

         try {
            const respuesta = await clienteAxios.get('/productos')
            dispatch(descargaProductosExitoso(respuesta.data))
         } catch (error) {
               dispatch(descargaProductosError())
         }
    } 
}

const descargarProductos = () => ({
      type: COMENZAR_DESCARGA_PRODUCTOS,
      payload: true
})

const descargaProductosExitoso = (productos) =>({
      type: DESCARGA_PRODUCTOS_EXITO,
      payload: productos
})

const descargaProductosError = () =>({
      type: DESCARGA_PRODUCTOS_ERROR,
      payload: true
})

//Selecciona y elimina el producto
export function borrarProductoAction(id){
     return async (dispatch) =>{
         dispatch(obtenerProductoEliminar(id))

         try {
              await clienteAxios.delete(`/productos/${id}`)
              dispatch(eliminarProductoExito())

              //Si se elimina , mostrar alerta
              Swal.fire(
                'Eliminado!',
                'El producto ha sido eliminado',
                'success'
              )
              
         } catch (error) {
             console.log(error)
             dispatch(eliminarProductoError())
         }
     }
}

const obtenerProductoEliminar = id => ({
     type: OBTENER_PRODUCTO_ELIMINAR,
     payload: id
})

const eliminarProductoExito = () =>({
    type: PRODUCTO_ELIMINADO_EXITO
})
    
const eliminarProductoError = () =>({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})
    

export function obtenerProductoEditar(producto){
    return (dispatch) =>{
         dispatch(obtenerProductoAction(producto))
    }
}

const obtenerProductoAction = producto => ({
     type: OBTENER_PRODUCTO_EDITAR,
     payload: producto
})


//Edita un registro en la API y state
export function editarProductoAction(producto) {
     return async (dispatch) =>{
         dispatch(editarProducto())

         try {
             await clienteAxios.put(`/productos/${producto.id}`, producto)
             dispatch(editarProductoExito(producto)) 
      

         } catch (error) {
            
         }
     }
}

const editarProducto = () =>({
     type: COMENZAR_EDICION_PRODUCTO
})

const editarProductoExito = producto =>({
     type: PRODUCTO_EDITADO_EXITO,
     payload: producto
})
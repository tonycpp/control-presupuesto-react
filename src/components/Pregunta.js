import React, {Fragment, useState} from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

const Pregunta = ( { guardarPresupuesto, guardarRestante, actualizarPregunta }) =>  {

    //Definir el State
    const [ cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);

    //funcion guardar cantidad
    const definirPresupuesto = e => {
        guardarCantidad(parseInt(e.target.value))
    }

    //submit para definir el presuspuesto
    const agregarPresupuesto = e => {
        e.preventDefault();

        //validar 
        if(cantidad < 1 || isNaN(cantidad)){
            guardarError(true);
            return;
        }

        //si pasa validación
        guardarError(false);
        guardarPresupuesto(cantidad);
        guardarRestante(cantidad);
        actualizarPregunta(false);
    }

    return (  
        <Fragment>
            <h2>Coloca tu presupuesto</h2>
                { error ? <Error mensaje= 'El presupuesto no puede estar vacío, ser 0 o menor a 0.'/> : null}
                <form
                    onSubmit={agregarPresupuesto}
                >
                        
                    <input
                        type='number'
                        className='u-full-width'
                        onChange={definirPresupuesto}
                    />
                    <input
                        type='submit'
                        className='button-primary u-full-width'
                        value='Definir Presupuesto'
                    />    
                </form>            
        </Fragment>
    );
}

Pregunta.propType = {
    guardarPresupuesto: PropTypes.func.isRequired,
    guardarRestante: PropTypes.func.isRequired,
    actualizarPregunta: PropTypes.func.isRequired
}
 
 
export default Pregunta;

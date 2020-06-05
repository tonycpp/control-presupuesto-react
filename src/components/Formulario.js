import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Error from './Error';


const Formulario = ( { guardarGasto, guardarCrearGasto } ) => {
    
    const [ nombre, guardarNombre] = useState('');
    const [ cantidad, guardarCantidad] = useState(0);
    const [ error, guardarError] = useState(false);

    
    //Cuando el usuario agrega un gasto
    const agregarGasto = e => {
        e.preventDefault();

        //validacion

        if(cantidad < 1 || isNaN( cantidad ) || nombre.trim() === ''){
            guardarError(true);
            return;
        }

        guardarError(false);
        
        //Construir gasto

        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate() 
        }

        
        //Pasar el gasto al componente principal
        guardarGasto(gasto);
        guardarCrearGasto(true);

        //Resetear form
        guardarNombre('');
        guardarCantidad(0);
    }
    
    return ( 

        <form
            onSubmit = {agregarGasto}
        >
            <h2>Agrega los gastos aquí</h2>

            { error ? <Error mensaje = 'Ambos campos son obligatorios' /> : null }
                <div className='campo'>
                    <label>Nombre</label>
                    <input
                        type='text'
                        className='u-full-width'
                        placeholder='Ej. Alquiler'
                        value={nombre}
                        onChange = {e => guardarNombre(e.target.value)}
                    />
                </div>

                <div className='campo'>
                    <label>Cantidad</label>
                    <input
                        type='number'
                        className='u-full-width'
                        placeholder='Ej. 300'
                        value={cantidad}
                        onChange = {e => guardarCantidad(parseInt(e.target.value))}
                    />
                </div>

                <input
                    type='submit'
                    className='button-primary u-full-width'
                    value='Agregar gasto'
                />
        </form>

    );
}

Formulario.propType = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired

}
 
export default Formulario;
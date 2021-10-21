import React from 'react';
import "./App.js"
import './Pallete.css'
//Arreglo de colores que el usuario podrá seleccionar
const colors = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4","#009688", "#4caf50", "#8bc34a", "#cddc39", "#ff9800", "#ff5722", "#795548", "#607d8b","#ffffff","#000000"];

function Pallete(props) {

    const handleClick = (event) => {
        props.setSelectedColor(event.target.name);
    }


    return (

        <ul style={{display: 'flex', listStyle: 'none' }}>

            {/* función para seleccionar el color en la paleta*/}
            {colors.map((color) => {//Me generara un arreglo de colores 
                const isSelected = color === props.selectedColor;
                const borderStyle = isSelected ? '3px groove #000000' : '1px solid black';
                return (

                    <div key={color}>

                        <div id="pallete" key={color}>
                            <button
                                className="colorsbtn"
                                type="button"
                                key={color}
                                name={color}
                                onClick={handleClick}
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    border: borderStyle,  // a border solo le paso borderstyle  
                                    background: color,
                                }}>
                            </button>

                        </div>
                    </div>
                )

            })}
        </ul>
    );


}

export default Pallete;
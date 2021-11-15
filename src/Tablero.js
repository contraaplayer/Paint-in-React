import React, { useState } from 'react';
import "./App.js";
import './Tablero.css';
import demo from "./deadpool.png"

function Tablero(props) {
    
    const [pressed, setPressed] = useState(false); //Estado para saber cuando esta presionado

    //Pinta cada cuadro cada que se haga click
    function paintClick(event) {
        //Cambia el estado a "filled" para identificar que hay un dibujo en el tablero
        props.setDraw('filled');
        //Cambia el color del pixel al color seleccionado
        props.setSgrid(
            props.sgrid.map( //Genera un nuevo arreglo para pintar el tablero con el color seleccionado
                (pixel) => {
                    if (pixel.id === Number(event.target.name))
                        pixel.pxcolor = props.selectedColor;
                    return pixel;
                }
            )
        );
    }
    
    //Pinta al seleccionr el color y mantener el click izquierdo 
    function startPainting(event) {
        setPressed(true);
        paintClick(event);
    }

    //Funcion para que se siga pintando al movel el mouse
    function paintPressed(event) {
        if (!pressed) return
        paintClick(event);
    }


    //Deja de pintar al soltar el click
    function stopPaint() {
        setPressed(false);
    }

    return (
        <div id="container">
            <div id="workspace" ref={props.captImg}>
                <div id="pixels"
                    //Se manda a llamar paintIndex al dar click
                    onClick={paintClick}
                    onMouseDown={startPainting}
                    onMouseUp={stopPaint}
                >
                    {props.sgrid.map(
                        (pixel) => {
                            return (
                                <button
                                    name={pixel.id}
                                    key={pixel.id}
                                    onMouseOver={paintPressed}
                                    disabled={props.unclick}
                                    style={{
                                        width: pixel.width,
                                        height: pixel.height,
                                        border: props.borders === true ? '1px groove #565859' : '0',
                                        backgroundColor: pixel.pxcolor,
                                        margin: '0px',
                                        padding: '0px'
                                    }}
                                ></button>
                            )
                        }
                    )}
                </div>
            </div>

            <div id="Printimg">
                <div ref={props.pic}>
                    <p id="intruction">Select a color and start painting!</p>
                    <img id="img" alt="demo" src={demo}></img>

                </div>
            </div>
        </div>
    );

}

export default Tablero;
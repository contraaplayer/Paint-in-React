import React, {useState,useEffect} from 'react';
import "./App.js"
import './Pallete.css'
import axios from 'axios';
import { //Importe las contantes que diran al state en que parte de mi pagina me encuentro ahora (idle,loading,error,complete)
    IDLE_STATUS,
    LOADING_STATUS,
    COMPLETE_STATUS,
    ERROR_STATUS,
} from './Estados/constantes'
function Pallete(props) {
    
    const [status,setStatus] = useState(IDLE_STATUS);//Estado para saber cuando el componente sepa renderear los colores 
    const [color,setColor] = useState([]);//state para guardar los colores.

    const getpallete = async () => {
        //Lamando a la api con 10 valores aleatorios
        axios.get('https://www.colr.org/json/colors/random/10').then(response =>{
            setStatus(LOADING_STATUS); //Estado cargando
            console.log(response);
            const getColors=[];//Arreglo para guardar el valor de los numeros obtenidos de la api
            for(let i=0; i<10;i++){
                getColors.push('#' + response.data.colors[i].hex);// se agrega el # para el valor hexadecimal
            }
            setColor(getColors);
            setStatus(COMPLETE_STATUS);
        })
        .catch(() =>{
            alert("No se pudo cargar la paleta de colores")
            setStatus(ERROR_STATUS);
        })
    }
    const handleClick = (event) => {
        props.setSelectedColor(event.target.name);
    }
    //utilize use effect para que se mande a llamar la función que pedira la api de colores
    useEffect(()=>{
        console.log("Corriendo el efecto", status);//Para saber si me estaba mi hook state
        getpallete();
    },[]);//Solo se va a llamar cada vez que se entre o actualize la pagina 

    //Mensajes de Cargando, error y listo 

    //Ventana de loading 
    if (status === LOADING_STATUS || status === IDLE_STATUS){
        return <div className="Loader">
            <p>Cargando Paleta de colores</p>
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                </div>;
        </div>
    }
    //Mensaje por si no carga la paleta de colores
    if(status === ERROR_STATUS){
        return <div>
            <h1> Error! No se pudo cargar la paleta de colores </h1>
            <h2> Vuelva a cargar la pagina</h2>
            </div>;
    }

    if(status === COMPLETE_STATUS){
        
        return (
            <div>
            <ul style={{display: 'flex', listStyle: 'none' }}>
                {/* función para seleccionar el color en la paleta*/}
                {color.map((color) => {//Me generara un arreglo de colores 
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
            </div>
        );
    }
}

export default Pallete;
import React, {useState, useRef} from 'react';
import './App.css';
import Pallete from './Pallete.js';
import Tablero from './Tablero.js'
import html2canvas from 'html2canvas';


function App() {
  let grid = [];//Arreglo donde se genera la cuadricula
  const [sgrid, setSgrid] = useState(grid);//Estado actual de la cuadricula
  const [borders, setBorders] = useState(true);//Cuando se manda a imprimir quitara los bordes del tablero
  const [selectedColor, setSelectedColor] = useState('#FFFFFF'); //Color seleccionado de la paleta
  const [draw, setDraw] = useState('empty'); //Se cambia a 'filled' cuando el usuario pinta 
  const [unclick, setUnclick] = useState(false);// Estado que se activara cuando se mande a immprimir y no dejara pintar hasta resetar el juego

  const pic = useRef();
  const captImg = useRef(); 

  //primero se creo un for para generar un tablero de 10x10
  for (let i = 1; i <= 100; i++) {

    grid.push({ id: i, pxcolor: '#FFFF', height: '40px', width: '40px' });//la función push agregara una cuadricula al tablero

  }

   //Función para generar un tablero nuevo
   function resetGame() {
    setSgrid(grid); //Devuelve el grid al estado inicial
    setDraw('empty');//Pone el estado del dibujo en vacio
    setBorders(true);//Los bordes se vuelven a colocar
    setUnclick(false); //Se puede volver a pintar en el tablero
  }

  //Función para imprimir el dibujo
  function printDraw() {
    
    if (draw === 'filled') {//Si existe un dibujo se mandara la función imprimir

      setBorders(false);
      setUnclick(true);//Ya no se puede dibujar en el tablero
      setTimeout(() => { //Función para mandar a llamar lo que esta dibujado en el dibujo e imprimirlo
        html2canvas(captImg.current).then(canvas => {
          pic.current.innerHTML = "";
          pic.current.appendChild(canvas);
        });
      }, 10)
    }
  }


  return (
    
    <div className="App">

      <div className="header">
        <h1>Choose a color to start painting </h1>
        <button className="btn" id="newbtn" type="reset"  onClick={resetGame}> <span>New game</span> </button>
        <button className="btn" id="printbtn" type="button" onClick={printDraw}><span> Print</span> </button>
        

        {/* Componente que contiene la paleta de colores */}
        <Pallete
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          pic={pic}
        />
      </div>

      {/* Componente que tiene el tablero de dibujo y la imagen de impresión  */}
      <Tablero
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        draw={draw}
        setDraw={setDraw}
        sgrid={sgrid}
        setSgrid={setSgrid}
        pic={pic}
        captImg={captImg}
        borders={borders}
        setBorders={setBorders}
        unclick={unclick}
        setUnclick={setUnclick} />

    </div>
  );
}

export default App;

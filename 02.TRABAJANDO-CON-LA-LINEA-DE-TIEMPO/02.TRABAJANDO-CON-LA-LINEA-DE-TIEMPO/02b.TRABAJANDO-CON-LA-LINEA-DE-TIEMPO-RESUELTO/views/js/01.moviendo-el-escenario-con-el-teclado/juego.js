/*=============================================
METODOS DEL OBJETO JUEGO
=============================================*/

var juego = {

	teclado: function(){

		/*=============================================
		EVENTOS TECLADO
		=============================================*/

		document.addEventListener("keydown", juego.oprimir)
		document.addEventListener("keyup", juego.soltar)

	},

	oprimir: function(tecla){

		/*=============================================
		OPRIMIR TECLADO
		=============================================*/
		tecla.preventDefault();
		if(tecla.keyCode == 37){datos.izquierda = true;}
		if(tecla.keyCode == 39){datos.derecha = true;}

	},

	soltar: function(tecla){

		/*=============================================
		SOLTAR TECLADO
		=============================================*/
		tecla.preventDefault();
		if(tecla.keyCode == 37){datos.izquierda = false;}
		if(tecla.keyCode == 39){datos.derecha = false;}

	},

	tiempo: function(){

		/*=============================================
		LLAMADO DEL CANVAS
		=============================================*/	

		lienzo.canvas();

		/*=============================================
		MOVIMIENTO HORIZONTAL ESCENARIO
		=============================================*/	

		datos.desplazamientoEscenario += datos.movimiento;


		/*=============================================
		MOVIMIENTO IZQUIERDA
		=============================================*/	

		if(datos.izquierda){

			datos.movimiento = datos.velocidad;
		
		}

		/*=============================================
		MOVIMIENTO DERECHA
		=============================================*/	
		if(datos.derecha){
				
			datos.movimiento = -datos.velocidad;
			
		}

		/*=============================================
		DETENIENDO MOVIMIENTO ESCENARIO Y MOVIMIENTO JUGADOR
		=============================================*/	

		if(!datos.izquierda && !datos.derecha){datos.movimiento = 0;}

		/*=============================================
		EJECUTANDO LÍNEA DE TIEMPO
		=============================================*/	

		animacion = frame(juego.tiempo);	

	}

}
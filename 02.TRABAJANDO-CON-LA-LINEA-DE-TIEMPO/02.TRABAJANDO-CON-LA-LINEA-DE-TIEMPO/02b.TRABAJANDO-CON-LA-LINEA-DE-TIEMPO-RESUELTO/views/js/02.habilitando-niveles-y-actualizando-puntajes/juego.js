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
		MOVIMIENTO HORIZONTAL JUGADOR
		=============================================*/	

		if(datos.desplazamientoEscenario <= datos.limiteEscenario){

			datos.jugador_x += datos.movimientoJugador;
		}

		/*=============================================
		MOVIMIENTO IZQUIERDA
		=============================================*/	

		if(datos.izquierda){

			if(datos.desplazamientoEscenario >= 0){

				datos.movimiento = 0;

			}else if(datos.desplazamientoEscenario <= datos.limiteEscenario){

				if(datos.jugador_x <= 70){

					datos.movimiento = datos.velocidad;
				
				}else{

					datos.movimiento = 0;
					datos.movimientoJugador =  -datos.velocidad;
				}


			}else{

				datos.movimiento = datos.velocidad;

			}
		
		}

		/*=============================================
		MOVIMIENTO DERECHA
		=============================================*/	
		if(datos.derecha){

			if(datos.desplazamientoEscenario <= datos.limiteEscenario){

				datos.movimiento = 0;
			    datos.movimientoJugador =  datos.velocidad;

			}else{
				
				datos.movimiento = -datos.velocidad;

			}
			
		}

		/*=============================================
		DETENIENDO MOVIMIENTO ESCENARIO Y MOVIMIENTO JUGADOR
		=============================================*/	

		if(!datos.izquierda && !datos.derecha){datos.movimiento = 0; datos.movimientoJugador = 0;}

		/*=============================================
		EJECUTANDO LÍNEA DE TIEMPO
		=============================================*/	

		animacion = frame(juego.tiempo);

		/*=============================================
		FINAL DEL NIVEL
		=============================================*/	

		if(datos.jugador_x >= 950){

			cancelAnimationFrame(animacion);

			var xhr = new XMLHttpRequest();
			var nivel = "ok";
			var puntaje = "200";
			var numeroNivel = datos.nivel;
			var id = datos.id;
			var url = "views/ajax/usuarios.php";
			xhr.open("POST", url, true); 
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send("nivel=" + nivel + "& puntaje=" + puntaje + "& numeroNivel=" + numeroNivel + "& id=" + id);

			xhr.onreadystatechange = function(){

				if ((xhr.readyState == 4) && (xhr.status == 200)){

					console.log("xhr.responseText", xhr.responseText);

					if(xhr.responseText == "ok"){	
						
							window.location = "inicio";
					}
				}
			}
			
		}

	}

}
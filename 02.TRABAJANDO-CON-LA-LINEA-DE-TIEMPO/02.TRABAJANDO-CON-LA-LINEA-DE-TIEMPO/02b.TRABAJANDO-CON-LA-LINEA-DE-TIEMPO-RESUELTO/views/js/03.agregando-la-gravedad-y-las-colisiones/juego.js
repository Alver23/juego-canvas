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
		if(tecla.keyCode == 38){datos.salto = true;}

	},

	soltar: function(tecla){

		/*=============================================
		SOLTAR TECLADO
		=============================================*/
		tecla.preventDefault();
		if(tecla.keyCode == 37){datos.izquierda = false;}
		if(tecla.keyCode == 39){datos.derecha = false;}
		if(tecla.keyCode == 38){datos.salto = false;}

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
		MOVIMIENTO HORIZONTAL PLATAFORMA
		=============================================*/	

		for(var i = 0; i < datos.plataforma.length; i++){

			datos.plataforma[i].x += datos.movimiento;
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
		GRAVEDAD
		=============================================*/

		datos.jugador_y += datos.gravedad;

		if(datos.gravedad < datos.limiteGravedad){

			datos.gravedad += datos.peso;
		}

		/*=============================================
		COLISIONES CON PLATAFORMA
		=============================================*/	

		for(var i = 0; i < datos.plataforma.length; i++){

			function colisionesPlataforma(){

				//No colisión con plataforma de Arriba hacia Abajo
				if((datos.jugador_y + datos.jugador_alto) < datos.plataforma[i].y){return false}

				//No colisión con plataforma de Abajo hacia Arriba
				if(datos.jugador_y > (datos.plataforma[i].y + datos.plataforma[i].alto)){return false}

				//No colisión con plataforma de Izquierda a Derecha
				if((datos.jugador_x + datos.jugador_ancho) < datos.plataforma[i].x){return false}

				//No colisión con plataforma de Derecha a Izquierda
				if(datos.jugador_x > (datos.plataforma[i].x + datos.plataforma[i].ancho)){return false}

				return true;
			
			}

			colisionesPlataforma();

			//Colisión con plataforma de Arriba hacia Abajo

			if(colisionesPlataforma() && (datos.jugador_y + datos.jugador_alto) < datos.plataforma[i].y + datos.gravedad){

				datos.gravedad = 0;
				datos.jugador_y = datos.plataforma[i].y - datos.jugador_alto;
			}

			//Colisión con plataforma de Abajo hacia Arriba

			if(colisionesPlataforma() && datos.jugador_y - datos.gravedad > (datos.plataforma[i].y + datos.plataforma[i].alto)){

				datos.gravedad = 1;
				datos.jugador_y = datos.plataforma[i].y - datos.plataforma[i].alto;
			}

			if(datos.desplazamientoEscenario <= datos.limiteEscenario){

				//Colisión con plataforma de Izquierda a derecha

				if(colisionesPlataforma() && (datos.jugador_x + datos.jugador_ancho) < datos.plataforma[i].x + datos.movimientoJugador){

					datos.movimientoJugador = 0;
					datos.jugador_x = datos.plataforma[i].x - datos.jugador_ancho;
				}

				//Colisión con plataforma de Derecha a Izquierda

				if(colisionesPlataforma() && datos.jugador_x - datos.movimientoJugador > (datos.plataforma[i].x + datos.plataforma[i].ancho)){

					datos.movimientoJugador = 0;
					datos.jugador_x = datos.plataforma[i].x + datos.plataforma[i].ancho;
				}

			}else{

				//Colisión con plataforma de Izquierda a derecha

				if(colisionesPlataforma() && (datos.jugador_x + datos.jugador_ancho) < datos.plataforma[i].x - datos.movimiento){

					datos.movimiento = 0;
					datos.jugador_x = datos.plataforma[i].x - datos.jugador_ancho;
				}

				//Colisión con plataforma de Derecha a Izquierda

				if(colisionesPlataforma() && datos.jugador_x + datos.movimiento > (datos.plataforma[i].x + datos.plataforma[i].ancho)){

					datos.movimiento = 0;
					datos.jugador_x = datos.plataforma[i].x + datos.plataforma[i].ancho;
				}


			}

			/*=============================================
			SALTO
			=============================================*/	
			if(datos.salto && datos.gravedad == 0 && datos.jugador_y == datos.plataforma[i].y - datos.jugador_alto){

				datos.gravedad = datos.alturaSalto;
			}


		}

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
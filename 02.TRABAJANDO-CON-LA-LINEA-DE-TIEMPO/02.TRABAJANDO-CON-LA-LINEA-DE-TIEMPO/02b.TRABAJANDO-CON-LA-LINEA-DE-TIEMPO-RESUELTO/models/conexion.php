<?php

class Conexion{

	public function conectar(){

		$link = new PDO("mysql:host=localhost;dbname=blackninja","root","Lae01.");
		return $link;
		
	}

}
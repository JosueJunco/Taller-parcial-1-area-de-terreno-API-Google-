var i=0;
var coordenadas = new Array();
var radianes = new Array();
var datosFloat = new Array();
var cooPlana = new Array();

//Guardar coordenadas
function GuardarCoordenada(){
  coordenadas.push(document.getElementById("coords").value);
  document.getElementById("result").value =document.getElementById("result").value + "\nAñadido Marcador #"+(i+1)+": \n"+ coordenadas[i];
  i++;
}

//Hallar el area
function hallarArea() {
	if(coordenadas.length >= 4)
  {
		//convertir coordenadas string en float
		var posicioncoma = 0;
		for (var t = 0; t < coordenadas.length; t++) {
			posicioncoma = coordenadas[t].indexOf(",");
			datosFloat.push(parseFloat(coordenadas[t].substr(0,posicioncoma)));
			datosFloat.push(parseFloat(coordenadas[t].substr((posicioncoma+1),(coordenadas[t].length-1))));
		}

		//Convertir longitud y latitud a radianes
		for (var i = 0; i < datosFloat.length; i++) {
			radianes.push((datosFloat[i] * Math.PI)/180);
		}

		//Coordenada polar a plana
		var j = 0;
		var x = 0;
		var y = 0;
		while(j < radianes.length){
      //X , Y
      //x = distancia * Math.cos(radianes[j]);
      x = (2*6371.0)*(Math.asin(Math.sqrt(Math.pow((Math.sin((0-0)/2)),2) + ( 1 * 1 * Math.pow( (Math.sin((radianes[j+1]-0)/2)),2)))));
      cooPlana.push(x);
      //y = distancia * Math.sin(radianes[j]);
      y = (2*6371.0)*(Math.asin(Math.sqrt(Math.pow((Math.sin((radianes[j]-0)/2)),2) + ( 1 * Math.cos(radianes[j]) * Math.pow( (Math.sin((0-0)/2)),2)))));
      cooPlana.push(y);
      //distancia = 0;
      x=0;
      y=0;
      j = j+2;
		}

		//Hallar el area
		var Dx = 0;
    var Iy = 0;
		j=0;
		var k = 3;
		//Hallar D
		while (j < cooPlana.length) {
				if(k > cooPlana.length)
				{
					j=cooPlana.length;
				}else{
					Dx = Dx + (cooPlana[j]*cooPlana[k]);
					j = j+2;
					k = k +2;
				}
		}

		j=1;
		k=2;
		//Hallar I
		while (j < cooPlana.length) {
				if(k == cooPlana.length)
				{
					j=cooPlana.length;
				}else{
					Iy = Iy + (cooPlana[j]*cooPlana[k]);
					j = j+2;
					k = k +2;
				}
		}

		//halla el area
		var s = (((Math.abs(Dx-Iy))/2)/100000);
		document.getElementById("result").value= "El valor del area es: \n"+ s + " Km2";

	}else{
		document.getElementById("result").value= "No hay suficientes marcadores.\nIngrese mas (min 4).\n";
	}
	//document.getElementById("result").value = "Distancia: " + distancia;
	//document.getElementById("result").value = document.getElementById("result").value + "\ndato x: "+ x + "\ndato y:" + y;
}

$( document ).on('pagebeforeshow',  function() {
    var IDUsuarioCookie = document.cookie;
    var IDUsuario = IDUsuarioCookie.charAt(IDUsuarioCookie.length - 1);
   
    ObtenerInventario(IDUsuario);
});

function ObtenerInventario(IDUsuario) {
    var request = $.ajax({
        type: "POST",
        url: "https://microadmin.000webhostapp.com/ObtenerProductos.php",
        data: {idUsuario: IDUsuario},
        dataType: "json"
});

    request.success(function(datos){
        fillListWithInventory(datos)
    });

}


function  fillListWithInventory(datos) {
    var lista = document.getElementById('listaInventario');
		
		while(lista.firstChild){
			lista.removeChild(lista.firstChild);
		}
   $.each(datos, function(){
		var nuevoLi = document.createElement("li");
    	nuevoLi.setAttribute("id", this.idProducto);
		nuevoLi.setAttribute("onclick", "buscarProducto(this.id)");	
		
		var nuevoA = document.createElement("a");
		nuevoA.href="#verProducto";
		nuevoA.className = "ui-btn ui-btn-icon-right ui-icon-carat-r";
		
		var h2NombreProducto = document.createElement("h2");
		h2NombreProducto.innerHTML = this.nombre;

		var pCantidadProducto = document.createElement("p");
		pCantidadProducto.innerHTML = "Cantidad en inventario: " + this.cantidad;
		
		
		var pPrecioProducto = document.createElement("p");
		pPrecioProducto.innerHTML = "Precio Unitario: " + this.precioUnidad;
		
		
		var imagen = document.createElement("img");
		imagen.src = this.urlImagen;
		imagen.className = "thumbnail";
		
		nuevoA.appendChild(imagen);
		nuevoA.appendChild(h2NombreProducto);
		nuevoA.appendChild(pCantidadProducto);
		nuevoA.appendChild(pPrecioProducto);
		nuevoLi.appendChild(nuevoA);
		$('#listaInventario').append(nuevoLi);
	});
}


function buscarProducto(idProducto){
   
       var productoRequest = $.ajax({
        type: "POST",
        url: "https://microadmin.000webhostapp.com/ObtenerProductoPorId.php",
        data: {idProducto: idProducto},
        dataType: "json"
}); 

    productoRequest.success(function(datos){
        $.each(datos, function(){
        var imagen_producto = document.getElementById("imagen_producto");
        imagen_producto.src = this.urlImagen;
        imagen_producto.className = "vistaProducto";
        var nombre = document.getElementById("nombre");
        nombre.innerHTML = "Nombre del producto: " + this.nombre;
        var codigo = document.getElementById("codigo");
        codigo.innerHTML = "Código: " + this.codigo;
        var preciounitario = document.getElementById("preciounitario");
        preciounitario.innerHTML = "Precio unitario: " + this.precioUnidad;
        var costomanufactura = document.getElementById("costomanufactura");
        costomanufactura.innerHTML = "Costo de manufactura: " + this.costoManufactura;
        var cantidad = document.getElementById("cantidad");
        cantidad.innerHTML = "Cantidad: " + this.cantidad;
        
        });
    });
}
function IniciarSesion(){
    var email = $('#txt-email').val();
    var password = $('#txt-password').val();
    
    $.post(
    "https://microadmin.000webhostapp.com/IniciarSesion.php",
    {
        correo: email,
        contrasena: password
    },
    function(data, status){
    
        if(data.success == true){
            window.location.replace("http://microadmin-ococaro.c9users.io:8081/android/www/inventario.html")
            document.cookie = "idUsuario="+data.IDUsuario;
        }else{
            displayToast("Ha ingresado mal su correo o contraseña")
        }
    }
    , "json"
    );
    
}
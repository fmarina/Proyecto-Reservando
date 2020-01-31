
var Reserva = function(horario, cantidadPersonas, precioXPersona, codigoDescuento){
    this.horario = horario;
    this.cantidadPersonas = cantidadPersonas;
    this.precioXPersona = precioXPersona;
    this.codigoDescuento = codigoDescuento;
}

Reserva.prototype.calcularPrecioBaseDeReserva = function(){
    return this.cantidadPersonas * this.precioXPersona;
}

//funcion que agrega descuento a una reserva de 5%, 10% y 15% según la cantidad de personas en la reserva
Reserva.prototype.descuentoGruposGrandes = function(){  
    var descuento = 0;  
    var precioBase = this.calcularPrecioBaseDeReserva();

    if(this.cantidadPersonas >= 4 && this.cantidadPersonas <= 6){
        descuento =  precioBase * 0.05;
    }
    else if(this.cantidadPersonas == 7 || this.cantidadPersonas == 8){
        descuento = precioBase * 0.10;
    }
    else if(this.cantidadPersonas > 8){
        descuento = precioBase * 0.15;
    }
    return descuento;
}

//funcion que agrega descuento a una reserva si una persona posee un código de descuento. Según estos codigos pueden ser descuentos de 15%, $200 o el valor del precioXPersona.
Reserva.prototype.descuentoXCodigo = function(){
    var descuento = 0;
    var precioBase = this.calcularPrecioBaseDeReserva();
    if(this.codigoDescuento === "DES15"){
        descuento = precioBase * 0.15;
    }
    else if(this.codigoDescuento === "DES200"){
        descuento = 200;
    }
    else if(this.codigoDescuento === "DES1"){
        descuento = this.precioXPersona;
    }
    return descuento;
}

//función que calcula el total de todos los descuentos de una reserva
Reserva.prototype.calcularDescuentos = function(){
    return this.descuentoGruposGrandes() + this.descuentoXCodigo();
}

//función que agrega un adicional a la reserva si la misma se encuentra en los rangos horarios de 13 a 14 o de 20 a 21
Reserva.prototype.adicionalXHorario = function(){
    var adicional = 0;
    precioBase = this.calcularPrecioBaseDeReserva(); 
    var horaReserva = this.horario.getHours();       
    if((horaReserva >= 13 && horaReserva <= 14) || (horaReserva >= 20 && horaReserva <= 21)){
        adicional = precioBase * 0.05;        
    }
    return adicional;
}

//función que agrega un adicional a la reserva si la misma se realiza para los dias viernes, sabado o domingos.
Reserva.prototype.adicionalXFinDeSemana = function(){
    var adicional = 0;
    precioBase = this.calcularPrecioBaseDeReserva();
    var diaReserva = this.horario.getDay();
    //0:domingo 5:viernes 6:sabado
    if(diaReserva === 0 || diaReserva === 5 || diaReserva === 6){
        adicional = precioBase * 0.10;
    }
    return adicional
}

//función que calcula el total de todos los adicionales de una reserva
Reserva.prototype.calcularAdicionales = function(){
    return this.adicionalXHorario() + this.adicionalXFinDeSemana();
}

//función que calcula el precio Final de una reserva contemplando el precioBase mas los adicionales menos los descuentos realizados.
Reserva.prototype.calcularPrecioFinalDeReserva = function(){
    return this.calcularPrecioBaseDeReserva() + this.calcularAdicionales() - this.calcularDescuentos();    
}

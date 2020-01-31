var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}

Restaurant.prototype.reservarHorario = function(horarioReservado) {
    var horariosDisponibles = this.horarios.filter(horario =>{ 
        return horario !== horarioReservado;
    });
    this.horarios = horariosDisponibles;
}

Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion < 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}

function sumatoria(numeros){
    var sumaTotal = numeros.reduce((acumulador, valorActual) =>{ 
        return acumulador + valorActual;
    });
    return sumaTotal;
}

function promedio(numeros)
{
    var promedio = sumatoria(numeros) / numeros.length;
    return Math.round(promedio * 10) / 10;
}

Restaurant.prototype.obtenerPuntuacion = function() {
    if (this.calificaciones.length === 0) {
        return 0;
    } 
    else{
        return promedio(this.calificaciones);
    }
}


var assert = chai.assert;


describe("Test de función ReservarHorario(horario)", function(){   
    var restaurant;
    beforeEach(function(){
        restaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
    }); 
        
    it("Cuando se reserva un horario de un restaurant, ese horario se debe eliminar del arreglo", function(){
        restaurant.reservarHorario("18:00");
        assert.notInclude(restaurant.horarios, "18:00");
        assert.lengthOf(restaurant.horarios, 2);
    });

    it("Cuando se reserva un horario que el restaurant no posee, el arreglo se mantiene igual", function(){        
        restaurant.reservarHorario("12:30");
        assert.deepEqual(restaurant.horarios, ["13:00", "15:30", "18:00"]);
        assert.lengthOf(restaurant.horarios, 3);
    });

    it("Cuando se intenta reservar un horario pero no se le pasa ningún parámetro a la función, el arreglo se mantiene igual", function(){
        restaurant.reservarHorario();
        assert.deepEqual(restaurant.horarios, ["13:00", "15:30", "18:00"]);
        assert.lengthOf(restaurant.horarios, 3);
    });
});


describe("Test de función ObtenerPuntuacion()", function(){
    it("La puntuación de un restaurant según sus calificaciones se calcula correctamente", function(){        
        var restaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [5, 5, 9, 10, 7]);
        var puntuacion = restaurant.obtenerPuntuacion();
        assert.equal(puntuacion, 7.2);       
    });

    it("La puntuación de un restaurant sin ninguna calificacion es 0", function(){
        var restaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", []);
        var puntuacion = restaurant.obtenerPuntuacion();
        assert.equal(puntuacion, 0);
    });
});


describe("Test de función Calificar()", function(){
    it("Si se intenta calificar un restaurant con un numero que no sea entero no se debe agregar al arreglo calificaciones", function(){
        var restaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [ 9, 10, 7]);
        restaurant.calificar(7.5);
        assert.deepEqual(restaurant.calificaciones, [ 9, 10, 7]);
    });

    it("Si se intenta calificar un restaurant con numeros negativos no se agrega al arreglo calificaciones", function(){
        var restaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [ 3, 10, 5]);
        restaurant.calificar(-3);
        assert.deepEqual(restaurant.calificaciones, [ 3, 10, 5]);
    });
    
    it("Si se intenta calificar un restaurant con un numero mayor a 10 no se agrega al arreglo calificaciones", function(){
        var restaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [ 1, 6, 3]);
        restaurant.calificar(20);
        assert.deepEqual(restaurant.calificaciones, [ 1, 6, 3]);
    });

    it("Si se intenta calificar con un dato de tipo string, no se debe agregar al arreglo calificaciones", function(){
        var restaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [ 9, 10, 4]);
        restaurant.calificar("hola");
        assert.deepEqual(restaurant.calificaciones, [9, 10, 4]);
    });

    it("Si se intenta calificar correctamente, esa puntuacion se debe agregar al arreglo calificaciones", function(){
        var restaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [ 9, 10, 7]);
        restaurant.calificar(4);
        assert.deepEqual(restaurant.calificaciones, [9, 10, 7, 4]);
    });
});


describe("Test de la función BuscarRestaurante(id)", function(){
    var listadoDeRestaurantes;
    beforeEach(function(){
        listadoDeRestaurantes = new Listado([
            new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
            new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
            new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]),
            new Restaurant(4, "Bleecker Street Pizza", "Pizza", "Nueva York", ["12:00", "15:00", "17:30"], "../img/pizza2.jpg", [8, 9, 9, 4, 6, 7]),
            new Restaurant(5, "Jolly", "Asiática", "Berlín", ["12:00", "13:30", "16:00"], "../img/asiatica3.jpg", [8, 3, 9, 5, 6, 7])
        ]);        
    });

    it("Si se encuentra un restaurant que coincide con el id, debe devolver ese restaurant", function(){
        var resultado = listadoDeRestaurantes.buscarRestaurante(5);
        var esperado = listadoDeRestaurantes.restaurantes[4]
        assert.deepEqual(resultado.id, esperado.id, "El id no coincide");
    });

    it("Si se intenta buscar un restaurant sin el parametro id debe devolver el mensaje", function(){
        var resultado = listadoDeRestaurantes.buscarRestaurante();
        var esperado = "No se ha encontrado ningún restaurant";
        assert.equal(resultado, esperado);        
    });

    it("Si se intenta buscar un restaurant con un tipo de id que no coincide debe devolver el mensaje", function(){
        var resultado = listadoDeRestaurantes.buscarRestaurante("2");
        var esperado = "No se ha encontrado ningún restaurant";
        assert.equal(resultado, esperado);        
    });
});


describe("Test de la función ObtenerRestaurantes(filtroRubro, filtroCiudad, filtroHorario)", function(){
    it("Debe devolver el restaurant correcto según todos los filtros pasados por parametros", function(){
        var listadoDeRestaurantes = new Listado([
            new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
            new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
            new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]),
            new Restaurant(4, "Bleecker Street Pizza", "Pizza", "Nueva York", ["12:00", "15:00", "17:30"], "../img/pizza2.jpg", [8, 9, 9, 4, 6, 7]),
            new Restaurant(5, "Jolly", "Asiática", "Berlín", ["12:00", "13:30", "16:00"], "../img/asiatica3.jpg", [8, 3, 9, 5, 6, 7])
        ]);
        var resultado = listadoDeRestaurantes.obtenerRestaurantes("Asiática", "Berlín", "12:00");
        var esperado = listadoDeRestaurantes.restaurantes[4];
        assert.deepEqual(resultado[0], esperado);
        assert.equal(resultado.length, 1, "No coincide la cantidad de resultados");
    });

    it("Si no se pasa ningun filtro por parametros devuelve un array vacio", function(){
        var listadoDeRestaurantes = new Listado([
            new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
            new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
        ]);
        var resultado = listadoDeRestaurantes.obtenerRestaurantes();
        var esperado = [];
        assert.deepEqual(resultado, esperado);        
    });

    it("Se debe filtrar correctamente por el rubro especificada por parametro", function(){
        var listadoDeRestaurantes = new Listado([
            new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
            new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]),
            new Restaurant(4, "Bleecker Street Pizza", "Pizza", "Nueva York", ["12:00", "15:00", "17:30"], "../img/pizza2.jpg", [8, 9, 9, 4, 6, 7]),
            new Restaurant(5, "Street Pizza", "Pizza", "Nueva York", ["12:30", "15:00", "20:30"], "../img/pizza2.jpg", [8, 4, 6, 7]),
        ]);
        var resultado = listadoDeRestaurantes.obtenerRestaurantes("Pizza", null, null);
        
        assert.equal(resultado.length, 2, "No coincide la cantidad de resultados");
    });

    it("Se debe filtrar correctamente por la ciudad especificada por parametro", function(){
        var listadoDeRestaurantes = new Listado([
            new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
            new Restaurant(3, "Burgermeister", "Hamburguesa", "Nueva York", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]),
            new Restaurant(4, "Bleecker Street Pizza", "Pizza", "Nueva York", ["12:00", "15:00", "17:30"], "../img/pizza2.jpg", [8, 9, 9, 4, 6, 7]),
            new Restaurant(5, "Street Pizza", "Pizza", "Nueva York", ["12:30", "15:00", "20:30"], "../img/pizza2.jpg", [8, 4, 6, 7]),
        ]);
        var resultado = listadoDeRestaurantes.obtenerRestaurantes(null, "Nueva York", null);
        assert.equal(resultado.length, 3, "No coincide la cantidad de resultados");
    });

    it("Se debe filtrar correctamente por el horario especificado por parametro", function(){
        var listadoDeRestaurantes = new Listado([
            new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["12:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
            new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["12:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
            new Restaurant(3, "Burgermeister", "Hamburguesa", "Nueva York", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]),
            new Restaurant(4, "Bleecker Street Pizza", "Pizza", "Nueva York", ["12:00", "15:00", "17:30"], "../img/pizza2.jpg", [8, 9, 9, 4, 6, 7]),
            new Restaurant(5, "Street Pizza", "Pizza", "Nueva York", ["12:30", "15:00", "20:30"], "../img/pizza2.jpg", [8, 4, 6, 7]),
        ]);
        var resultado = listadoDeRestaurantes.obtenerRestaurantes(null, null, "12:00");
        assert.equal(resultado.length, 4, "No coincide la cantidad de resultados");
    });
});


describe("Test de Reserva de Restaurant", function(){
    it("Se calcula correctamente el precioBase de una reserva", function(){
        var reserva1 = new Reserva(new Date("February 4, 2020 20:30:00"), 3, 250, "DES1");
        var reserva2 = new Reserva (new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");
        var resultado1 = reserva1.calcularPrecioBaseDeReserva();                      
        var resultado2 = reserva2.calcularPrecioBaseDeReserva();
        assert.equal(resultado1, 750);  
        assert.equal(resultado2, 300);
    });

    it("Se calcula correctamente los adicionales que puede tener una reserva", function(){
        var reserva1 = new Reserva(new Date("January 31, 2020 20:30:00"), 2, 150, "DES1");
        var resultado = reserva1.calcularAdicionales();
        assert.equal(resultado, 45);
    });

    it("Se calcula correctamente los descuentos que puede tener una reserva", function(){
        var reserva1 = new Reserva(new Date("January 31, 2020 20:30:00"), 10, 150, "DES200");
        var resultado = reserva1.calcularDescuentos();
        assert.equal(resultado, 425);
    });

    it("Se calcula correctamente el precioFinal de una reserva contemplando bien los descuentos y adicionales", function(){
        var reserva1 = new Reserva (new Date("February 1, 2020 14:00:00"), 4, 150, "DES15");
        var resultado = reserva1.calcularPrecioFinalDeReserva();
        assert.equal(resultado, 570);
    });
});
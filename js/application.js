;(function(lander, undefined){
    var display = document.getElementById('display');
    var horizon = new Array(display.width);
    var horizon_height = 50;
    horizon[0] = horizon_height;
    for (var index = 1; index < display.width; index++){
        horizon[index] = horizon_height;
    }

    var model = {
        "lander": {
            "x": 37, "y": 251,
            "orientation": Math.PI/4,
            "radius": 5
        },
        "horizon": horizon
    };

    var world = new lander.simulation.FlatLand(display.width, horizon_height);
    var position = new lander.vector.Vector(37, 251);
    var moonLander = new lander.simulation.Lander(position);

    function updateModel() {
        model.lander.x = moonLander.x.x;
        model.lander.y = moonLander.x.y;
        model.lander.orientation = moonLander.o.angle() - Math.PI/2;
        model.lander.radius = simulation.params.landerRadius;
    }

    var simulation = new lander.simulation.Simulation(world, moonLander);


    var view = new lander.View(model, display);
    function tick(){
        simulation.tick();
        updateModel()
        view.update();
        requestAnimationFrame(tick);
    };
    tick();
})(lander);

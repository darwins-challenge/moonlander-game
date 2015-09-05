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
            "radius": 5,
            "fuel": 10,
            "thrusting": false
        },
        "horizon": horizon
    };

    var pressed = {
    }
    document.body.addEventListener('keydown', function(event){
        var code = event.keyCode;
        pressed[code] = true;

    }, true);
    document.body.addEventListener('keyup', function(event){
        var code = event.keyCode;
        pressed[code] = false;
    }, true);

    function control(commandpanel){
        if (pressed[37]){
            console.log('left');
            commandpanel.do.turnLeft();
        }
        if (pressed[39]){
            console.log('right');
            commandpanel.do.turnRight();
        }
        if (pressed[38]){
            console.log('thrusting');
            commandpanel.do.thruster();
        }
    }

    var world = new lander.simulation.FlatLand(display.width, horizon_height);
    var position = new lander.vector.Vector(37, 251);
    var moonLander = new lander.simulation.Lander(position, control);

    function updateModel() {
        model.lander.x = moonLander.x.x;
        model.lander.y = moonLander.x.y;
        model.lander.orientation = moonLander.o.angle() - Math.PI/2;
        model.lander.radius = simulation.params.landerRadius;
        model.lander.crashed = moonLander.crashed;
        model.lander.fuel = moonLander.fuel;
        model.lander.thrusting = moonLander.thrusting;
    }


    var simulation = new lander.simulation.Simulation(world, moonLander, {
        gravity: new lander.vector.Vector(0, -0.05),
        landerRadius: 10
    });

    var updateInfo = (function(){
        var x = document.getElementById('x');
        var y = document.getElementById('y');
        var vx = document.getElementById('vx');
        var vy = document.getElementById('vy');
        var orientation = document.getElementById('orientation');
        var angularVelocity = document.getElementById('angularVelocity');
        return function(){
            x.innerHTML = moonLander.x.x.toFixed(2);
            y.innerHTML = moonLander.x.y.toFixed(2);
            vx.innerHTML = moonLander.v.x.toFixed(2);
            vy.innerHTML = moonLander.v.y.toFixed(2);
            orientation.innerHTML = (moonLander.o.angle() - Math.PI/2).toFixed(2);
            angularVelocity.innerHTML = moonLander.w.toFixed(2);
        };
    })();

    var view = new lander.View(model, display);
    function tick(){
        simulation.tick();
        updateModel();
        updateInfo();
        view.update();
        requestAnimationFrame(tick);
    };
    tick();


})(lander);

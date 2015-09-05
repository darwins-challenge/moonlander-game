;(function(lander, undefined){
    var display = document.getElementById('display');
    var horizon = new Array(display.width);
    horizon[0] = 0;
    for (var index = 1; index < display.width; index++){
        horizon[index] = 0;
    }

    var model = {
        "lander": {
            "x": 37, "y": 251,
            "vx": 1, "vy": 0,
            "orientation": Math.PI/4, "angular-velocity": 0.05,
            "radius": 10,
            "fuel": 1
        },
z        "horizon": horizon
    };

    var view = new lander.View(model, display);
    function tick(){
        model.lander.x += model.lander.vx;
        if (model.lander.x > display.width) {
            model.lander.x -= display.width;
        }
        view.update();
        requestAnimationFrame(tick);
    };
    tick();
})(lander);

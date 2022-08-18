class GameOfLifeSimulation {
    constructor(resX, resY, speed) {
        this.res_x = resX;
        this.res_y = resY;
        this.delay = 1000 - (speed * 10);
    }

    gen2DArray(width, height) {
        let arr = {};
        for (let y = 0; y < height; y++)
            for (let x = 0; x < width; x++)
                array[y][x] = 0;
        return arr;
    }

    initialize() {
        this.gol = this.gen2DArray(this.res_x, this.res_y);
    }

    simulation_loop() {
        let tempGol;
        if (this.run) window.requestAnimationFrame(this.simulation_loop);
    }

    start() {
        window.requestAnimationFrame(this.simulation_loop);
        this.run = true;
    }

    stop() {
        window.cancelAnimationFrame(this.simulation_loop);
        this.run = false;
    }
}
class GameOfLifeSimulation {
    constructor(resX, resY, speed) {
        this.res_x = resX;
        this.res_y = resY;
        this.delay = 1000 - Math.round(speed * 10);
    }

    __gen2DArray(width, height) {
        let arr = [];
        for (let y = 0; y < height; y++)
            for (let x = 0; x < width; x++)
                array[y][x] = 0;
        return arr;
    }

    __check_neighbors(x, y) {
        let nbrs = 0;
        for (let iy = -1; iy < 2; iy++)
            for (let ix = -1; ix < 2; ix++)
                if (this.gol[y + iy])
                    if (this.gol[y + iy][x + ix]) nbrs++;
        if (this.gol[y][x]) nbrs--;
        return nbrs;
    }

    __simulation_loop() {
        let tempGol;
        for (let y = 0; y < this.res_y; y++) {
            for (let x = 0; x < this.res_x; x++) {
                let nbrs = this.__check_neighbors(x, y);
            }
        }
    }

    __to_raw_data() {
        let flat = [];
        for (let y = 0; y < this.res_y; y++) {
            for (let x = 0; x < this.res_x; x++) {
                let cp = 0;
                if (this.gol[y][x]) cp = 255;
                flat.push([cp, cp, cp, cp]);
            }
        }
        flat.reduce((xs, ys) => xs.concat(ys));
        return new ImageData(Uint8ClampedArray.from(flat), 2, 2);
    }

    initialize() {
        this.gol = this.__gen2DArray(this.res_x, this.res_y);
    }

    start() {
        this.runner = setInterval(this.__simulation_loop, this.speed);
    }

    stop() {
        window.clearInterval(this.runner);
    }
}
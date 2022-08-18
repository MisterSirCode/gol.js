class GameOfLifeSimulation {
    constructor(resX, resY, speed) {
        this.res_x = resX;
        this.res_y = resY;
        this.delay = speed;
    }

    add_living_cell(x, y) {
        x = Math.min(Math.max(x, 0), this.res_x - 1);
        y = Math.min(Math.max(y, 0), this.res_y - 1);
        this.gol[y][x] = 1;
    }

    __gen2DArray(width, height) {
        let arr = [];
        for (let y = 0; y < height; y++) {
            arr[y] = [];
            for (let x = 0; x < width; x++)
                arr[y][x] = 0;
        }
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
        let tempGol = this.__gen2DArray(this.res_x, this.res_y);
        for (let y = 0; y < this.res_y; y++) {
            for (let x = 0; x < this.res_x; x++) {
                let nbrs = this.__check_neighbors(x, y);
                let crnt = this.gol[y][x] ? true : false;
                if (crnt && nbrs < 2) tempGol[y][x] = 0;
                else if (crnt && (nbrs == 2 || nbrs == 3)) tempGol[y][x] = 1;
                else if (crnt && nbrs > 3) tempGol[y][x] = 0;
                else if (!crnt && nbrs == 3) tempGol[y][x] = 1;
                else tempGol[y][x] = this.gol[y][x];
            }
        }
        this.gol = tempGol;
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
        flat = flat.reduce((xs, ys) => xs.concat(ys));
        return new ImageData(Uint8ClampedArray.from(flat), this.res_x, this.res_y);
    }

    initialize() {
        this.gol = this.__gen2DArray(this.res_x, this.res_y);
    }

    seed_random() {
        for (let y = 0; y < this.res_y; y++) {
            for (let x = 0; x < this.res_x; x++) {
                let r = Math.random() > 0.9 ? true : false;
                if (r) this.gol[y][x] = 1;
            }
        }
    }

    start() {
        this.runner = window.setInterval(() => {
            this.__simulation_loop()
        }, this.delay);
        //this.__simulation_loop();
    }

    stop() {
        window.clearInterval(this.runner);
    }
}
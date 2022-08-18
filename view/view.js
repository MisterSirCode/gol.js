document.querySelector('.menuMin').addEventListener('click', (e) => windowControls.minimize());
document.querySelector('.menuClose').addEventListener('click', (e) => windowControls.close());

const size = 64;
const finl = 512;
const sclr = finl / size;
const gol = new GameOfLifeSimulation(size, size, 10);
const cvsp = document.querySelector('.golcvs');
const ctxp = cvsp.getContext('2d');
const cvs = document.querySelector('.final');
const ctx = cvs.getContext('2d');
let isMouseOverCanvas = false;
let isMousePressed = false;

gol.initialize();
gol.seed_random();
gol.start();

cvsp.width = cvsp.height = size;
cvs.width = cvs.height = finl;

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

cvs.addEventListener('mousedown', () => { isMousePressed = true })
cvs.addEventListener('mouseup', () => { isMousePressed = false })
cvs.addEventListener('mouseenter', () => { isMouseOverCanvas = true })
cvs.addEventListener('mouseleave', () => { isMouseOverCanvas = false })
cvs.addEventListener('mousemove', (e) => {
    if (isMousePressed && isMouseOverCanvas) {
        let pos = getMousePos(cvs, e);
        gol.add_living_cell(Math.round(pos.x / sclr), Math.round(pos.y / sclr));
    }
})

function renderLoop() {
    ctxp.clearRect(0, 0, size, size);
    ctx.clearRect(0, 0, finl, finl);
    ctxp.imageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    let data = gol.__to_raw_data();
    ctxp.putImageData(data, 0, 0);
    ctx.drawImage(cvsp, 0, 0, size, size, 0, 0, finl, finl);
    window.requestAnimationFrame(renderLoop);
}

window.requestAnimationFrame(renderLoop);

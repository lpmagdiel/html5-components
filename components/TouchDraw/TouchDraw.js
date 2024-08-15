class TouchDraw {
    /**
     * 
     * @param {String} canvasId 
     */
    constructor(canvasId, { bg = '#fff', border = false, color = '#000', lineSize = 5 }) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.color = color;
        this.lineSize = lineSize;
        this.isDrawing = false;
        this.last = { x: 0, y: 0 };
        if (border) this.canvas.style.border = '2px solid red';
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = bg;
        this.ctx.fill();
        this.canvas.addEventListener('touchstart', e=>this.#startDrawing(e), false);
        this.canvas.addEventListener('touchmove', e=>this.#draw(e), false);
        this.canvas.addEventListener('touchend', e=>this.#stopDrawing(e), false);
        this.canvas.addEventListener('touchcancel', e=>this.#stopDrawing(e), false);
    }
    getImage(format="jpeg",quality=0.5 ){
        this.canvas.toDataURL(`image/${format}`,quality);
    }
    updateColor(color) {
        this.color = color;
    }
    updateLineSize(lineSize) {
        this.lineSize = lineSize;
    }
    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }
    #startDrawing(e) {
        this.isDrawing = true;
        const touch = e.touches[0];
        this.last.x = touch.clientX - this.canvas.offsetLeft;
        this.last.y = touch.clientY - this.canvas.offsetTop;
    }
    #draw(e) {
        if (!this.isDrawing) return;
        e.preventDefault(); // Evita el desplazamiento de la página al dibujar
        const touch = e.touches[0];
        const x = touch.clientX - this.canvas.offsetLeft;
        const y = touch.clientY - this.canvas.offsetTop;

        this.ctx.beginPath();
        this.ctx.moveTo(this.last.x, this.last.y);
        this.ctx.lineTo(x, y);
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.lineSize;
        this.ctx.lineCap = 'round';
        this.ctx.stroke();

        this.last.x = x;
        this.last.y = y;
    }
    #stopDrawing() {
        this.isDrawing = false;
    }
}
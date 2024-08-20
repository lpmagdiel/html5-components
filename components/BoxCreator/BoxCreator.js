const createBox = ({ width = 200, height = 200, border = false, text = 'box', bg = '#000', textColor = '#fff' } = config) => {
    const box = document.createElement('canvas');
    box.width = width;
    box.height = height;
    const ctx = box.getContext('2d');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);
    if (border) {
        ctx.strokeStyle = textColor;
        ctx.lineWidth = 4;
        ctx.strokeRect(0, 0, width, height);
    }
    ctx.fillStyle = textColor;
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);
    return box;
}

const createBase64Box = ({ width = 200, height = 200, border = false, text = 'box', bg = '#000', textColor = '#fff' }) => createBox({ width, height, border, text, bg, textColor }).toDataURL("image/jpeg", 0.5);
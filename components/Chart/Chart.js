class Chart {
    /**
     * 
     * @param { String } containerId
     * @param { {name: String, value: Number}[] } data
     */
    constructor(containerId, data = []) {
        this.container = document.getElementById(containerId);
        this.data = data;
        this.total = data.map( val => val.value).reduce( (a,b) => a + b );
        this.colors = ['#CD5C5C','#F08080','#FA8072', '#B22222',' #FFA07A','#FFC0CB','#FF69B4','#DB7093','#FF7F50','#FF6347','#FF8C00','#FF4500','#FFD700','#BDB76B','#F0E68C','#D8BFD8','#DDA0DD','#9370DB','#8A2BE2','#6A5ACD','#7B68EE','#90EE90','#3CB371','#2E8B57','#9ACD32','#8FBC8B','#008080','#48D1CC','#5F9EA0','#4682B4','#87CEEB','#4169E1','#BC8F8F','#D2B48C','#DEB887','#CD853F','#808080','#A9A9A9'];
    }
    #randomColor(){
        return this.colors[ Math.floor(Math.random() * this.colors.length) ];
    }
    #newBar(value,text){
        const percent = (value * 100) / this.total;
        const bar = document.createElement('div');
        bar.style.display = 'flex';
        bar.style.justifyContent = 'space-between';
        bar.style.alignItems = 'center';
        bar.style.borderRadius = '4px';
        bar.style.padding = '4px';
        bar.style.height = `28px`;
        bar.style.width = `${percent}%`;
        bar.style.backgroundColor = this.#randomColor();
        bar.innerHTML = `<b>${text}</b><b>${value}<b>`;
        bar.style.color = '#fff';
        return bar;
    }
    #colorBlock(value){
        const rColor = this.#randomColor();
        const block = document.createElement('div');
        const percent = (value * 100) / this.total;
        block.style.width = `${percent}%`;
        block.style.height = '100%';
        block.style.display = 'inline-block';
        block.style.backgroundColor = rColor;
        return {block, rColor, percent, value};
    }
    Bar(){
        const chart = document.createElement('div');
        chart.style.display = 'flex';
        chart.style.flexDirection = 'column';
        chart.style.gap = '10px';
        this.data.forEach((val) => {
            const bar = this.#newBar(val.value, val.name);
            chart.appendChild(bar);
        });
        this.container.appendChild(chart);
    }
    List(){
        const chart = document.createElement('div');
        const tableList = document.createElement('div');
        const infoBlocks = [];
        chart.style.width = '100%';
        chart.style.height = '20px';
        chart.style.overflow = 'hidden';
        chart.style.borderRadius = '10px';
        chart.style.backgroundColor = '#fff';
        chart.style.marginBottom = '20px';
        this.data.forEach((val) => {
            const bar = this.#colorBlock(val.value);
            infoBlocks.push(bar);
            chart.appendChild(bar.block);
        });
        tableList.style.display = 'grid';
        tableList.style.gridTemplateColumns = '40px 1fr 100px';
        tableList.style.gap = '10px';
        tableList.style.alignItems = 'center';
        this.data.forEach((val,i) => {
            const dot = document.createElement('div');
            const info = document.createElement('p');
            const percent = document.createElement('b');
            percent.innerText = infoBlocks[i].percent.toFixed(2) + '%';
            dot.style.width = '20px';
            dot.style.height = '20px';
            dot.style.borderRadius = '50%';
            dot.style.backgroundColor = infoBlocks[i].rColor;
            info.innerText = val.name;
            tableList.appendChild(dot);
            tableList.appendChild(info);
            tableList.appendChild(percent);
        });
        this.container.appendChild(chart);
        this.container.appendChild(tableList);
    }
}
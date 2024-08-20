class Switch {
    constructor({
        containerId,
        selected = 0,
        active = { bg: '#000', textColor: '#fff' },
        options = [],
        borderColor = '#f0f0f0',
        onChange = val => { }
    }) {
        this.container = document.getElementById(containerId);
        this.selected = selected;
        this.onChange = onChange;
        this.active = active;
        this.borderColor = borderColor;
        this.options = options;
        this.#Build();
    }
    #Build() {
        const switchEl = document.createElement('div');
        switchEl.style.display = 'inline-grid';
        switchEl.style.gridTemplateColumns = `repeat(${this.options.length}, 1fr)`;
        switchEl.style.alignItems = 'center';
        switchEl.style.justifyContent = 'center';
        switchEl.style.minHeight = '40px';
        switchEl.style.overflow = 'hidden';
        for (let i = 0; i < this.options.length; i++) {
            const button = document.createElement('button');
            button.style.display = 'flex';
            button.style.height = '100%';
            button.style.alignItems = 'center';
            button.style.justifyContent = 'center';
            button.style.backgroundColor = 'transparent';
            button.style.color = '#000';
            button.style.border = `1px solid #CCC`;
            if (i === 0) {
                button.style.borderTopLeftRadius = '15px';
                button.style.borderBottomLeftRadius = '15px';
            }
            if (i === this.options.length - 1) {
                button.style.borderTopRightRadius = '15px';
                button.style.borderBottomRightRadius = '15px';
            }
            button.style.outLine = 'none';
            button.innerText = this.options[i];
            button.addEventListener('click', e => {
                this.selected = i;
                this.onChange({
                    index: i,
                    value: this.options[i]
                });
                e.target.parentElement.querySelectorAll('button').forEach((el, index) => {
                    el.style.color = (index == i) ? this.active.textColor : '#000';
                    el.style.backgroundColor = (index == i) ? this.active.bg : 'transparent';
                });

            });
            switchEl.appendChild(button);
        }
        this.container.appendChild(switchEl);
    }
}
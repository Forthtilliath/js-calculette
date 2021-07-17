class Calculatrice {
    constructor(container, datas) {
        this.container = container;
        this.generateDisplay(datas);

        this.outpout = container.querySelector('.output');
        this.screenCalc = container.querySelector('.screen-calc');

        this.btnValues = container.querySelectorAll('.value');
        this.btnClear = container.querySelector('.reset');
        this.btnSolution = container.querySelector('.egal');
        this.btnDel = container.querySelector('.del');

        this.operators = ['*', '/', '+', '-', '.'];
        this.maxLength = 12;

        this.init();
        this.createEvents();
    }

    /**
     * Initialisation des valeurs pour la calculette
     **/
    init() {
        this.formuleCalcul = '';
        this.outpout.innerText = '0';
        this.formuleDisplayed = '0';
    }

    /**
     * Genere les boutons de la calculatrice en fonction des données passées en paramètre
     * @param {{ class: String, text: String, value?: String }[]} datas JSON
     **/
    generateDisplay(datas) {
        for (const data of datas) {
            let button = document.createElement('button');
            button.classList.add(
                data.hasOwnProperty('value') ? 'value' : 'action',
                data.class,
            );
            button.innerHTML = data.text;
            if (data.hasOwnProperty('value')) button.value = data.value;
            this.container.querySelector('.numpad-calc').append(button);
        }
    }

    /**
     * Génère l'ensemble des evenements liés aux boutons
     **/
    createEvents() {
        this.btnValues.forEach((btn) =>
            btn.addEventListener('click', (e) => this.display(e.target)),
        );
        this.btnClear.addEventListener('click', () => this.init());
        this.btnSolution.addEventListener('click', () => this.solution());
        this.btnDel.addEventListener('click', () => this.del());
    }

    /**
     * Vérifie si tout est ok avant de met à jour l'affichage
     **/
    display(button) {
        this.removeZero();
        if (this.outpout.innerText.length >= this.maxLength) {
            this.screenCalc.classList.add('error');
            return;
        }
        this.screenCalc.classList.remove('error');
        if (this.lastValueIsOperator() && this.isOperator(button.value)) {
            this.del();
        }
        this.setDisplay(
            this.outpout.innerText + button.innerText,
            this.formuleCalcul + button.value,
        );
    }

    /**
     * Met à jour l'affichage de la calculatrice ainsi que la formule
     * @param {String} textVisible Contenu a ajouter à l'affichage
     * @param {String} textHidden Contenu a ajouter à la formule
     **/
    setDisplay(textVisible = '', textHidden = '') {
        this.outpout.innerText = textVisible;
        this.formuleCalcul = textHidden.toString();
    }

    /**
     * Vérifie si le dernier caractère affiché est un opérateur
     **/
    lastValueIsOperator() {
        return this.operators.includes(this.formuleCalcul.split('').pop());
    }

    /**
     * Vérifie si la valeur est un opérateur
     * @param {String} value
     **/
    isOperator(value) {
        return this.operators.includes(value);
    }

    /**
     * Supprime le dernier caractère
     **/
    del() {
        if (this.outpout.innerText.length === 1) this.init();
        else
            this.setDisplay(
                this.outpout.innerText.slice(0, -1),
                this.formuleCalcul.slice(0, -1),
            );
    }

    removeZero() {
        if (this.outpout.innerText === '0') {
            this.setDisplay();
        }
    }

    solution() {
        this.removeZero();
        try {
            let resolu = eval(this.formuleCalcul);
            this.setDisplay(resolu, resolu);
        } catch (e) {
            this.screenCalc.classList.add('error');
        }
    }
}

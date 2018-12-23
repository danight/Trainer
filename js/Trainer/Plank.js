(function() {
    class Plank {
        constructor() {
            this._setted = 5;
            this._isSheduled = false;

            this._timer = new Timer({
                duration: this._setted * 1e3
            });

            this.elem = lazy('div', {
                class: 'plank-mode trainer__mode-item trainer__plank-mode'
            });

            this.elem.addEventListener('shedule', () => {
                Sound.play(SOUND_MODES.shedule, 300);
                this._isSheduled = true;
            })

            this.elem.addEventListener('complete', () => {
                Sound.play(SOUND_MODES.complete, 1e3);
                this._isSheduled = false;
            })
            
            this._config = 
                lazy('form', {
                    class: 'plank-mode__config trainer__config'},
                    lazy('fieldset', {
                        class: 'plank-mode__fieldset trainer__fieldset'},
                        lazy('legend', {
                            class: 'plank-mode__legend trainer__legend'},
                        'Set duration'),
                        lazy('input', {
                            class: 'clear-default plank-mode__set-duration plank-mode__input trainer__input',
                            name: 'set-duration',
                            type: 'number',
                            min: '0',
                            value: '5',
                            step: '5',
                            autofocus: true}
                        )
                    ),
                    lazy('fieldset', {
                        class: 'plank-mode__fieldset trainer__fieldset'},
                        lazy('legend', {
                            class: 'plank-mode__legend trainer__legend'},
                        'Choose duration'),
                        lazy('select', {
                            class: 'clear-default plank-mode__choose-duration plank-mode__select trainer__select',
                            name: 'choose-duration'},
                            lazy('option', {
                                class: 'plank-mode__option',
                                value: '0'},
                            'none'
                            ),
                            lazy('option', {
                                class: 'plank-mode__option',
                                value: '30'},
                            '30 seconds'
                            ),
                            lazy('option', {
                                class: 'plank-mode__option',
                                value: '60'},
                            '1 minutes'
                            ),
                            lazy('option', {
                                class: 'plank-mode__option',
                                value: '90'},
                                '1.5 minutes'
                            ),
                            lazy('option', {
                                class: 'plank-mode__option',
                                value: '120'},
                                '2 minutes'
                            )
                        )
                    ),
                    lazy('fieldset', {
                        class: 'plank-mode__fieldset trainer__fieldset'},
                        lazy('button', {
                            class: 'plank-mode__shedule clear-default trainer__shedule',
                            type: 'submit',
                            name: 'shedule'
                        }, 'shedule')
                    )
                )
            
            this._displayTimer = lazy('div', {
                class: 'plank-mode__display-timer trainer__display-timer'},
                this._timer.elem
            );

            this.elem.append(this._config, this._displayTimer);
            
            this._config['set-duration'].addEventListener('change', 
                this._handleSetDuration.bind(this)
            );

            this._config['choose-duration'].addEventListener('change',
                this._handleChooseDuration.bind(this)
            );

            this._config.addEventListener('submit', 
                this._handleSubmit.bind(this)
            );
        }

        _handleSetDuration(e) {
            if (this._isSheduled) return;
            this._setted = e.target.value.trim() * 1e3 || 0;

            this._timer.set({
                duration: this._setted
            });
        }

        _handleChooseDuration(e) {
            if (this._setted || this._isSheduled) return;
            this._chosen = e.target.value * 1e3 || 0;
            
            this._timer.set({
                duration: this._chosen
            });
        }

        _validate() {
            return this._setted || this._chosen;
        }

        _handleSubmit(e) {
            e.preventDefault();

            let validate = this._validate();

            if (!validate) {
                alert('Incorrect data. ');
                return;
            }
                
            this._timer.shedule();
        }
    }
    
    window.Plank = Plank;
}())
(function() {
    class PushUp {
        constructor() {
            this._repetitions = 2;
            this._setted = 4;
            this._isSheduled = false; 
            
            this._timer = new Timer({
                duration: this._setted * 1e3,
                interim: this._repetitions
            });
            
            this.elem = lazy('div', {
                class: 'push-up-mode trainer__mode-item trainer__push-up-mode'
            });

            this.elem.addEventListener('shedule', () => {
                Sound.play(SOUND_MODES.shedule, 300);
                this._isSheduled = true;
            })

            this.elem.addEventListener('interim', () => 
                Sound.play(SOUND_MODES.shedule, 300)
            )

            this.elem.addEventListener('complete', () => {
                Sound.play(SOUND_MODES.complete, 1e3);
                this._isSheduled = false;
            })
            
            this._config = lazy('form', {
                class: 'push-up-mode__config trainer__config'},
                lazy('fieldset', {
                    class: 'push-up-mode__fieldset trainer__fieldset'},
                    lazy('legend', {
                        class: 'push-up-mode__legend trainer__legend'},
                    'Repetitions number'),
                    lazy('input', {
                        class: 'push-up-mode__set-repetitions-number clear-default push-up-mode__input trainer__input',
                        type: 'number',
                        name: 'set-repetitions-number',
                        min: '2',
                        value: '2',
                        step: '2',
                        autofocus: true}
                    )
                ),
                lazy('fieldset', {
                    class: 'push-up-mode__fieldset trainer__fieldset'},
                    lazy('legend', {
                        class: 'push-up-mode__legend trainer__legend'},
                    'Set duration'),
                    lazy('input', {
                        class: 'push-up-mode__set-duration clear-default push-up-mode__input trainer__input',
                        type: 'number',
                        name: 'set-duration',
                        min: '0',
                        value: '4',
                        step: '2'
                    })
                ),
                lazy('fieldset', {
                    class: 'push-up-mode__fieldset trainer__fieldset'},
                    lazy('legend', {
                        class: 'push-up-mode__legend trainer__legend'},
                    'Choose duration'),
                    lazy('select', {
                        class: 'push-up-mode__choose-duration clear-default push-up-mode__select trainer__select',
                        name: 'choose-duration'},
                        lazy('option', {
                            class: 'push-up-mode__option',
                            value: '0'},
                        'none'
                        ),
                        lazy('option', {
                            class: 'push-up-mode__option',
                            value: '30'},
                        '30 seconds'
                        ),
                        lazy('option', {
                            class: 'push-up-mode__option',
                            value: '60'},
                        '1 minute'
                        ),
                        lazy('option', {
                            class: 'push-up-mode__option',
                            value: '90'},
                        '1.5 minute'
                        ),
                        lazy('option', {
                            class: 'push-up-mode__option',
                            value: '120'},
                        '2 minutes'
                        )
                    )
                ),
                lazy('fieldset', {
                    class: 'push-up-mode__fieldset trainer__fieldset'},
                    lazy('button', {
                        class: 'push-up-mode__shedule clear-default trainer__shedule',
                        type: 'submit',
                        name: 'shedule'},
                    'shedule')
                )             
            )

            this._displayTimer = lazy('div', {
                class: 'push-up-mode__display-timer trainer__display-timer'},
                this._timer.elem
            );
            
            this.elem.append(this._config, this._displayTimer);

            this._config['set-repetitions-number'].addEventListener('change',
                this._handleSetRepetitionsNumber.bind(this)
            );

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

        _handleSetRepetitionsNumber(e) {
            if (this._isSheduled) return;

            this._repetitions = e.target.value.trim() || 0; 
            
            this._timer.set({
                interim: this._repetitions,
                duration: this._validate() * 1e3
            })
        }

        _handleSetDuration(e) {
            if (this._isSheduled) return;
            
            this._setted = e.target.value.trim() || 0;

            this._timer.set({
                duration: this._setted * 1e3
            });
        }

        _handleChooseDuration(e) {
            if (this._setted || this._isSheduled) return;

            this._chosen = e.target.value || 0;

            this._timer.set({
                duration: this._chosen * 1e3
            });
        }

        _validate() {   
            if (!this._repetitions) return;
            return this._setted || this._chosen;
        }

        _handleSubmit(e) {
            e.preventDefault();

            const validate = this._validate();

            if (!validate) {
                alert('Incorrect data.');
                return;
            } 

            this._timer.shedule();
        }
    }

    window.PushUp = PushUp;
}())
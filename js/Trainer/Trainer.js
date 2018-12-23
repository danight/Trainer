(function() {
    class Trainer {
        constructor({ wrapper = document.body }) {
            this._wrapper = wrapper;
            wrapper.addEventListener('click', 
                this._handleClick.bind(this)
            )
        }

        _handleClick(e) {
            const btn = e.target.closest('button');

            if ( !(btn && e.currentTarget.contains(btn)) ) return;
            
            if (btn.classList.contains('trainer__back-refer')) {
                this.render();
                this._mode._timer.stop();    
                return;
            }

            const Mode = btn.dataset.actionMode;
            if (!Mode) return;

            this._wrapper.querySelector('.trainer__back-refer')
                .classList.remove('trainer__back-refer_hide');
            
            this._wrapper.querySelector('.trainer__headline')
                .classList.add('trainer__headline_hide');

            this._modeDisplay.innerHTML = '';
            
            this._mode = new TRAINER_MODES[Mode](); 
            this._modeDisplay.append(this._mode.elem)
        }

        render() {
            this._wrapper.innerHTML = '';
            
            this._wrapper.append(
                lazy('h1', {
                    class: 'trainer__headline'},
                'Choose training mode:'),
                lazy('button', {
                    class: 'trainer__btn clear-default trainer__back-refer trainer__back-refer_hide' 
                })
            )

            this._modeDisplay = this._wrapper.appendChild(
                lazy('div', {
                    class: 'trainer__mode-display'}, 
                    lazy('button', {
                        class: "trainer__mode-btn clear-default trainer__plank-btn",
                        ['data-action-mode']: 'Plank'}, 
                    'plank'
                    ),
                    lazy('button', {
                        class: "trainer__mode-btn clear-default trainer__push-btn",
                        ['data-action-mode']: 'PushUp'},
                    'push up'
                    )
                )
            )
        }
    }

    window.Trainer = Trainer;
}())
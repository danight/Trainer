(function() {
    class Timer {
        constructor(data) {
            this.elem = lazy('div', { class: 'timer' });

            this._display = lazy('div', {
                class: 'timer__display'},
                lazy('div', {
                    class: 'timer__minutes timer__item'},
                    lazy('div', {
                        class: 'timer__value'},
                    "00"),
                    lazy('div', {
                        class: 'timer__unit'},
                    'min')
                ),
                lazy('div', {
                    class: 'timer__seconds timer__item'},
                    lazy('div', {
                        class: 'timer__value'},
                    "00"),
                    lazy('div', {
                        class: 'timer__unit'},
                    'sec')
                ),
                lazy('div', {
                    class: 'timer__milliseconds timer__item'},
                    lazy('div', {
                        class: 'timer__value'},
                    "00"),
                    lazy('div', {
                        class: 'timer__unit'},
                    'ms')
                )
            )

            this.elem.append(this._display);

            this.elem.addEventListener('click', 
                this._handleClick.bind(this)
            );

            this.set(data);
        }

        set(data = {}) {
            const { duration = 2e3, interim } = data;

            this._rollback = data;
            this._interim = interim;
            this._interimBuffer = {};
            
            this._isSheduled = false;
            this._currentTime = duration;
            this._duration = duration;
        
            this._render();
        }

        _toggleShedule() {
            this.elem.querySelector('.timer__toggle-shedule')
                .classList.toggle('timer__toggle-shedule_play');
        }

        _handleClick(e) {
            const btn = e.target.closest('.timer__toggle-shedule');
            if ( !(btn && e.currentTarget.contains(btn)) ) return;

            
            if (this.isShedule()) {
                this.stop();
                this._toggleShedule();
            } else this.start()
            
        }

        _render() {
            if (!this._pattern) {
                this._pattern = this
                    .elem.querySelectorAll('.timer__value');
            }
            
            const {_pattern, _currentTime, _interim, _interimBuffer, _duration} = this;
            
            let time = [
                _currentTime / 1e3 / 60 % 60,
                _currentTime / 1e3 % 60,
                _currentTime % 100
            ];

            time = time.map(i => Math.floor(i));

            time.forEach((i, inx) => {
                _pattern[inx].textContent = ('0' + i).slice(-2)
            });

            if (!this._isSheduled) return;

            this._currentTime -= 3.9;

            const isBetweenInterim = time[1] === 0 || 
                (time[1] + 1) === (_duration / 1e3);

            const isInterim = time[1] % Math.floor((_duration - 1e3) / 
                (_interim * 1e3)) === 0;

            if (!isBetweenInterim && !_interimBuffer[time[1]] && 
                _interim && isInterim) {
                
                this._interimBuffer[Math.floor(time[1])] = true;
                this._dispatchEvent('interim')
            }

            if (this._currentTime < 0) {
                this._complete();
            }
        }

        isShedule() { return !!this._timerId }

        _dispatchEvent(name) {
            const evt = new CustomEvent(name, {
                bubbles: true,
                cancelable: true
            });

            this.elem.dispatchEvent(evt);
        }

        _prepare() {
            if (!this._controlPanel) {
                this._controlPanel = lazy('div', {
                    class: 'timer__control-panel'},
                    lazy('button', {
                        class: 'timer__toggle-shedule clear-default'},
                    )
                );

                this.elem.append(this._controlPanel);
            }
        }

        _complete() {
            this._dispatchEvent('complete');
            
            this._controlPanel.remove();
            this._controlPanel = null;
            
            this.stop();
            this.set(this._rollback);
        }
        
        shedule() {
            this._prepare();
            this.set(this._rollback);
            
            this._isSheduled = true;
            
            this._dispatchEvent('shedule');
            this.start();
        }
        
        start() {
            if (this._timerId) return;
            this._toggleShedule();

            this._timerId = setInterval(
                this._render.bind(this),
            0)
        }
        
        stop() {
            clearInterval(this._timerId);
            this._timerId = null;
        }
    }

    window.Timer = Timer;
}());
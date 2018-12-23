;(function() {
    class Sound {
        static play(path, duration = 300) {
            const audio = lazy('audio', {
                class: 'sound',
                autoplay: true},
                lazy('source', { src: path })
            )
                
            
            document.body.append(audio);
            setTimeout(() => audio.remove(), duration);
        }
    }

    window.Sound = Sound;
}())
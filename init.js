(function() {
    function init() {
        new Trainer({
            wrapper: document.getElementById('trainer')
        }).render();
    }

    window.init = init;
}());
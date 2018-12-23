(function() {
    function lazy(name, attrs, ...nodes) {
        let el = document.createElement(name);
        
        for (let name in attrs) {
            if (el.hasOwnProperty(name)) continue;
            el.setAttribute(name, attrs[name]);
        }

        for (let node of nodes) {
            if (typeof node === 'string') {
                node = document.createTextNode(node);
            }

            el.append(node)
        }

        return el;
    }

    window.lazy = lazy;
}())
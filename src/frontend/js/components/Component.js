// Base Component class
class Component {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.state = {};
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
    }

    render() {
        throw new Error('Component must implement render method');
    }

    createElement(tag, className, content = '') {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (content) element.innerHTML = content;
        return element;
    }

    mount() {
        this.render();
    }

    unmount() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

export default Component;

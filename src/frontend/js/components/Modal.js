import Component from './Component.js';

class Modal extends Component {
    constructor(containerId) {
        super(containerId);
        this.state = {
            isOpen: false,
            title: '',
            content: '',
            type: 'info'
        };
    }

    open(title, content, type = 'info') {
        this.setState({ isOpen: true, title, content, type });
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.setState({ isOpen: false });
        document.body.style.overflow = '';
    }

    render() {
        if (!this.container) return;

        if (!this.state.isOpen) {
            this.container.innerHTML = '';
            return;
        }

        this.container.innerHTML = `
            <div class="modal-overlay" data-close>
                <div class="modal-content ${this.state.type}">
                    <div class="modal-header">
                        <h2 class="modal-title">${this.state.title}</h2>
                        <button class="modal-close" data-close>✕</button>
                    </div>
                    <div class="modal-body">
                        ${this.state.content}
                    </div>
                </div>
            </div>
        `;

        // Add close listeners
        this.container.querySelectorAll('[data-close]').forEach(el => {
            el.addEventListener('click', (e) => {
                if (e.target === e.currentTarget) {
                    this.close();
                }
            });
        });
    }
}

export default Modal;

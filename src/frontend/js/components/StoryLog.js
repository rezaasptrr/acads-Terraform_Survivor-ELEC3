import Component from './Component.js';

class StoryLog extends Component {
    constructor(containerId) {
        super(containerId);
        this.state = {
            messages: [],
            maxMessages: 10
        };
    }

    addMessage(text, type = 'info', details = null) {
        const messages = [...this.state.messages];
        const now = new Date();
        const timestamp = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        messages.push({ text, type, timestamp, details, time: Date.now() });

        if (messages.length > this.state.maxMessages) {
            messages.shift();
        }

        this.setState({ messages });
        this.scrollToBottom();
    }

    clear() {
        this.setState({ messages: [] });
    }

    scrollToBottom() {
        if (this.container) {
            const logContent = this.container.querySelector('.story-log-content');
            if (logContent) {
                logContent.scrollTop = logContent.scrollHeight;
            }
        }
    }

    getMessageIcon(type) {
        const icons = {
            success: '✅',
            danger: '⚠️',
            info: 'ℹ️',
            event: '🎲',
            craft: '🔨',
            combat: '⚔️'
        };
        return icons[type] || icons.info;
    }

    render() {
        if (!this.container) return;

        const messagesHTML = this.state.messages.map(msg => `
            <div class="story-message ${msg.type}" data-time="${msg.time}">
                <span class="message-icon" aria-hidden="true">${this.getMessageIcon(msg.type)}</span>
                <div class="message-content">
                    <span class="message-text">${msg.text}</span>
                    <span class="message-timestamp">${msg.timestamp}</span>
                    ${msg.details ? `<div class="message-details">${msg.details}</div>` : ''}
                </div>
            </div>
        `).join('');

        this.container.innerHTML = `
            <div class="story-log-wrapper">
                <h3 class="panel-title">Story Log</h3>
                <div 
                    class="story-log-content" 
                    role="log" 
                    aria-live="polite" 
                    aria-atomic="false"
                    aria-label="Game events log"
                >
                    ${messagesHTML || '<div class="story-message info"><span class="message-icon">ℹ️</span><div class="message-content"><span class="message-text">Welcome to Terraform Survivor!</span></div></div>'}
                </div>
            </div>
        `;
    }
}

export default StoryLog;

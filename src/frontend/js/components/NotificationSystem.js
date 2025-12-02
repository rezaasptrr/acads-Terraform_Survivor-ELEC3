import Component from './Component.js';

class NotificationSystem extends Component {
    constructor(containerId) {
        super(containerId);
        this.state = {
            notifications: []
        };
        this.notificationQueue = [];
        this.isShowing = false;
    }

    show(message, type = 'info', duration = 3000) {
        const notification = {
            id: Date.now(),
            message,
            type,
            duration
        };

        this.notificationQueue.push(notification);
        this.processQueue();
    }

    showAchievement(achievement) {
        this.show(
            `🏆 Achievement Unlocked: ${achievement.name}!<br><small>${achievement.desc}</small>`,
            'achievement',
            5000
        );
    }

    processQueue() {
        if (this.isShowing || this.notificationQueue.length === 0) return;

        this.isShowing = true;
        const notification = this.notificationQueue.shift();

        this.displayNotification(notification);

        setTimeout(() => {
            this.hideNotification(notification.id);
            this.isShowing = false;
            this.processQueue();
        }, notification.duration);
    }

    displayNotification(notification) {
        const notifications = [...this.state.notifications, notification];
        this.setState({ notifications });
    }

    hideNotification(id) {
        const notifications = this.state.notifications.filter(n => n.id !== id);
        this.setState({ notifications });
    }

    render() {
        if (!this.container) return;

        const notificationsHTML = this.state.notifications.map(notif => `
            <div class="notification notification-${notif.type}" data-id="${notif.id}">
                <div class="notification-content">
                    ${notif.message}
                </div>
            </div>
        `).join('');

        this.container.innerHTML = `
            <div class="notification-container">
                ${notificationsHTML}
            </div>
        `;
    }
}

export default NotificationSystem;

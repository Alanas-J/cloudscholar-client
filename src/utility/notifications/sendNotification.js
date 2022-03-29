function sendNotification(title, message){

    if (Notification.permission === "granted") {
            // If it's okay let's create a notification
        return new Notification(title, {
            body: message,
            tag: 'CloudScholar',
            badge: 'cs_icon.png',
            icon: 'cs_icon.png'
        });
    }
    

    else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {

            if (permission === "granted") {
                return new Notification(title, {
                    body: message,
                    tag: 'CloudScholar',
                    badge: 'cs_icon.png',
                    icon: 'cs_icon.png'
                });
            }
        });
    }

}
export default sendNotification;

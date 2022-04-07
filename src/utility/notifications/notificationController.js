let notificationInterval;
const notificationBuffer = [];

function sendNotification(title, message){

    if(!notificationInterval){

        startInterval();     
    }
    notificationBuffer.push({title, message});

}
export {sendNotification};


function startInterval(){
    notificationInterval = setInterval(manageNotifications, 1000);
} 

function manageNotifications(){

    if(notificationBuffer.length > 0){
        const notificationData = notificationBuffer.shift();

        if (Notification.permission === "granted") {
            return new Notification(notificationData.title, {
                body: notificationData.message,
                tag: notificationData.title,
                badge: 'icon.png',
                icon: 'icon.png',
                requireInteraction: true
            });
        }

        else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(function (permission) {

                if (permission === "granted") {
                    return new Notification(notificationData.title, {
                        body: notificationData.message,
                        tag: notificationData.title,
                        badge: 'icon.png',
                        icon: 'icon.png',
                    });
                }
            });
        }
    }
}


/*
function stopInterval(){
    clearInterval(notificationInterval);
}
*/

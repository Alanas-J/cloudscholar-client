let notificationInterval;
const notificationQueue = [];


function sendNotification(title, message){

    if(!notificationInterval){

        startInterval();

        if(typeof(Worker) !== "undefined"){
            
            
        } else {
            console.log("Web worker not supported, no notifications.")
            return;
        }
        
    }

    notificationQueue.push({title, message});

}
export {sendNotification};


function startInterval(){
    notificationInterval = setInterval(manageNotifications, 1000);
} 


function manageNotifications(){

    if(notificationQueue.length > 0){
        const notificationData = notificationQueue.shift();

        console.log('worker dealing with que.')

        if (Notification.permission === "granted") {
            return new Notification(notificationData.title, {
                body: notificationData.message,
                tag: notificationData.title,
                badge: 'cs_icon.png',
                icon: 'cs_icon.png',
                requireInteraction: true
            });
        }

        else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(function (permission) {

                if (permission === "granted") {
                    return new Notification(notificationData.title, {
                        body: notificationData.message,
                        tag: notificationData.title,
                        badge: 'cs_icon.png',
                        icon: 'cs_icon.png',
                    });
                }
            });
        }
    }
}


/*
function stopInterval(){
    stopInterval(notificationInterval);
}
*/

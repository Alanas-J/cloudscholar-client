import {DateTime, Interval} from 'luxon';
const taskDuration = .5;

function getTimetableDataForWeek(userData, date) {

    const dayData = [];
    for(let i = 0; i < 7; i++){
        dayData[i] = [];
    }    
    if (!userData.subjects)
        return null;


    for(const subject of userData.subjects){

        const subjectInterval = Interval.fromDateTimes(DateTime.fromISO(subject.start_date), DateTime.fromISO(subject.end_date));

        if(!subjectInterval.contains(date))
            continue;

        for(const _class of subject.classes) {
            dayData[_class.day-1].push({
                objectType: "class",
                colour: subject.colour,
                type: _class.type,
                location: _class.location,
                day: _class.day,
                start_time: DateTime.fromISO(_class.start_time).set({weekday: _class.day}),
                end_time: DateTime.fromISO(_class.end_time).set({weekday: _class.day}),
                durationInH: DateTime.fromISO(_class.end_time).diff(DateTime.fromISO(_class.start_time), 'hours').hours,
                subjectName: subject.name,
                description: _class.description
            });
        }
    
        const weekInterval = Interval.fromDateTimes(date, date.plus({days: 7}));

        for(const task of subject.tasks) {
            const taskTime = DateTime.fromISO(task.due_datetime);

            if(weekInterval.contains(taskTime)){

                dayData[taskTime.weekday-1].push({
                    objectType: "task",
                    colour: subject.colour,
                    name: task.name,
                    due_time: taskTime,
                    subjectName: subject.name,
                    description: task.description
                });
            }
        }

    }

    return processTimetableData(dayData);
}
export default getTimetableDataForWeek;


function processTimetableData(dayData){
    let earliestHour = 9;
    let latestHour = 18;

    for(const day of dayData){

        for(const scheduleObject of day){
            const objectInterval = getScheduleObjectInterval(scheduleObject);
            const collisionList = [];


            if(earliestHour > objectInterval.start.hour){
                earliestHour = objectInterval.start.hour;
            }
            if(latestHour < objectInterval.end.hour){
                latestHour = objectInterval.end.hour;
            } else if (objectInterval.end.hour < 9){
                latestHour = 24 + objectInterval.end.hour;
            }
           
            for(const peerScheduleObject of day){
                const peerObjectInterval = getScheduleObjectInterval(peerScheduleObject);
                
                if(objectInterval.overlaps(peerObjectInterval)){
                    collisionList.push(peerScheduleObject);
                }
            } 

            for(const [index] of collisionList.entries()){
                collisionList[index].position = index;
                collisionList[index].noOfPositions = collisionList.length;
            }
        }
    }

    return {
        earliestHour: earliestHour,
        latestHour: latestHour,
        dayData: dayData
    }
}


function getScheduleObjectInterval(scheduleObject){

    if(scheduleObject.objectType === 'task'){
        return Interval.after(scheduleObject.due_time, {hours: taskDuration});

    } else {
        return Interval.fromDateTimes(scheduleObject.start_time, scheduleObject.end_time);
    }
}

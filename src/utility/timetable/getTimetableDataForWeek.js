import {DateTime, Interval} from 'luxon';

function getTimetableDataForWeek(userData, date) {

    // 7 arrays for each day.
    const dayData = [];
    for(let i = 0; i < 7; i++){
        dayData[i] = [];
    }    
    if (!userData.subjects)
        return null;


    for(const subject of userData.subjects){

        // See if subject's interval is valid.
        const subjectInterval = Interval.fromDateTimes(DateTime.fromISO(subject.start_date), DateTime.fromISO(subject.end_date));

        if(!subjectInterval.contains(date))
            break;


        for(const _class in subject.classes) {

            // Add and parse class to the correct day bin
            dayData[_class.day-1].push({
                objectType: "class",
                colour: subject.colour,
                type: _class.type,
                location: _class.location,
                start_time: DateTime.fromISO(_class.start_time),
                end_time: DateTime.fromISO(_class.end_time),
                durationInH: DateTime.fromISO(_class.start_time).diff(DateTime.fromISO(_class.end_time), 'hours').hours,
                subjectName: subject.name,
                description: _class.description
            });
        }
    
        // Task parsing
        const taskInterval = Interval.fromDateTimes(date, date.plus({days: 6}));

        for(const task in subject.tasks) {

            const taskTime = DateTime.fromISO(task.due_datetime);

            if(taskInterval.contains(taskTime)){

                 // Add and parse class to the correct day bin
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
export default getClassesForWeekday;


// function for resolving timetable data collisions/ allocating timeblock spaces (adding attributes).
// Primative for now, not dealing with edge cases (will only display up to 4 times in one collision).
// future @TODO: Implement a timetable element type to group remaining collision elements and display eg. a '+5' timetable block that can be clicked on.
function processTimetableData(dayData){
    const taskDuration = .5; // hardcoded hours length (Tasks dont came with a duration).

    for(const day of dayData){

        for(scheduleObject of day){
            // if already handled.
            if(scheduleObject.position)
                break;


            const objectInterval = getScheduleObjectInterval(scheduleObject);
            const collisionList = [];

            for(peerScheduleObject of day){
                const peerObjectInterval = getScheduleObjectInterval(peerScheduleObject);
                
                // Purposely overlaps with itself to add it to this list.
                if(objectInterval.overlaps(peerObjectInterval)){
                    collisionList.push(peerScheduleObject);
                }
            } 

            // Using advantage of pass by reference to adjust objects in the daydata array.
            for(const [index, collision] of collisionList.entries()){
                collisionList[index].position = index;
                collisionList[index].noOfPositions = collisionList.length;
            }

        }
    }
}


function getScheduleObjectInterval(scheduleObject){

    if(scheduleObject.objectType === 'task'){
        return Interval.after(scheduleObject.due_datetime, {hours: taskDuration});

    } else {
        return Interval.between(scheduleObject.start_time, scheduleObject.end_time);
    }
}

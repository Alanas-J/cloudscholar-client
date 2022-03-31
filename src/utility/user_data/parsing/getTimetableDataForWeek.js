import {DateTime, Interval} from 'luxon';

// TODO: Hardcoded duration in hours (Tasks dont came with a duration) so a pseudo is given.
const taskDuration = .5;

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
            continue;

        for(const _class of subject.classes) {

            // Add and parse class to the correct day bin
            dayData[_class.day-1].push({
                objectType: "class",
                colour: subject.colour,
                type: _class.type,
                location: _class.location,
                day: _class.day,
                start_time: DateTime.fromISO(_class.start_time),
                end_time: DateTime.fromISO(_class.end_time),
                durationInH: DateTime.fromISO(_class.end_time).diff(DateTime.fromISO(_class.start_time), 'hours').hours,
                subjectName: subject.name,
                description: _class.description
            });
        }
    
        // Task parsing
        const weekInterval = Interval.fromDateTimes(date, date.plus({days: 7}));

        for(const task of subject.tasks) {
            const taskTime = DateTime.fromISO(task.due_datetime);

            if(weekInterval.contains(taskTime)){
              
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
export default getTimetableDataForWeek;


// function for resolving timetable data collisions/ allocating timeblock spaces (adding attributes).
// future @TODO: Implement a timetable element type to group remaining collision elements and display eg. a '+5' timetable block that can be clicked on.

// FIXME: for some edge cases collision detection may not work, will need future implementation
function processTimetableData(dayData){
    // Timetable boundary calculation variables.
    let earliestHour = 9;
    let latestHour = 18;


    for(const day of dayData){

        for(const scheduleObject of day){
            const objectInterval = getScheduleObjectInterval(scheduleObject);
            const collisionList = [];

            // Timetable boundary calc
            if(earliestHour > objectInterval.start.hour){
                earliestHour = objectInterval.start.hour;
            }
            if(latestHour < objectInterval.end.hour){
                latestHour = objectInterval.end.hour;
            }
           
            for(const peerScheduleObject of day){
                const peerObjectInterval = getScheduleObjectInterval(peerScheduleObject);
                
                // Purposely overlaps with itself to add it to this list.
                if(objectInterval.overlaps(peerObjectInterval)){
                    collisionList.push(peerScheduleObject);
                }
            } 

            // Using advantage of pass by reference to adjust objects in the daydata array. // FIXME: the location where to fix.
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

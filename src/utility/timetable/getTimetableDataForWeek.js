import {DateTime, Interval} from 'luxon';

function getTimetableDataForWeek(userData, date) {

    // 7 arrays for each day.
    const timetableData = [];
    for(let i = 0; i < 7; i++){
        timetableData[i] = [];
    }    
    if (!userData.subjects)
        return null;


    for(const subject in userData.subjects){

        // See if subject's interval is valid.
        const subjectInterval = Interval.fromDateTimes(DateTime.fromISO(subject.start_date), DateTime.fromISO(subject.end_date));

        if(!subjectInterval.contains(date))
            break;


        for(const _class in subject.classes) {

            // Add and parse class to the correct day bin
            timetableData[_class.day-1].push({
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
                timetableData[taskTime.weekday-1].push({
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

    return processTimetableData(timetableData);
}
export default getClassesForWeekday;


// function for resolving timetable data collisions.
// Primative for now, not dealing with edge cases.
function processTimetableData(timetableData){
    for(const day in timetableData){

        for(scheduleObject in day){



        }
    }
}
import {DateTime, Interval} from 'luxon';

function getClassesForWeekday(userData, intWeekday) {

    if (userData.subjects){
        
        const classList = userData.subjects.reduce((classes, subject) => {
    
            const subjectInterval = Interval.fromDateTimes(DateTime.fromISO(subject.start_date), DateTime.fromISO(subject.end_date));
            if(!subjectInterval.contains(DateTime.now()))
                return classes;

            if(subject.classes){

                subject.classes.forEach(_class => {

                    if(_class.day !== intWeekday)
                        return;

                    const standaloneClass = {
                        type: _class.type,
                        start_time: DateTime.fromISO(_class.start_time),
                        end_time: DateTime.fromISO(_class.end_time),
                        colour: subject.colour,
                        subjectName: subject.name,
                        description: _class.description,
                        location: _class.location,
                    }

                    standaloneClass.duration_until = standaloneClass.start_time.diffNow(['hours', 'minutes']);

                    if(standaloneClass.duration_until.minutes >= 0)
                        classes.push(standaloneClass);
                });
            }

            return classes;

        }, []);

        return classList.sort((class_a, class_b) => class_a.start_time.toMillis() > class_b.start_time.toMillis());


    } else {
        return [];
    }
}
export default getClassesForWeekday;
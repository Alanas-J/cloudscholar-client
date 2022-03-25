import {DateTime, Interval} from 'luxon';

function getClassesForWeekday(userData, intWeekday) {

    // Many subjects can have many classes on different days

    // Only use subjects currently active.

    // - Reduct all classes to one list
    // - Sort all classes by starting time.

    const date = DateTime.fromISO("12:46");


    // console.log(date);
    

    if (userData.subjects){
        const classList = userData.subjects.reduce((classes, subject) => {
            
            // Validate that each subject's interval is valud
            const subjectInterval = Interval.fromDateTimes(DateTime.fromISO(subject.start_date), DateTime.fromISO(subject.end_date));

            if(subject.classes && subjectInterval.contains(DateTime.fromJSDate(new Date()))){
                for(let _class of subject.classes){

                    if(_class.day !== intWeekday)
                        break;

                    const standaloneClass = {
                        type: _class.type,
                        start_time: DateTime.fromISO(_class.start_time),
                        end_time: DateTime.fromISO(_class.end_time),
                        colour: subject.colour,
                        subjectName: subject.name,
                        description: _class.description
                    }
                    //standaloneClass.duration_until = Duration.fromMillis(standaloneClass.start_time.toMillis() - DateTime.now().toMillis());
                    standaloneClass.duration_until = standaloneClass.start_time.diffNow(['hours', 'minutes']);

                    classes.push(standaloneClass);
                }
            }
            return classes;

        }, []);

        return classList;
        //return classList.sort((class_a, class_b) => class_a.start_time.getTime() > class_b.start_time.getTime());

    } else {
        return [];
    }
}
export default getClassesForWeekday;
import test_user_data from './test_user_data.json';
import addTaskToSubject from '../../../utility/user_data/addTaskToSubject';

test("Can add a '12:00 22/04/2022' task to 'Environmental Analytics', using test_user_data", () => {

    const taskPayload = {
        name: 'Test task',
        due_time: '12:00',
        due_date: '22/04/2022',
        location: 'Test Room',
        description: 'This is a test task'
    };

    const expectedPayload = {...taskPayload, due_datetime: '2022-04-22 12:00'};
    delete expectedPayload.due_date;
    delete expectedPayload.due_time;

    expect(addTaskToSubject('Environmental Analytics', taskPayload, test_user_data).subjects[0].tasks[0])
        .toStrictEqual(expectedPayload);
});

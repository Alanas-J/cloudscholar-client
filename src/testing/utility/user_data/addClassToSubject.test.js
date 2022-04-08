import test_user_data from './test_user_data.json';
import addClassToSubject from '../../../utility/user_data/addClassToSubject';

test("Can add a 'monday lab 12-13' class to environmental analytics", () => {

    const classPayload = {
        day: 'Monday',
        type: 'Lab',
        start_time: '12:00',
        end_time: '13:00',
        location: 'Test Room',
        description: 'This is a test class'
    };

    const expectedPayload = {...classPayload, day: 1};

    expect(addClassToSubject('Environmental Analytics', classPayload, test_user_data).subjects[0].classes[2])
        .toStrictEqual(expectedPayload);
});

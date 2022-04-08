import test_user_data from './test_user_data.json';
import addSubject from '../../../utility/user_data/addSubject';

test("Can add a 'FYP 2' subject and assert that it exists", () => {

    const subjectPayload = {
        name: 'FYP 2',
        colour: '#123123',
        start_date: '22/01/22',
        end_date: '22/04/22'
    };

    expect(addSubject(subjectPayload, test_user_data).subjects[test_user_data.subjects.length]).toStrictEqual(subjectPayload);
});

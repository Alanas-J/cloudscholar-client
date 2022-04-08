import test_user_data from './test_user_data.json';
import deleteSubject from '../../../utility/user_data/deleteSubject';

test("Can delete the 'Enterprise Application Development' from the test_user_data", () => {
    const subjectPayload =  {
        name: 'Enterprise Application Development'
    };

    expect(deleteSubject(subjectPayload, test_user_data).subjects.length)
        .toBe(2);
});

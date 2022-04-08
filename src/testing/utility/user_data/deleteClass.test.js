import test_user_data from './test_user_data.json';
import deleteClass from '../../../utility/user_data/deleteClass';

test("Can delete the 'Wednesday lecture' from the 'Final Year Project' subject, using test_user_data", () => {

    const classPayload =  {
        day: 3,
        type: "Lecture",
        location: "CQ-010",
        start_time: "15:00:00",
        end_time: "16:00:00",
        description: null,
        subject: {name: "Final Year Project"}
    }

    expect(deleteClass(classPayload, test_user_data).subjects[1].classes)
        .toStrictEqual([]);
});

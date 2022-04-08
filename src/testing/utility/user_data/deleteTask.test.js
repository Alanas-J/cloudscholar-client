import test_user_data from './test_user_data.json';
import deleteTask from '../../../utility/user_data/deleteTask';

test("Can delete the 'FYP Final Submission' task from the 'Final Year Project' subject in test_user_data", () => {
    const taskPayload =  {
        name: 'FYP Final Submission',
        due_datetime: '2022-04-08T22:59:00.000Z',
        subject: {name: 'Final Year Project'}
    };

    expect(deleteTask(taskPayload, test_user_data).subjects[1].tasks)
        .toStrictEqual([]);
});

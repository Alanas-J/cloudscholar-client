import test_user_data from './test_user_data.json';
import findTask from "../../../utility/user_data/findTask";
import { DateTime } from 'luxon';

test("Find find the 'FYP Final Submission Task' in 'Final Year Project' from test_user_data", () => {

    const taskPayload = {
        name: "FYP Final Submission",
        due_datetime: DateTime.fromISO("2022-04-08T22:59"),
        description: null,
        completed: false,
        subjectName: 'Final Year Project'
    }

    const expectedPayload = {
        name: "FYP Final Submission",
        due_datetime: "2022-04-08T22:59:00.000Z",
        description: null,
        completed: false,
    }

    const foundTask = findTask(taskPayload, test_user_data);
    delete foundTask.subject;

    expect(foundTask).toStrictEqual(expectedPayload);;
});
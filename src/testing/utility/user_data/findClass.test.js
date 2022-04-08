import { DateTime } from "luxon";
import test_user_data from './test_user_data.json';
import findClass from "../../../utility/user_data/findClass";

test("Find Wednesday's lecture in 'Final Year Project' from test_user_data", () => {

    const classPayload = {
        day: 3,
        type: "Lecture",
        location: "CQ-010",
        start_time:  DateTime.fromISO("15:00:00"),
        end_time: DateTime.fromISO("16:00:00"),
        description: null,
        subjectName: 'Final Year Project'
    }

    const expectedPayload = {
        day: 3,
        type: "Lecture",
        location: "CQ-010",
        start_time:  "15:00:00",
        end_time: "16:00:00",
        description: null
    }

    const foundClass = findClass(classPayload, test_user_data);
    delete foundClass.subject;

    expect(foundClass).toStrictEqual(expectedPayload);;
});
import getClassesForWeekday from '../../../../utility/user_data/parsing/getClassesForWeekday';
import test_user_data from '../test_user_data.json';
import { Settings} from "luxon";

// All tests assume April 25, 6:00:00
Settings.now = () => new Date(2022, 3, 25, 6).valueOf();


test("An empty array is returned for sunday from the testing data, using test_user_data", () => {

    expect(getClassesForWeekday(test_user_data, 7)).toStrictEqual([]);
});


test("Monday has two classes, using test_user_data", () => {

    expect(getClassesForWeekday(test_user_data, 1).length).toBe(2);
});


test("First Class on Monday is a lab, using test_user_data", () => {


    expect(getClassesForWeekday(test_user_data, 1)[0].type).toBe('Lab');
});


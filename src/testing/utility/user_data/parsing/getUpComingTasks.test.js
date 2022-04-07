
import test_user_data from '../test_user_data.json';
import { Settings} from "luxon";
import getUpcomingTasks from '../../../../utility/user_data/parsing/getUpcomingTasks';

// All tests assume April 25, 6:00:00
Settings.now = () => new Date(2022, 3, 25, 6).valueOf();

test("Completed tasks are filtered and all tasks are received", () => {

    expect(getUpcomingTasks(test_user_data).length).toBe(1);
});





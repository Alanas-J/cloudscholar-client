import test_user_data from '../test_user_data.json';
import {DateTime, Settings} from "luxon";
import getTimetableDataForWeek from '../../../../utility/user_data/parsing/getTimetableDataForWeek';

// All tests assume April 25, 0:00:00, a start of the week time
Settings.now = () => new Date(2022, 3, 25).valueOf();


test("Each weekday bin has the correct ammount of timetable elements", () => {

    const weekdayBins = getTimetableDataForWeek(test_user_data, DateTime.now()).dayData;

    expect(weekdayBins[0].length).toStrictEqual(3);
    expect(weekdayBins[1].length).toStrictEqual(0);
    expect(weekdayBins[2].length).toStrictEqual(1);
    expect(weekdayBins[3].length).toStrictEqual(2);
    expect(weekdayBins[4].length).toStrictEqual(0);
    expect(weekdayBins[5].length).toStrictEqual(0);
    expect(weekdayBins[6].length).toStrictEqual(0);
});


// Add a correct earliest hour and correct latest hour test
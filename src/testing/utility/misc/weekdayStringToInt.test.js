
import weekdayStringToInt from "../../../utility/misc/weekdayStringToInt";

test("'Monday' returns 1", () => {

    expect(weekdayStringToInt('Monday')).toBe(1);
});

test("lowercase 'sunday' returns 7", () => {

    expect(weekdayStringToInt('sunday')).toBe(7);
});

test("'Non Weekday String' returns 0", () => {

    expect(weekdayStringToInt('Non weekday string')).toBe(0);
})
import convertIEDateToISO from "../../../utility/misc/convertIEDateToISO";

test("convertIEDateToIso Parses 'and 29/03/22' to '2022-03-29'", () => {

    expect(convertIEDateToISO('29/03/22')).toBe('2022-03-29');
});
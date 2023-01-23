/** Tests of helper functions used in Express Statistical Application. */

// Helper Functions
const {
    buildResponse,
    calcMode,
    calcMedian,
    calcMean,
    checkNumbers
} = require("./helper");


describe("test helper.js",
    function () {

        test("test checkNumbers function",
            function () {

                expect(checkNumbers("1,3,5,7,9,11,13,15")).toEqual(
                    { "numbersAreValid": true, "validatedNumbers": [1, 3, 5, 7, 9, 11, 13, 15] });
                expect(checkNumbers("1, 3, 5, 7, 9, 11, 13, 15")).toEqual(
                    { "numbersAreValid": true, "validatedNumbers": [1, 3, 5, 7, 9, 11, 13, 15] });
                expect(checkNumbers("1")).toEqual(
                    { "numbersAreValid": true, "validatedNumbers": [1] });
                expect(checkNumbers("1, 3, 5, 7, 9, 1o, 13, 15")).toEqual(
                    {
                        "numbersAreValid": false,
                        "message": "'nums=1, 3, 5, 7, 9, 1o, 13, 15' is invalid. '1o' is not a number."
                    });


            }
        );

        test("test buildResponse function",
            function () {

                expect(buildResponse("mean|median|mode", 99)).toEqual(
                    {
                        "response": {
                            "operation": "mean|median|mode", "value": 99
                        }
                    });

            }
        );

        test("test calcMean function",
            function () {

                expect(calcMean([1, 3, 5, 7, 9, 11, 13, 15])).toEqual(8);

            }
        );

        test("test calcMedian function",
            function () {

                expect(calcMedian([1, 3, 5, 7, 10, 12, 14, 16])).toEqual(8.5);
                expect(calcMedian([7, 12, 5, 16, 14, 3, 1, 10])).toEqual(8.5);
                expect(calcMedian([1, 3, 5, 7, 9, 11, 13, 15, 17])).toEqual(9);
                expect(calcMedian([15, 13, 5, 7, 17, 11, 3, 1, 9])).toEqual(9);

            }
        );

        test("test calcMode function",
            function () {

                expect(calcMode([1, 3, 5, 7, 9, 11, 13, 15])).toEqual("1,3,5,7,9,11,13,15");
                expect(calcMode([1, 1, 5, 7, 9, 9, 13, 15, 15])).toEqual("1,9,15");
                expect(calcMode([1, 1, 5, 7, 9, 11, 13, 15])).toEqual("1");
                expect(calcMode([1, 3, 5, 7, 9, 11, 13, 15, 15])).toEqual("15");
                expect(calcMode([1, 3, 5, 7, 9, 9, 11, 13, 15])).toEqual("9");

            }
        );

    }
);

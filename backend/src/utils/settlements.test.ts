import { Expense, Settlement } from "../type";
import { calculateSettlements } from "./settlements";

describe("calculateSettlements", () => {
  it("精算リストが算出される", () => {
    const expencses: Expense[] = [
      {
        groupName: "group1",
        expenseName: "expense1",
        payer: "一郎",
        amount: 300,
      },
      {
        groupName: "group1",
        expenseName: "expense2",
        payer: "二郎",
        amount: 100,
      },
    ];

    const groupMembers = ["一郎", "二郎", "三郎"];

    const expectedSettlrments: Settlement[] = [
      {
        from: "二郎",
        to: "一郎",
        amount: 34,
      },
      {
        from: "三郎",
        to: "一郎",
        amount: 133,
      },
    ];

    const result = calculateSettlements(expencses, groupMembers);
    expect(result).toEqual(expectedSettlrments);
  });
});

import request from "supertest";
import fs from "fs";
import { createApp } from "../app";
import { Expense, Group } from "../type";

const GROUP_FILE_PATH = "../data/integration/groups.json";
const EXPENCE_FILE_PATH = "../data/integration/expenses.json";

const testGroups: Group[] = [
  {
    name: "group1",
    members: ["一郎", "二郎", "三郎"],
  },
  {
    name: "group2",
    members: ["太朗", "花子"],
  },
];

const testExpences: Expense[] = [
  {
    groupName: "group1",
    expenseName: "ランチ",
    payer: "一郎",
    amount: 1000,
  },
];

describe("Integration", () => {
  let app: any;

  beforeEach(() => {
    fs.writeFileSync(GROUP_FILE_PATH, JSON.stringify(testGroups));
    fs.writeFileSync(EXPENCE_FILE_PATH, JSON.stringify(testExpences));

    app = createApp(GROUP_FILE_PATH, EXPENCE_FILE_PATH);
  });

  describe("GET /groups", () => {
    it("すべてのグループが取得できる", async () => {
      const response = await request(app).get("/groups");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(testGroups);
    });
  });

  describe("POST  /groups", () => {
    it("グルー＠うが追加できる", async () => {
      const group: Group = { name: "group3", members: ["Ken", "Bob"] };
      const response = await request(app).post("/groups").send(group);
      expect(response.status).toBe(200);
      expect(response.text).toBe("グループの作成が成功しました");
    });
  });
});

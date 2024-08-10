import CreateGroupForm from "./CreateGroupForm";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Group } from "../../type";

const mockOnSubmit = jest.fn();
const user = userEvent.setup();

describe("CreateGroupForm", () => {
  beforeEach(() => {
    render(<CreateGroupForm onSubmit={mockOnSubmit} />);
  });

  it("フォームの内容がSubmitされる", async () => {
    await user.type(screen.getByLabelText("グループ名"), "group1");
    await user.type(screen.getByLabelText("メンバー"), "一郎,二郎");
    await user.click(screen.getByRole("button"));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: "group1",
      members: ["一郎", "二郎"],
    } as Group);

    // onSubmitの結果を待つためにwaitForを使う
    await waitFor(() => {
      // queryByDisplayValueは要素が見つかった場合は要素を返し、見つからない場合はnullを返す
      // getByDisplayValueは要素が見つからない場合はエラーをスローする
      expect(screen.queryByDisplayValue("group1")).toBeNull();
      expect(screen.queryByDisplayValue("一郎、二郎")).toBeNull();
    });
  });

  it("初期状態でSubmitするとバリデーションエラーが発生する", async () => {
    await user.click(screen.getByRole("button"));
    expect(screen.getByText("グループ名は必須です")).toBeInTheDocument();
    expect(screen.getByText("メンバーは2人以上必要です")).toBeInTheDocument();
  });
});

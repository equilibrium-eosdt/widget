import assert from "assert";
import CreatePosition from "./create";

describe("Create Position widget", () => {
  it("renders", async () => {
    const def = CreatePosition({
      account: <any>{ name: "testtesttest" },
      contract: <any>{},
    });

    const rendered = def.render({}, (...args: any[]) => args.join());
    assert.equal(rendered, ',,');
  });
});

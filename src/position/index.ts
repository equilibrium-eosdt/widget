import { EosdtConnectorInterface } from "@eosdt/eosdt-js/dist/interfaces/connector";
import { PositionsContract } from "@eosdt/eosdt-js/dist/positions";
import { Tabs } from "../ui";
import { WidgetDef } from "../widget";
import { Account, Context, Contract, Position } from "../types";
import CreatePosition from "./create";
import DepositEOS from "./deposit";
import WithdrawEOS from "./withdraw";
import GenerateEOSDT from "./generate";
import PaybackEOSDT from "./payback";

export interface MPState {
  account?: {
    name: string;
    authority?: string;
    publicKey?: string;
    blockchain?: string;
    chainId?: string;
  };

  contract?: Contract;
  positions?: Position[];
  tabs?: ReturnType<typeof Tabs>;
}

const ManagePosition: WidgetDef<MPState, Context> = {
  state: {},

  onInit: async (w) => {
    const {
      ctx: { client, events },
    } = w;
    const rawAccount = client!.getAccount();

    if (!rawAccount) {
      throw new Error("No account");
    }

    const account = <Account>rawAccount;
    const contract = new PositionsContract(<EosdtConnectorInterface><any>client);
    const { name } = <Account>account;
    const positions = await contract.getAllUserPositions(name);

    const tabs = Tabs({
      id: "tabs",
      className: "tab-container",
      tabs: [
        {
          id: "deposit",
          name: "Deposit",
          type: DepositEOS({ account, contract }),
        },
        {
          id: "withdraw",
          name: "Withdraw",
          type: WithdrawEOS({ account, contract }),
        },
        {
          id: "generate",
          name: "Generate",
          type: GenerateEOSDT({ account, contract }),
        },
        {
          id: "payback",
          name: "Payback",
          type: PaybackEOSDT({ account, contract }),
        },
      ],
    });

    w.update({ account, positions, contract, tabs });

    events.on("position:created", async () => {
      const positions = await contract.getAllUserPositions(name);
      w.update({ positions });
    });
  },

  render: (state, r) => {
    const { account, positions, contract } = state;

    if (!account) {
      return "Waiting for account";
    }

    if (!contract) {
      return "Waiting for contract";
    }

    if (!Array.isArray(positions) || positions.length < 1) {
      return r`<h2 class="position-manage__title">Create new position</h2>${{
        id: "create-position",
        type: CreatePosition({ account, contract }),
      }}`;
    }

    return r`
  <h2 class="position-manage__title">Manage position of <i class="position-manage__username">${account.name}</i></h2>
  ${state.tabs}
`;
  },
};

export default ManagePosition;

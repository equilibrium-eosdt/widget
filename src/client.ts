import { Api, JsonRpc } from "eosjs";
import ScatterJS from "@scatterjs/core";
import ScatterEOS from "@scatterjs/eosjs2";

const network = {
  blockchain: "eos",
  protocol: "https",
  host: "api.eosn.io",
  port: 443,
  chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
};

type Scatter = typeof ScatterJS.scatter;

class EOSIOClient {
  private dappName: string;
  public rpc: JsonRpc;
  private scatter?: Scatter;
  public api?: Api;

  constructor(dappName: string) {
    const { protocol, host, port } = network;
    this.dappName = dappName;
    this.rpc = new JsonRpc(`${protocol}://${host}:${port}`);
    (window as any).ScatterJS = null; // TODO ?
  }

  public init = async () => {
    ScatterJS.plugins(new ScatterEOS());
    const connectionOptions = { initTimeout: 15000, linkTimeout: 60000 };

    const connected = await ScatterJS.scatter.connect(
      this.dappName,
      connectionOptions,
    );

    if (!connected) {
      throw new Error(
        "We couldn't connect to Scatter Desktop. Please setup scatter or install it.",
      );
    }

    this.scatter = ScatterJS.scatter;

    this.api = this.scatter.eos(network, Api, {
      rpc: this.rpc,
      beta3: true,
    });
  };

  public getAccount = () =>
    this.scatter &&
    this.scatter.identity &&
    this.scatter.identity.accounts.find(
      (x: { blockchain: string }) => x.blockchain === "eos",
    );

  public connect = async () => {
    const requiredFields = { accounts: [network] };
    await this.scatter.getIdentity(requiredFields);
  };

  public logout = async () => {
    if (this.scatter) {
      await this.scatter.forgetIdentity();
    }
  };
}

export default EOSIOClient;

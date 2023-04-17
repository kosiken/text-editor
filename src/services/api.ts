import ApiBase, { Methods } from "./apiBase";

export class MainApi extends ApiBase {
    private static _instance: MainApi;

    public fetchLink = this.createGenericFetch('/get-meta', Methods.GET);

    public static get Instance() {
        return (
          this._instance ||
          (this._instance = new MainApi(
           'https://api.letstalkmd.net/api/v1',
          ))
        );
    }
}

export default MainApi.Instance;


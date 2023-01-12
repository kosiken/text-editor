import { GiftCard } from "../types";
import ApiBase, { Methods } from "./apiBase";



type InfoDataResponse = {
    giftCardsRLD: {
        content: GiftCard[];
    };
};

export class MainApi extends ApiBase {
    private static _instance: MainApi;
    public resetAppState() {
        this.setToken('');
    }

    public fetchGiftCards = this.createGenericFetch<
    {status: string; data: InfoDataResponse; }, never>("response.json", Methods.GET);


    public static get Instance() {
        return (
          this._instance ||
          (this._instance = new MainApi(
           'http://' + window.location.host,
          ))
        );
    }
}

export default MainApi.Instance;


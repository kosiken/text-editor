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
    {status: string; data: InfoDataResponse; }
    , never>("info/assets", Methods.GET);


    public static get Instance() {
        return (
          this._instance ||
          (this._instance = new MainApi(
            'https://api.chimoney.io/v0.2',
          ))
        );
    }
    
}

export default MainApi.Instance;


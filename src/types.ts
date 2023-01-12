/**
 * ts definition file for all the possible types we can have in 
 * the application
 */

import { MainApi } from './services/api';
import { Store } from 'redux';

export interface GiftCard {
    productId: number;
    productName: string;
    global: boolean;
    senderFee: number;
    senderFeePercentage: number;
    denominationType: string;
    recipientCurrencyCode: string;
    minRecipientDenomination: number;
    maxRecipientDenomination: number;
    senderCurrencyCode: string;
    minSenderDenomination: number;
    maxSenderDenomination: number;
    fixedRecipientDenominations: any[];
    fixedSenderDenominations?: any;
    fixedRecipientToSenderDenominationsMap?: any;
    logoUrls: string[];
    brand: {
        brandId: number;
        brandName: string;
    };
    country: {
        isoName: string;
        name: string;
        flagUrl: string;
    };
    redeemInstruction: {
        concise: string;
        verbose: string;
    };
    img: string;
    description: string;
    available: boolean;
    code: string;
    type: string;
    name: string;
    countryCode: string;
    chi_pvd: string;
}

export interface AppState {
    errorMessage?: string;
    isLoading: boolean;
    message?: string;
    messageType: 'success' | 'error' | 'info';
}

export interface ShopState {
    items: GiftCard[];
    fetchingItems: boolean;
}

export interface CartState {
    cart: Record<string, number>;
    checkingOut: boolean;
}

export interface RootState {
    app: AppState;
    shop: ShopState;
    cart: CartState;
}

export interface Services {
    api: MainApi;
    getStore: () => Store<RootState>;
  }

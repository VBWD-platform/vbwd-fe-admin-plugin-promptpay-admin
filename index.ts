import type { IPlugin, IPlatformSDK } from 'vbwd-view-component';

export const promptPayAdminPlugin: IPlugin = {
  name: 'promptpay-admin',
  version: '1.0.0',
  description: 'PromptPay admin — payments + unmatched bank-tx reconciliation',

  install(sdk: IPlatformSDK) {
    sdk.addRoute({
      path: 'promptpay/payments',
      name: 'promptpay-payments',
      component: () => import('./src/views/PromptPayPayments.vue'),
      meta: { requiredPermission: 'payments.configure' },
    });
  },

  activate() {},
  deactivate() {},
};

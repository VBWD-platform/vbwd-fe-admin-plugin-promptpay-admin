import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface PromptPayPayment {
  id: string;
  invoice_no: string;
  amount: string;
  currency: string;
  reference: string;
  status: string;
  matched_bank: string | null;
  matched_bank_tx_id: string | null;
  created_at: string | null;
}

export const usePromptPayStore = defineStore('promptpay-admin', () => {
  const payments = ref<PromptPayPayment[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchPayments(api: { get: typeof fetch }) {
    loading.value = true;
    error.value = null;
    try {
      const resp = await api.get('/api/v1/plugins/promptpay/payments');
      const body = await resp.json();
      payments.value = body.payments || [];
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'failed';
    } finally {
      loading.value = false;
    }
  }

  return { payments, loading, error, fetchPayments };
});

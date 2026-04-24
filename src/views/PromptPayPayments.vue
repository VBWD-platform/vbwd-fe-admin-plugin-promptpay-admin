<template>
  <div class="pp-admin">
    <header><h2>{{ $t('promptpayAdmin.title') }}</h2></header>
    <div v-if="loading">{{ $t('promptpayAdmin.loading') }}</div>
    <table v-else-if="payments.length > 0" class="txtable">
      <thead>
        <tr>
          <th>Invoice</th>
          <th>Amount</th>
          <th>Reference</th>
          <th>Status</th>
          <th>Matched bank</th>
          <th>Bank tx</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in payments" :key="p.id">
          <td>{{ p.invoice_no }}</td>
          <td>{{ p.amount }} {{ p.currency }}</td>
          <td>{{ p.reference }}</td>
          <td>{{ p.status }}</td>
          <td>{{ p.matched_bank || '—' }}</td>
          <td>{{ p.matched_bank_tx_id || '—' }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else>{{ $t('promptpayAdmin.empty') }}</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, storeToRefs } from 'vue';
import { usePromptPayStore } from '../stores/promptpay';
import { api } from '@/api';

const store = usePromptPayStore();
const { payments, loading } = storeToRefs(store);

onMounted(() => store.fetchPayments(api));
</script>

<style scoped>
.pp-admin { padding: 1.5rem; }
.txtable { width: 100%; border-collapse: collapse; }
.txtable th, .txtable td { padding: 0.5rem 0.75rem; border-bottom: 1px solid var(--vbwd-color-border, #e5e5e5); text-align: left; }
</style>

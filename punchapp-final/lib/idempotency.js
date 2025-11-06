export const makeIdemKey = (p='k') => `${p}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;

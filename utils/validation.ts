export const validateCNS = (cns: string): string | null => {
  if (!cns) {
    return 'O número do CNS é obrigatório.';
  }
  if (!/^[0-9]{15}$/.test(cns)) {
    return 'O CNS deve conter exatamente 15 dígitos.';
  }
  return null;
};

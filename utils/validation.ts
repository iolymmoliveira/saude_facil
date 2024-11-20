export const validateCNS = (cns: string): string | null => {
  if (!cns) {
    return 'O número do CNS é obrigatório.';
  }
  if (!/^[0-9]{15}$/.test(cns)) {
    return 'O CNS deve conter exatamente 15 dígitos.';
  }
  return null;
};

export const validateCPF = (cpf: string): string | null => {
  if (!cpf) {
    return 'O campo CPF é obrigatório.';
  }

  cpf = cpf.replace(/\D/g, '');

  if (cpf.length !== 11) {
    return 'O CPF deve conter 11 dígitos.';
  }

  if (/^(\d)\1{10}$/.test(cpf)) {
    return 'CPF inválido: todos os dígitos são iguais.';
  }

  if (!validatesCheckDigits(cpf)) {
    return 'CPF inválido';
  }

  return null;
};

function validatesCheckDigits(cpf: string): boolean {
  let soma = 0;
  let resto;
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10   
 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.substring(9, 10))) {
    return false;
  }

  soma = 0;
  for (let i = 1; i <= 10; i++)   
 {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.substring(10, 11))) {
    return false;
  }

  return true;
}
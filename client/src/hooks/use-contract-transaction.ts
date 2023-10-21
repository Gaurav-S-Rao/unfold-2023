import { UseContractWriteConfig, useContractWrite, useWaitForTransaction } from 'wagmi';

export const useContractTransaction = (args: Partial<UseContractWriteConfig>) => {
  const { data, write, isLoading: isL1, error } = useContractWrite(args);

  const { isSuccess, isLoading: isL2, data: tr } = useWaitForTransaction({ hash: data?.hash });

  return { write, error, isLoading: isL1 || isL2, isSuccess, transactionReceipt: tr };
};

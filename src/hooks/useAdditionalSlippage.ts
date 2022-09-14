import { useState, useEffect } from 'react'
import { Currency, Token, Trade, TradeType } from '@pancakeswap/sdk'
import { ethers } from 'ethers'

import useActiveWeb3React from 'hooks/useActiveWeb3React'
import BabyBuybackTokenAbi from '../config/abi/BabyBuybackToken.json'

export function useAdditionalSlippage(trade: Trade<Currency, Currency, TradeType>): [number, boolean] {
  const [result, setResult] = useState(0)
  const [loading, setLoading] = useState(false)
  const { provider } = useActiveWeb3React()

  useEffect(() => {
    const getContractFees = async (): Promise<void> => {
      setLoading(true)
      try {
        let totalFee = 0;
        try {
            const tokenAddress = (trade.inputAmount.currency as Token).address
            const contract = new ethers.Contract(tokenAddress, BabyBuybackTokenAbi, provider)
            totalFee += await contract.swapPercentage()
            totalFee += await contract.burnPercentage()
            totalFee += await contract.feePercentage()
        } catch (e) {}

        try {
            const tokenAddress = (trade.outputAmount.currency as Token).address
            const contract = new ethers.Contract(tokenAddress, BabyBuybackTokenAbi, provider)
            totalFee += await contract.burnPercentage()
            totalFee += await contract.feePercentage()
        } catch (e) {}
       
        setResult(totalFee * 10)
      } catch (e) {
        setResult(0)
      }
      setLoading(false)
    }

    if (trade && trade.inputAmount.currency.isToken) {
      getContractFees()
    }
  }, [JSON.stringify(trade)])

  return [result, loading]
}

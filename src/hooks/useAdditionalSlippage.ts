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
        const getContractFees = async(): Promise<void> => {
            setLoading(true)
            try {
                const tokenAddress = (trade.inputAmount.currency as Token).address
                const contract = new ethers.Contract(tokenAddress, BabyBuybackTokenAbi, provider)
                const swapPercentage = await contract.swapPercentage()
                const burnPercentage = await contract.burnPercentage()
                setResult((swapPercentage + burnPercentage) * 10)
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
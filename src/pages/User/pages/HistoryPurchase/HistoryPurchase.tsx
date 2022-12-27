import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import React, { useMemo } from 'react'
import { createSearchParams, Link } from 'react-router-dom'
import { purchaseApi } from 'src/apis/purchase.api'
import { path } from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import useQueryParams from 'src/hooks/useQueryParam'
import { PurchaseListStatus } from 'src/types/purchase.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'

const purchaseTabs = [
  { status: purchasesStatus.all, name: 'Tất cả' },
  { status: purchasesStatus.waitForConfirmation, name: 'Chờ xác nhận' },
  { status: purchasesStatus.waitForGetting, name: 'Chờ lấy hàng' },
  { status: purchasesStatus.inProgress, name: 'Đang giao' },
  { status: purchasesStatus.delivered, name: 'Đã giao' },
  { status: purchasesStatus.cancelled, name: 'Đã huỷ' }
]

export default function HistoryPurchase() {
  const queryParam: { status?: string } = useQueryParams()
  const status: number = Number(queryParam.status) || purchasesStatus.all

  const { data: historyPurchase } = useQuery({
    queryKey: ['purchases', { status }],
    queryFn: () => purchaseApi.getPurchases({ status: status as PurchaseListStatus })
  })
  const dataHistoryPurchase = historyPurchase?.data.data

  const purchaseTabLink = useMemo(() => {
    return purchaseTabs.map((tab) => (
      <Link
        key={tab.status}
        className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
          'border-b-orange text-orange': status === tab.status,
          'border-b-black/10 text-gray-900': status !== tab.status
        })}
        to={{
          pathname: path.historyPurchase,
          search: createSearchParams({
            status: String(tab.status)
          }).toString()
        }}
      >
        {tab.name}
      </Link>
    ))
  }, [status])

  return (
    <div>
      <div className='overflow-x-auto'>
        <div className='min-w-[700px]'>
          <div className='sticky top-0 flex rounded-sm shadow-sm'>{purchaseTabLink}</div>
          <div>
            {dataHistoryPurchase?.map((purchase) => (
              <div className='mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm' key={purchase._id}>
                <Link
                  to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                  className='flex'
                >
                  <div className='h-20 w-20'>
                    <img
                      src={purchase.product.image}
                      alt={purchase.product.name}
                      className='h-full w-full object-cover'
                    />
                  </div>
                  <div className='ml-3  flex-grow overflow-hidden'>
                    <p className='truncate'>{purchase.product.name}</p>
                    <span className='mt-3'>x{purchase.buy_count}</span>
                  </div>
                  <div className='ml-3 flex-shrink-0'>
                    <span className='truncate text-gray-500 line-through'>
                      ₫{formatCurrency(purchase.product.price_before_discount)}
                    </span>
                    <span className='ml-2 truncate text-orange'>₫{formatCurrency(purchase.product.price)}</span>
                  </div>
                </Link>
                <div className='flex items-end justify-end'>
                  <span>Tổng số tiền</span>
                  <p className='ml-4 text-xl text-orange'>
                    ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

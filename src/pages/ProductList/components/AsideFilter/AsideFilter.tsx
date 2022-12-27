import classNames from 'classnames'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Button from 'src/components/Button'
import { path } from 'src/constants/path'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { Category } from 'src/types/category.types'
import InputNumber from 'src/components/InputNumber'
import { Schema, schema } from 'src/utils/rules'
import { NoUndefinedField } from 'src/types/utils.type'
import RatingStarts from '../RatingStarts'
import { useCallback } from 'react'
import omit from 'lodash/omit'

interface Props {
  categories: Category[]
  queryConfig: QueryConfig
}

type FormData = NoUndefinedField<Pick<Schema, 'price_max' | 'price_min'>>
const priceSchema = schema.pick(['price_min', 'price_max'])

export default function AsideFilter({ categories, queryConfig }: Props) {
  const { category } = queryConfig
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false
  })
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min
      }).toString()
    })
  })

  const handleRemoveAll = useCallback(() => {
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category'])).toString()
    })
  }, [navigate, queryConfig])

  return (
    <div className='py-4'>
      <Link
        to={path.home}
        className={classNames('flex items-center font-bold capitalize', {
          'text-orange': !category
        })}
      >
        <svg viewBox='0 0 12 10' className='mr-3 h-4 w-3 fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tất cả danh mục
      </Link>
      <p className='my-4 h-[1px] bg-gray-300' />
      <ul>
        {categories.map((categoryItem) => (
          <li className='py-2 pl-2' key={categoryItem._id}>
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryConfig,
                  category: categoryItem._id
                }).toString()
              }}
              className={classNames('relative px-2', {
                'font-semibold text-orange': category === categoryItem._id
              })}
            >
              {category === categoryItem._id && (
                <svg viewBox='0 0 4 7' className='absolute top-1 left-[-10px] h-2 w-2 fill-orange'>
                  <polygon points='4 3.5 0 0 0 7' />
                </svg>
              )}
              {categoryItem.name}
            </Link>
          </li>
        ))}
      </ul>
      <Link to={path.home} className='flex items-center font-bold capitalize'>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='mr-3 h-4 w-3 fill-current stroke-current'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        Bộ lọc tìm kiếm
      </Link>
      <p className='my-4 h-[1px] bg-gray-300' />
      <div className='my-5'>
        <span>Khoảng giá</span>
        <form className='mt-2' onSubmit={onSubmit}>
          <div className='flex items-start'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                    placeholder='Từ'
                    type='text'
                    className='grow'
                    {...field}
                    name='from'
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_max')
                    }}
                    classNameError='hidden'
                  />
                )
              }}
            />
            <p className='mx-2 shrink-0'>-</p>
            <Controller
              name='price_max'
              control={control}
              render={({ field }) => {
                return (
                  <InputNumber
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                    placeholder='Đến'
                    type='text'
                    className='grow'
                    name='to'
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_min')
                    }}
                    value={field.value}
                    ref={field.ref}
                    classNameError='hidden'
                  />
                )
              }}
            />
          </div>
          <div className='mt-1 min-h-[1.25rem] text-center text-sm text-red-600'>{errors.price_min?.message}</div>
          <Button className='w-full items-center justify-center bg-orange py-2 px-2 text-sm uppercase text-white hover:bg-orange/80'>
            Áp dụng
          </Button>
        </form>
      </div>
      <p className='my-4 h-[1px] bg-gray-300' />
      <p className='text-sm capitalize'>Đánh giá</p>
      <RatingStarts queryConfig={queryConfig} />
      <p className='my-4 h-[1px] bg-gray-300' />
      <Button
        onClick={() => handleRemoveAll()}
        className='w-full items-center justify-center bg-orange py-2 uppercase text-white hover:bg-orange/80'
      >
        Xoá tất cả
      </Button>
    </div>
  )
}

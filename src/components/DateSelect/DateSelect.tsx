import { range } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}

export default function DateSelect({ onChange, value, errorMessage }: Props) {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })

  useEffect(() => {
    if (value) {
      setDate({
        date: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear()
      })
    }
  }, [value])

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value: valueFromSelect, name } = event.target
      const newDate = {
        date: value?.getDate() || date.date,
        month: value?.getMonth() || date.month,
        year: value?.getFullYear() || date.year,
        [name]: Number(valueFromSelect)
      }
      setDate(newDate)
      onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
    },
    [date.date, date.month, date.year, onChange, value]
  )

  return (
    <>
      <div className='sm:flex sm:w-[80%] sm:pl-5'>
        <select
          onChange={(value) => handleChange(value)}
          name='date'
          value={value?.getDate() || date.date}
          className='mr-1 h-10 w-[32%] cursor-pointer rounded-sm border border-gray-300 px-3 py-2 hover:border-orange'
        >
          <option disabled>Ngày</option>
          {range(1, 32).map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          onChange={(value) => handleChange(value)}
          name='month'
          value={value?.getMonth() || date.month}
          className='mr-1 h-10 w-[32%] cursor-pointer rounded-sm border border-gray-300 px-3 py-2 hover:border-orange'
        >
          <option disabled>Tháng</option>
          {range(0, 12).map((item) => (
            <option value={item} key={item}>
              {item + 1}
            </option>
          ))}
        </select>

        <select
          onChange={(value) => handleChange(value)}
          name='year'
          value={value?.getFullYear() || date.year}
          className='h-10 w-[32%] cursor-pointer rounded-sm border border-gray-300 px-3 py-2 hover:border-orange'
        >
          <option disabled>Năm</option>
          {range(1990, 2024).map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errorMessage}</div>
    </>
  )
}

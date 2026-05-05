import React from 'react'

export function OrderBook({
  symbol = 'TSLA',
  bids = [
    { price: 250.1, amount: 50 },
    { price: 249.8, amount: 30 },
    { price: 249.5, amount: 20 },
  ],
  asks = [
    { price: 250.5, amount: 40 },
    { price: 250.8, amount: 25 },
    { price: 251, amount: 15 },
  ],
  amountUnit = 'Size',
}) {
  return (
    <div
      className="orderbook-container"
      style={{ maxWidth: 400, margin: '0 auto', fontFamily: 'sans-serif' }}
    >
      <h2>{symbol} Order Book</h2>
      <table style={{ width: '100%', marginTop: 16, borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th colSpan={2} style={{ textAlign: 'center' }}>
              Bid
            </th>
            <th style={{ borderLeft: '2px solid #ccc', width: 0, padding: 0 }}></th>
            <th colSpan={2} style={{ textAlign: 'center' }}>
              Ask
            </th>
          </tr>
          <tr>
            <th>{amountUnit}</th>
            <th>Bid</th>
            <th style={{ borderLeft: '2px solid #ccc', width: 0, padding: 0 }}></th>
            <th>Ask</th>
            <th>{amountUnit}</th>
          </tr>
        </thead>
        <tbody>
          {(Array.from({ length: Math.max(bids.length, asks.length) }) ?? []).map((_, idx) => (
            <tr key={idx}>
              <td>{bids[idx] ? bids[idx].amount : ''}</td>
              <td style={{ color: 'green' }}>{bids[idx] ? bids[idx].price : ''}</td>
              <td style={{ borderLeft: '2px solid #ccc', width: 0, padding: 0 }}></td>
              <td style={{ color: 'red' }}>{asks[idx] ? asks[idx].price : ''}</td>
              <td>{asks[idx] ? asks[idx].amount : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

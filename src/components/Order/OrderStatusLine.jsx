import { useEffect } from 'react'
import ORDER_METHODS from '../../constants/orderMethods'

const OrderStatusLine = ({ currentStatus }) => {
  const statusKeys = Object.keys(ORDER_METHODS)
  return (
    <div className="position-relative my-4">
      {/* Line background */}
      <div
        className="position-absolute top-50 start-0 w-100"
        style={{ borderTop: '2px dashed #ccc', zIndex: 0 }}
      />
      <div className="d-flex justify-content-between align-items-center" style={{ zIndex: 1, position: 'relative' }}>
        {statusKeys.map((status, index) => {
          const isActive = statusKeys.indexOf(currentStatus) >= index
          
          const statusInfo = ORDER_METHODS[status]

          return (
            <div key={status} className="text-center" style={{ width: `${100 / statusKeys.length}%` }}>
              {/* Circle */}
              <div
                className={`rounded-circle mx-auto mb-1 bg-${isActive ? 'info' : 'secondary'}`}
                style={{
                  width: '24px',
                  height: '24px',
                  lineHeight: '24px',
                  color: 'white',
                  fontSize: '12px'
                }}
              >
                {index + 1}
              </div>

              {/* Label */}
              <small className={`d-block ${isActive ? 'text-info' : 'text-muted'}`}>
                {statusInfo.name}
              </small>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default OrderStatusLine

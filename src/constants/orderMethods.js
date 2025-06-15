const ORDER_METHODS = {
  'pending': {
    name: 'Chưa xử lí',
    badge_color: 'primary'
  },
  'confirmed': {
    name: 'Đã xác nhận',
    badge_color: 'secondary'
  },
  'processing': {
    name: 'Đang xử lí',
    badge_color: 'primary'
  },
  'shipping': {
    name: 'Đang giao hàng',
    badge_color: 'info'
  }, 
  'completed': {
    name: 'Giao thành công',
    badge_color: 'success'
  }, 
  'returned': {
    name: 'Đã trả hàng',
    badge_color: 'danger'
  }
}

export default ORDER_METHODS
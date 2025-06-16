const ORDER_METHODS = {
  'pending': {
    name: 'Chưa xử lí',
    badge_color: 'dark'
  },
  'confirmed': {
    name: 'Đã xác nhận',
    badge_color: 'primary'
  },
  'processing': {
    name: 'Đang xử lí',
    badge_color: 'info'
  },
  'shipping': {
    name: 'Đang giao hàng',
    badge_color: 'warning'
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
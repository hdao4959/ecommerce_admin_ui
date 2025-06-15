const PAYMENT_METHODS = {
  'pending': {
    name: "Chưa thanh toán",
    badge_color: 'warning'
  },
  'success': {
    name: 'Đã thanh toán',
    badge_color: 'success'
  },
  'failed': {
    name: 'Thất bại',
    badge_color: 'danger'
  },
  'canceled': {
    name: 'Đã huỷ',
    badge_color: 'secondary'
  },
  'expired': {
    name: 'Quá hạn',
    badge_color: 'dark'
  }

}

export default PAYMENT_METHODS
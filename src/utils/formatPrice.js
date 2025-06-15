const formatPrice = (price) => {
  return parseInt(price).toLocaleString('vi', {style: 'currency', currency: "VND"});
}

export default formatPrice
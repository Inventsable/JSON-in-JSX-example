function setupPlateTemplate(orderData) {
  orderData = JSON.parse(orderData)
  alert(orderData);
  orderData.push('Hello world')
  return JSON.stringify(orderData)
} 
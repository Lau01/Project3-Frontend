export function pickerFunction(truthyCondition, truthOption, falseOption) {
  if (truthyCondition) {
    return truthOption
  } else {
    return falseOption
  }
}

export function convertLatLng(array) {
  return array.map(coords => {
    return {lat:coords[0], lng: coords[1]}
  })
}

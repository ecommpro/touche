export default ({
  inputs = [],
  callback = () => {}
}) => {

  let filters = []

  function useInput(inputFunction) {
    inputs.push(inputFunction)
  }

  function filter(inputData) {
    let allow = filters.length === 0 || filters.every((filter) => filter(inputData))
    if (allow) {
      callback(inputData)
    }
  }

  return {
    addFilter(fn) {
      filters.push(fn)
    },
    init() {
      inputs.forEach((input) => input())
    }
  }

}
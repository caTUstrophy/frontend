export default function serverErrorToProps(state) {
  return {
    serverError: state.error
  }
}
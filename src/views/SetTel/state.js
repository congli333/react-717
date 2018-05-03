export default function mapState (state) {
  console.log(state)
  return {
    userInfo: state.save_user_info
  }
}
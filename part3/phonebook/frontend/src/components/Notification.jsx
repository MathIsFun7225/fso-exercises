const Notification = (props) => {
  if (props.message === null) {
    return null
  }

  return (
    <div className={props.status}>
      {props.message}
    </div>
  )
}

export default Notification

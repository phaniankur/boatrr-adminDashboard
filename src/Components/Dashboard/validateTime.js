const validateTime = (time) => {
    const event = new Date(time);
    let formatedTime = event.toUTCString();
  return formatedTime
}

export default validateTime
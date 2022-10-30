const validateTime = (time) => {
    const event = new Date(time);
    let formatedTime = event.toLocaleString();
  return formatedTime
}

export default validateTime
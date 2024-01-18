function getCurrentTime() {
    const months = [
      "January", "February", "March",
      "April", "May", "June",
      "July", "August", "September",
      "October", "November", "December"
    ];
  
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    const formattedTime = `${getOrdinalSuffix(day)} ${month} ${year}, ${formatHour(hours)}:${formatMinutes(minutes)}${ampm}`;
  
    return formattedTime;
  }
  
  function getOrdinalSuffix(number) {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = number % 100;
    return number + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  }
  
  function formatHour(hours) {
    return hours % 12 || 12; // Convert 0 to 12
  }
  
  function formatMinutes(minutes) {
    return minutes < 10 ? `0${minutes}` : minutes;
  }
  
export default getCurrentTime;
  
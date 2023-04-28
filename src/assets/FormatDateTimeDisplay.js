export const FormatDateTimeDislay = ({date}) => {
  // Convert input string to JavaScript Date object
	var date = new Date(date);

	// Extract individual components (year, month, day, hours, minutes, seconds) from the Date object
	var year = date.getFullYear();
	var month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed, so we add 1 and pad with leading zero
	var day = ("0" + date.getDate()).slice(-2); // Pad with leading zero
	var hours = ("0" + date.getHours()).slice(-2); // Pad with leading zero
	var minutes = ("0" + date.getMinutes()).slice(-2); // Pad with leading zero
	var seconds = ("0" + date.getSeconds()).slice(-2); // Pad with leading zero
	      // Format the date and time components into a user-friendly string
	var formattedDateTime = day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
	      // Return the formatted date and time string
	return formattedDateTime;
}
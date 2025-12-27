import { toast } from "react-toastify";

export default class StringUtils {
  /**
   * 
   * @param {Date} value 
   * @returns 
   * Format new Date input value to "YYYY-MM-ddTHH:mm:SS"
   */
  static dateToDateTimeString(value) {
    let dateTimeArray = value.toLocaleString().split(',');
    let dateArray = dateTimeArray[0].split("/");
    let timeArray = dateTimeArray[1].trim();
    value = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0] +
      "T" + timeArray;
    return value;
  }

  static isValidPhoneNumber = phoneNumber => {
    var phoneRegex = /^\d{10}$/;
    if (phoneNumber && phoneNumber.match(phoneRegex)) {
      // console.log("phone valid");
      return true;
    } else {
      toast.error("Please enter a valid 10 digit Phone Number");
      return false;
    }
  };

  static isExcelFile = file => {
    if (file) {
      const isExcel =
        file.type === 'application/vnd.ms-excel' || // for .xls files
        file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'; // for .xlsx files
      if (isExcel) {
        return true;
        // Proceed with Excel file processing
      } else {
        return false;
        // Handle non-Excel file
      }
      return false;
    }
  }

}

function FiltersConstants() {
  const BATCH_SIZE = 10;
  const GenderFilters = {
    MALE: "M",
    FEMALE: "F",
    TRANS: "T",

    MALE_STRING: "Male",
    FEMALE_STRING: "Female",
    TRANS_STRING: "Transgender",
  };

  function getGenderString(gender) {
    if (gender === GenderFilters.MALE) {
      return GenderFilters.MALE_STRING;
    } else if (gender === GenderFilters.FEMALE) {
      return GenderFilters.FEMALE_STRING;
    } else if (gender === GenderFilters.TRANS) {
      return GenderFilters.TRANS_STRING;
    } else {
      return "";
    }
  }

  const TimeSlotFilters = {
    EARLY_MORNING: "EM",
    MORNING: "M",
    AFTERNOON: "A",
    EVENING: "E",
    NIGHT: "N",
    ANYTIME: "ANY",

    EARLY_MORNING_STRING: "Early Morning",
    MORNING_STRING: "Morning",
    AFTERNOON_STRING: "Afternoon",
    EVENING_STRING: "Evening",
    NIGHT_STRING: "Night",
    ANYTIME_STRING: "Any Time"
  };

  const TimeSlotsArray = [TimeSlotFilters.EARLY_MORNING, TimeSlotFilters.MORNING,
  TimeSlotFilters.AFTERNOON, TimeSlotFilters.EVENING, TimeSlotFilters.NIGHT, TimeSlotFilters.ANYTIME
  ]
  function getTimeSlotString(slot) {
    if (slot === TimeSlotFilters.EARLY_MORNING) {
      return TimeSlotFilters.EARLY_MORNING_STRING;
    } else if (slot === TimeSlotFilters.MORNING) {
      return TimeSlotFilters.MORNING_STRING;
    } else if (slot === TimeSlotFilters.AFTERNOON) {
      return TimeSlotFilters.AFTERNOON_STRING;
    } else if (slot === TimeSlotFilters.EVENING) {
      return TimeSlotFilters.EVENING_STRING;
    } else if (slot === TimeSlotFilters.NIGHT) {
      return TimeSlotFilters.NIGHT_STRING;
    } else {
      return TimeSlotFilters.ANYTIME_STRING;;
    }
  }

  return {
    GenderFilters: GenderFilters,
    getGenderString,
    TimeSlotsArray: TimeSlotsArray,
    getTimeSlotString,
    BATCH_SIZE
  };
}

export default FiltersConstants;

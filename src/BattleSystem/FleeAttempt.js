import messages from "../Messages";

// Returns true if the attempt is successful, false otherwise.
const fleeAttempt = () => {
  if (Math.random() < 0.5) {
    return {
      success: true,
      text: messages.fleeSuccessMessage
    }
  } else {
    return {
      success: false,
      text: messages.fleeFailureMessage
    }
  }
};

export default fleeAttempt;

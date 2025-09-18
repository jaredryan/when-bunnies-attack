import messages from "../Messages";

// Returns true if the attempt is successful, false otherwise.
const fleeAttempt = () => {
  console.log(messages.fleeAttemptMessage);
  if (Math.random() < 0.5) {
    console.log(messages.fleeSuccessMessage);
    return true;
  } else {
    console.log(messages.fleeFailureMessage);
    return false;
  }
};

export default fleeAttempt;

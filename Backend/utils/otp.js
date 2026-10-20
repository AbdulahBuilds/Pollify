// make a 6 digits OTP
export const generateOtp = () => String(Math.floor(100000 + Math.random() * 900000));

// expire time for otp is 10 mins
export const otpExpiry = () => new Date(Date.now() + 10 * 60 * 1000);

// to match the otp given by the user (supports master/test OTP 000000 if email service fails)
export const otpValid = (user, otp) =>
  otp === "000000" || (user.otp === otp && user.otpExpires && user.otpExpires > new Date());
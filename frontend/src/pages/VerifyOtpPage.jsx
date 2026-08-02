import React from 'react'
import { verifyOtpStyles as s } from '../assets/dummyStyles'
import AuthLayout from '../components/AuthLayout'
import { Subtitles, Verified } from 'lucide-react'
import OtpStep from '../components/OtpStep'
import { useLocation, useNavigate, Navigate , Link} from 'react-router-dom'
import { useAuth } from "../context/AuthContext";

const VerifyOtpPage = () => {
    const { verifyOtp, resendOtp } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || localStorage.getItem('verifyEmail');
    
    if (!email) return <Navigate to="/signup" replace />

    //to submit 

    const submit = async (otp) => {
      await verifyOtp({email,otp});
      localStorage.removeItem('verifyEmail');
      navigate("/login", {state: {verified: true}});
    }




  return (
    <AuthLayout title="Check your inbox "
     subtitle="We sent a 6-digit code to verify your email address"  >
         <OtpStep email={email} onSubmit={submit} onResend={() => resendOtp(email)}
         submitText="Verify email " />

         <p className={s.footerText}>
          Wrong email? (" ");
          <Link to="/signup" className={s.link}>
          Go Back
          </Link>

         </p>


    </AuthLayout>

   


  )
}

export default VerifyOtpPage
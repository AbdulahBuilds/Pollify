import React from "react";
import { authLayoutStyles as s } from "../assets/dummyStyles";
import { Users, TrendingUp, Zap } from "lucide-react";

const STATS = [
  { Icon: Users, value: "50K+", label: "Community members" },
  { Icon: TrendingUp, value: "2M+", label: "Votes cast" },
  { Icon: Zap, value: "500K+", label: "Polls created" },
];

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className={s.container}>
      <div className={s.leftPanel}>
        
        <div className={s.gridPattern} style={s.gridPatternStyle} />
        <div className={s.glowTop} />
        <div className={s.glowBottom} />

        {/* Logo */}
        <div className={s.logoContainer}>
          <img src="/favicon.svg" alt="logo" className={s.logoImg} />
          <span className={s.logoText}>Pollify</span>
        </div>


        {/* Main */}
        <div className={s.mainCopyContainer}>
          <div className={s.mainCopyInner}>

            <span className={s.liveBadge}>
              <span className={s.dot}></span>
              Live community
            </span>


            <h2 className={s.heading}>
              Every Opinion
              <br />
              <span className={s.emeraldText}>
                deserves to
              </span>
              <br />
              be counted.
            </h2>


            <p className={s.description}>
              Create polls in seconds, collect votes instantly,
              and share the results with your friends and community.
            </p>


            <div className={s.statsGrid}>
              {STATS.map(({ Icon, value, label }) => (
                <div key={label} className={s.statCard}>
                  <Icon size={15} className={s.emeraldText} />

                  <div className={s.statValue}>
                    {value}
                  </div>

                  <div className={s.statLabel}>
                    {label}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>


        <p className={s.footer}>
          &copy; {new Date().getFullYear()} Pollify.
          Made for the community, by the community.
        </p>

      </div>


      {/* Right Panel */}

      <div className={s.rightPanel}>
        <div className={s.formContainer}>

          <div className={s.mobileLogoContainer}>
            <img 
              src="/favicon.svg" 
              alt="logo" 
              className={s.mobileLogoImg} 
            />

            <span className={s.mobileLogoText}>
              Pollify
            </span>
          </div>


          <div className={s.headingWrapper}>
            <h1 className={s.pageTitle}>
              {title}
            </h1>

            {subtitle && (
              <p className={s.pageSubtitle}>
                {subtitle}
              </p>
            )}
          </div>


          {children}

        </div>
      </div>

    </div>
  );
};

export default AuthLayout;
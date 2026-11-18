import React from 'react';

export default function Marquee() {
  return (
    <div className="marquee" aria-label="People. Culture. Stories. Possibility.">
      <div className="marquee-track" aria-hidden="true">
        <span>People.</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/mark.svg" alt="" />
        <span>Culture.</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/mark.svg" alt="" />
        <span>Stories.</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/mark.svg" alt="" />
        <span>Possibility.</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/mark.svg" alt="" />

        <span>People.</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/mark.svg" alt="" />
        <span>Culture.</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/mark.svg" alt="" />
        <span>Stories.</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/mark.svg" alt="" />
        <span>Possibility.</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/mark.svg" alt="" />
      </div>
    </div>
  );
}

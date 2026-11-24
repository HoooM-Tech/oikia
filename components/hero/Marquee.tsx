import React from 'react';

export default function Marquee() {
  return (
    <div className="marquee" aria-label="People. Culture. Stories. Possibility.">
      <div className="marquee-track" aria-hidden="true">
        <span>People.</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/mark-lime.svg" alt="" width="34" height="39" />
        <span>Culture.</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/mark-lime.svg" alt="" width="34" height="39" />
        <span>Stories.</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/mark-lime.svg" alt="" width="34" height="39" />
        <span>Possibility.</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/mark-lime.svg" alt="" width="34" height="39" />

        <span>People.</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/mark-lime.svg" alt="" width="34" height="39" />
        <span>Culture.</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/mark-lime.svg" alt="" width="34" height="39" />
        <span>Stories.</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/mark-lime.svg" alt="" width="34" height="39" />
        <span>Possibility.</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/mark-lime.svg" alt="" width="34" height="39" />
      </div>
    </div>
  );
}

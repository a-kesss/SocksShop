import React from 'react';

export default function SockColor({ color, width, height }) {
  return (
    <svg
      className="my_svg_back my_svg"
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={`${width * 0.9}px`}
      height={`${height * 0.9}px`}
      viewBox="0 0 581.000000 1024.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,1024.000000) scale(0.100000,-0.100000)"
        fill={color}
        stroke="none"
      >
        <path
          d="M2469 10217 c-63 -42 -71 -116 -38 -362 11 -82 22 -226 25 -320 6
-150 3 -190 -20 -345 -42 -291 -71 -693 -100 -1405 -23 -552 -26 -683 -28
-1195 -3 -739 -11 -953 -41 -1080 -52 -218 -104 -321 -347 -675 -233 -340
-505 -776 -1003 -1606 -506 -844 -756 -1282 -821 -1440 -68 -165 -87 -251 -87
-384 0 -179 14 -222 141 -429 37 -61 106 -176 153 -256 47 -80 108 -176 136
-215 70 -96 291 -317 372 -370 172 -115 368 -155 598 -121 201 30 497 142 659
250 155 103 465 456 844 961 370 494 617 857 878 1291 297 493 479 749 636
893 38 35 150 117 249 183 444 296 742 556 938 816 162 217 215 381 188 586
-31 234 -121 431 -367 804 -74 113 -146 226 -158 251 -51 102 -54 166 -26 531
11 144 11 1271 -1 1655 -14 466 -39 828 -70 999 -6 33 -22 81 -36 108 -34 66
-40 177 -19 373 9 83 19 191 23 240 5 82 3 92 -16 117 -12 15 -52 42 -89 60
-64 32 -71 33 -197 34 -71 1 -177 -2 -235 -7 -132 -10 -250 -11 -945 -6 -509
3 -576 5 -735 26 -96 12 -221 31 -278 42 -130 24 -142 24 -183 -4z"
        />
      </g>
    </svg>
  );
}

import * as React from "react"
import { SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" {...props}>
    <path fill="#f70" d="M0 0h1600v900H0z" />
    <path fill="#c00" d="M957 450 539 900h857z" />
    <path fill="#a00" d="m957 450-84.1 450H1396z" />
    <path fill="#d6002b" d="m-60 900 458-238 418 238z" />
    <path fill="#b10022" d="m337 900 61-238 418 238z" />
    <path fill="#d9004b" d="m1203 546 349 354H876z" />
    <path fill="#b2003d" d="m1203 546 349 354h-390z" />
    <path fill="#d3006c" d="m641 695 245 205H367z" />
    <path fill="#ac0057" d="m587 900 54-205 245 205z" />
    <path fill="#c4008c" d="m1710 900-309-268-305 268z" />
    <path fill="#9e0071" d="m1710 900-309-268-36 268z" />
    <path fill="#a0a" d="M1210 900 971 687 725 900z" />
    <path fill="#808" d="M943 900h267L971 687z" />
  </svg>
)

export default SvgComponent
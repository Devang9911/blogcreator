import React from "react";
import logo from "../../img/logo.png"

function Logo() {
  return (
    <div className="flex items-center gap-2 cursor-pointer select-none">
      <img
        src={logo}
        alt="Logo"
        className="h-9"
      />
    </div>
  );
}

export default Logo
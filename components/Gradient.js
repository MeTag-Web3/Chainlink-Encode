import Image from "next/image";
import left from "../public/left.svg";
import right from "../public/right.svg";

export default function Gradient() {
    return (
      
        <div className="absolute">
            <Image src={left} alt="lgrad"/>
        </div>
        /* <div className="absolute">
            <Image src={right} alt="lgrad"/>
        </div> */
     
    );
}



